/* ══════════════════════════════════════════
   TRG ACCOUNT SYSTEM — Phase 1
   Follow Brands + Wishlist + Nav State
   localStorage-powered (New Customer Accounts)
   ══════════════════════════════════════════ */

(function() {
  'use strict';

  const TRG_ACCOUNT = {
    _cache: {},

    isLoggedIn() {
      return !!document.querySelector('[data-trg-customer-id]');
    },

    /* ─── STORAGE (localStorage) ─── */
    async saveMetafield(key, value) {
      this._cache[key] = value;
      try { localStorage.setItem(`trg_${key}`, JSON.stringify(value)); } catch(e) {}
    },

    getLocal(key) {
      if (this._cache[key] !== undefined) return this._cache[key];
      try {
        const val = JSON.parse(localStorage.getItem(`trg_${key}`));
        if (val) this._cache[key] = val;
        return val;
      } catch(e) { return null; }
    },

    /* ─── FOLLOW BRANDS ─── */
    getFollowedBrands() {
      return this.getLocal('followed_brands') || [];
    },

    isFollowing(handle) {
      return this.getFollowedBrands().includes(handle);
    },

    async toggleFollow(handle) {
      if (!this.isLoggedIn()) {
        window.location.href = '/customer_authentication/login?return_to=' + encodeURIComponent(window.location.pathname);
        return;
      }
      let brands = [...this.getFollowedBrands()];
      const idx = brands.indexOf(handle);
      if (idx > -1) {
        brands.splice(idx, 1);
        this.showToast('Brand unfollowed');
      } else {
        brands.push(handle);
        this.showToast('Brand followed');
      }
      await this.saveMetafield('followed_brands', brands);
      this.updateFollowButtons(handle);
      this.updateNavCounts();
      this.initPdpWishlist();
      this.renderBrandsTab();
    },

    updateFollowButtons(handle) {
      const following = this.isFollowing(handle);
      document.querySelectorAll(`.trg-follow-btn[data-brand="${handle}"]`).forEach(btn => {
        btn.classList.toggle('following', following);
        btn.innerHTML = following
          ? '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> Following'
          : '<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg> Follow';
      });
    },

    /* ─── WISHLIST ─── */
    getWishlist() {
      return this.getLocal('wishlist') || [];
    },

    isWishlisted(handle) {
      return this.getWishlist().some(i => i.handle === handle);
    },

    async toggleWishlist(handle) {
      if (!this.isLoggedIn()) {
        window.location.href = '/customer_authentication/login?return_to=' + encodeURIComponent(window.location.pathname);
        return;
      }
      let items = [...this.getWishlist()];
      const idx = items.findIndex(i => i.handle === handle);
      if (idx > -1) {
        items.splice(idx, 1);
        this.showToast('Removed from wishlist');
      } else {
        items.push({ handle, added: new Date().toISOString().split('T')[0] });
        this.showToast('Added to wishlist');
      }
      await this.saveMetafield('wishlist', items);
      this.updateWishlistButtons(handle);
      this.updateNavCounts();
      this.initPdpWishlist();
      this.renderWishlistTab();
    },

    updateWishlistButtons(handle) {
      const saved = this.isWishlisted(handle);
      document.querySelectorAll(`.trg-wishlist-btn[data-product="${handle}"]`).forEach(btn => {
        btn.classList.toggle('saved', saved);
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', saved ? 'currentColor' : 'none');
          svg.setAttribute('stroke', saved ? 'none' : 'currentColor');
        }
      });
    },

    /* ─── NAV COUNTS ─── */
    updateNavCounts() {
      const wishCount = this.getWishlist().length;
      const followCount = this.getFollowedBrands().length;
      document.querySelectorAll('.trg-nav-wishlist__count').forEach(el => {
        el.textContent = wishCount > 0 ? wishCount : '';
      });
      document.querySelectorAll('.trg-acct__stat-num[data-stat="following"]').forEach(el => {
        el.textContent = followCount;
      });
      document.querySelectorAll('.trg-acct__stat-num[data-stat="wishlist"]').forEach(el => {
        el.textContent = wishCount;
      });
      document.querySelectorAll('.trg-acct__tab-count[data-count="brands"]').forEach(el => {
        el.textContent = followCount;
      });
      document.querySelectorAll('.trg-acct__tab-count[data-count="wishlist"]').forEach(el => {
        el.textContent = wishCount;
      });
    },

    /* ─── RENDER BRANDS TAB (from localStorage) ─── */
    renderBrandsTab() {
      const container = document.getElementById('trg-brands-container');
      const countText = document.getElementById('trg-brands-count-text');
      if (!container) return;

      const brands = this.getFollowedBrands();
      if (countText) countText.textContent = brands.length + ' brand' + (brands.length !== 1 ? 's' : '') + ' you follow';

      if (brands.length === 0) {
        container.innerHTML = `
          <div class="trg-acct__empty">
            <div class="trg-acct__empty-icon">
              <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="trg-acct__empty-title">No brands followed yet</div>
            <div class="trg-acct__empty-desc">Follow brands to get updates when they add new products or run promotions.</div>
            <a href="/pages/brands-directory" class="trg-acct__btn-cta">Browse Brands</a>
          </div>`;
        return;
      }

      // Fetch brand data from the storefront
      const cards = brands.map(handle => {
        const initials = handle.split('-').map(w => w[0] || '').slice(0, 2).join('').toUpperCase();
        const name = handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `
          <a href="/pages/brands/${handle}" class="trg-acct__brand-card">
            <button class="trg-acct__brand-unfollow" data-brand="${handle}" title="Unfollow" onclick="event.preventDefault(); event.stopPropagation(); TRG_ACCOUNT.toggleFollow('${handle}');">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div class="trg-acct__brand-logo">${initials}</div>
            <div class="trg-acct__brand-name">${name}</div>
          </a>`;
      }).join('');

      container.innerHTML = `<div class="trg-acct__brands-grid">${cards}</div>`;
    },

    /* ─── RENDER WISHLIST TAB (from localStorage) ─── */
    renderWishlistTab() {
      const container = document.getElementById('trg-wishlist-container');
      const countText = document.getElementById('trg-wishlist-count-text');
      if (!container) return;

      const items = this.getWishlist();
      if (countText) countText.textContent = items.length + ' saved item' + (items.length !== 1 ? 's' : '');

      if (items.length === 0) {
        container.innerHTML = `
          <div class="trg-acct__empty">
            <div class="trg-acct__empty-icon">
              <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div class="trg-acct__empty-title">Your wishlist is empty</div>
            <div class="trg-acct__empty-desc">Save products you love by tapping the heart icon on any product card.</div>
            <a href="/collections/all" class="trg-acct__btn-cta">Browse Products</a>
          </div>`;
        return;
      }

      const cards = items.map(item => {
        const name = item.handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `
          <div class="trg-acct__wish-card">
            <div class="trg-acct__wish-img">
              <button class="trg-acct__wish-remove" onclick="TRG_ACCOUNT.toggleWishlist('${item.handle}');" title="Remove">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            <div class="trg-acct__wish-info">
              <div class="trg-acct__wish-name">${name}</div>
              <div class="trg-acct__wish-added">Added ${item.added || ''}</div>
              <a href="/products/${item.handle}" class="trg-acct__wish-cta">
                View Product
                <svg width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            </div>
          </div>`;
      }).join('');

      container.innerHTML = `<div class="trg-acct__wish-grid">${cards}</div>`;
    },

    /* ─── TOAST ─── */
    showToast(msg) {
      let toast = document.querySelector('.trg-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'trg-toast';
        toast.innerHTML = '<svg class="trg-toast__icon" width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="trg-toast__text"></span>';
        document.body.appendChild(toast);
      }
      toast.querySelector('.trg-toast__text').textContent = msg;
      toast.classList.add('show');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
    },

    /* ─── TABS ─── */
    initTabs() {
      document.querySelectorAll('.trg-acct__tab').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.trg-acct__tab').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.trg-acct__panel').forEach(p => p.classList.remove('active'));
          btn.classList.add('active');
          const panel = document.getElementById('trg-tab-' + btn.dataset.tab);
          if (panel) panel.classList.add('active');
        });
      });
    },

    /* ─── NOTIFICATION TOGGLES ─── */
    initToggles() {
      document.querySelectorAll('.trg-acct__toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
          toggle.classList.toggle('on');
          const prefs = {};
          document.querySelectorAll('.trg-acct__toggle[data-pref]').forEach(t => {
            prefs[t.dataset.pref] = t.classList.contains('on');
          });
          this.saveMetafield('notification_prefs', prefs);
        });
      });
    },

    /* ─── INIT ─── */

    /* ─── PDP WISHLIST BUTTON ─── */
    initPdpWishlist() {
      const btn = document.getElementById('trg-pdp-wishlist');
      if (!btn) return;
      const handle = btn.dataset.product;
      if (!handle) return;
      const saved = this.isWishlisted(handle);
      btn.classList.toggle('trg-wishlist--saved', saved);
      const icon = btn.querySelector('.trg-affiliate-cta__wishlist-icon');
      const text = btn.querySelector('.trg-affiliate-cta__wishlist-text');
      if (icon) {
        icon.setAttribute('fill', saved ? 'currentColor' : 'none');
        icon.setAttribute('stroke', saved ? 'none' : 'currentColor');
      }
      if (text) text.textContent = saved ? 'Saved' : 'Save to Wishlist';
    },

    init() {
      this.initTabs();
      this.initToggles();
      this.updateNavCounts();
      this.initPdpWishlist();

      // Render account page tabs if on account page
      this.renderBrandsTab();
      this.renderWishlistTab();

      // Bind follow buttons (on brand PDP pages)
      document.querySelectorAll('.trg-follow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleFollow(btn.dataset.brand);
        });
      });

      // Bind wishlist buttons (on product cards/PDP)
      document.querySelectorAll('.trg-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleWishlist(btn.dataset.product);
        });
      });

      // Init existing button states
      document.querySelectorAll('.trg-follow-btn[data-brand]').forEach(btn => {
        this.updateFollowButtons(btn.dataset.brand);
      });
      document.querySelectorAll('.trg-wishlist-btn[data-product]').forEach(btn => {
        this.updateWishlistButtons(btn.dataset.product);
      });
    }
  };

  window.TRG_ACCOUNT = TRG_ACCOUNT;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TRG_ACCOUNT.init());
  } else {
    TRG_ACCOUNT.init();
  }

  /* ── Global PDP wishlist handler ── */
  window.trgToggleWishlist = function(btn) {
    const handle = btn.dataset.product;
    if (handle && window.TRG) {
      window.TRG.toggleWishlist(handle).then(() => {
        window.TRG.initPdpWishlist();
      });
    }
  };

})();

/* TRG: Force Playfair on PDP price (Dwell h6 preset override) */
(function() {
  function fixPdpPrice() {
    var pi = document.querySelector('.product-information');
    if (!pi) return;
    var pp = pi.querySelectorAll('.product-details product-price, .product-details product-price .price, .product-details product-price span');
    pp.forEach(function(el) {
      el.style.setProperty('font-family', "'Playfair Display', serif", 'important');
      el.style.setProperty('font-size', '1.5rem', 'important');
      el.style.setProperty('font-weight', '600', 'important');
      el.style.setProperty('text-transform', 'none', 'important');
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixPdpPrice);
  } else {
    fixPdpPrice();
  }
  // Also run after Dwell's morphdom hydration which can reset styles
  setTimeout(fixPdpPrice, 500);
  setTimeout(fixPdpPrice, 1500);
})();

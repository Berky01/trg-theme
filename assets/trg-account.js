/* ══════════════════════════════════════════
   TRG ACCOUNT SYSTEM — Phase 1
   Follow Brands + Wishlist + Nav State
   ══════════════════════════════════════════ */

(function() {
  'use strict';

  const TRG_ACCOUNT = {
    /* ─── STORAGE ─── */
    _cache: {},

    getCustomerId() {
      const el = document.querySelector('[data-trg-customer-id]');
      return el ? el.dataset.trgCustomerId : null;
    },

    isLoggedIn() {
      return !!this.getCustomerId();
    },

    /* Read metafield from page data (injected by Liquid) */
    getMetafield(key) {
      if (this._cache[key] !== undefined) return this._cache[key];
      const el = document.querySelector(`[data-trg-meta-${key}]`);
      if (!el) return null;
      try {
        const raw = el.dataset[`trgMeta${key.charAt(0).toUpperCase() + key.slice(1).replace(/_([a-z])/g, (m,c) => c.toUpperCase())}`];
        this._cache[key] = JSON.parse(raw);
        return this._cache[key];
      } catch(e) {
        return null;
      }
    },

    /* Write metafield — localStorage always, server sync when available */
    async saveMetafield(key, value) {
      this._cache[key] = value;
      /* Always persist to localStorage (works for all users) */
      try { localStorage.setItem(`trg_${key}`, JSON.stringify(value)); } catch(e) {}
    },


    /* ─── FOLLOW BRANDS ─── */
    getFollowedBrands() {
      /* localStorage is the source of truth (New Customer Accounts can't POST to /account) */
      try {
        const local = JSON.parse(localStorage.getItem('trg_followed_brands'));
        if (local && local.length) return local;
      } catch(e) {}
      /* Fallback: Liquid-injected metafield (read-only, from last server render) */
      const stored = this.getMetafield('followed_brands');
      if (stored) return stored;
      return [];
    },

    isFollowing(handle) {
      return this.getFollowedBrands().includes(handle);
    },

    async toggleFollow(handle) {
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
      try {
        const local = JSON.parse(localStorage.getItem('trg_wishlist'));
        if (local && local.length) return local;
      } catch(e) {}
      const stored = this.getMetafield('wishlist');
      if (stored) return stored;
      return [];
    },

    isWishlisted(handle) {
      return this.getWishlist().some(i => i.handle === handle);
    },

    async toggleWishlist(handle) {
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


    /* ─── NAV STATE ─── */
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


    /* ─── TAB SWITCHING ─── */
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
          // Save prefs
          const prefs = {};
          document.querySelectorAll('.trg-acct__toggle[data-pref]').forEach(t => {
            prefs[t.dataset.pref] = t.classList.contains('on');
          });
          this.saveMetafield('notification_prefs', prefs);
        });
      });
    },


    /* ─── INIT ─── */
    init() {
      this.initTabs();
      this.initToggles();
      this.updateNavCounts();

      // Bind follow buttons
      document.querySelectorAll('.trg-follow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleFollow(btn.dataset.brand);
        });
      });

      // Bind wishlist buttons
      document.querySelectorAll('.trg-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleWishlist(btn.dataset.product);
        });
      });

      // Init existing states
      document.querySelectorAll('.trg-follow-btn[data-brand]').forEach(btn => {
        this.updateFollowButtons(btn.dataset.brand);
      });
      document.querySelectorAll('.trg-wishlist-btn[data-product]').forEach(btn => {
        this.updateWishlistButtons(btn.dataset.product);
      });

      // Update last_seen
      if (this.isLoggedIn()) {
        this.saveMetafield('last_seen', new Date().toISOString().split('T')[0]);
      }
    }
  };

  // Expose globally
  window.TRG_ACCOUNT = TRG_ACCOUNT;

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TRG_ACCOUNT.init());
  } else {
    TRG_ACCOUNT.init();
  }
})();

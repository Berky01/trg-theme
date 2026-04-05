/* TRG Cookie Consent â€” trg-cookie-consent.js
   Integrates with Shopify Customer Privacy API.
   Shows banner on first visit; persists via localStorage.
   GDPR / CASL compliant: opt-in model.
   Uses event delegation â€” morph-proof (survives Dwell morphdom hydration).
*/
(function () {
  'use strict';

  var STORE_KEY = 'trg_cookie_consent_v1';

  /* Already decided â€” remove banner early */
  var stored = localStorage.getItem(STORE_KEY);
  if (stored) {
    var b = document.getElementById('trg-cc-banner');
    if (b) b.remove();
    return;
  }

  /* Show after short delay (avoids flash on fast navigations) */
  setTimeout(function () {
    var banner = document.getElementById('trg-cc-banner');
    if (banner) banner.removeAttribute('hidden');
  }, 600);

  function dismiss(choice) {
    localStorage.setItem(STORE_KEY, choice);
    var banner = document.getElementById('trg-cc-banner');
    if (banner) {
      banner.setAttribute('hidden', '');
      setTimeout(function () { banner.remove(); }, 400);
    }
    if (window.Shopify && window.Shopify.customerPrivacy) {
      var allow = choice === 'accepted';
      try {
        window.Shopify.customerPrivacy.setTrackingConsent(
          { analytics: allow, marketing: allow, preferences: allow, sale_of_data: false },
          function () {}
        );
      } catch (e) {}
    }
  }

  /* Delegated listener â€” survives morphdom DOM replacement */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('#trg-cc-accept')) { dismiss('accepted'); }
    else if (t.closest('#trg-cc-decline')) { dismiss('declined'); }
  });

})();

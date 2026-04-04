/* TRG Cookie Consent — trg-cookie-consent.js
   Integrates with Shopify Customer Privacy API.
   Shows banner on first visit; persists via localStorage.
   GDPR / CASL compliant: opt-in model.
*/
(function () {
  'use strict';

  var STORE_KEY = 'trg_cookie_consent_v1';
  var banner = document.getElementById('trg-cc-banner');
  if (!banner) return;

  /* Already decided — hide immediately */
  var stored = localStorage.getItem(STORE_KEY);
  if (stored) { banner.remove(); return; }

  /* Show after short delay (avoids flash on fast navigations) */
  setTimeout(function () { banner.removeAttribute('hidden'); }, 600);

  function accept() {
    localStorage.setItem(STORE_KEY, 'accepted');
    banner.setAttribute('hidden', '');
    /* Notify Shopify Customer Privacy API if available */
    if (window.Shopify && window.Shopify.customerPrivacy) {
      try {
        window.Shopify.customerPrivacy.setTrackingConsent(
          { analytics: true, marketing: true, preferences: true, sale_of_data: false },
          function () {}
        );
      } catch (e) {}
    }
    setTimeout(function () { banner.remove(); }, 400);
  }

  function decline() {
    localStorage.setItem(STORE_KEY, 'declined');
    banner.setAttribute('hidden', '');
    if (window.Shopify && window.Shopify.customerPrivacy) {
      try {
        window.Shopify.customerPrivacy.setTrackingConsent(
          { analytics: false, marketing: false, preferences: false, sale_of_data: false },
          function () {}
        );
      } catch (e) {}
    }
    setTimeout(function () { banner.remove(); }, 400);
  }

  var btnAccept = document.getElementById('trg-cc-accept');
  var btnDecline = document.getElementById('trg-cc-decline');
  if (btnAccept) btnAccept.addEventListener('click', accept);
  if (btnDecline) btnDecline.addEventListener('click', decline);

})();

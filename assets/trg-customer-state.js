(function() {
  'use strict';

  var PROFILE_KEY = 'trg_colour_profile';
  var INTENT_KEY = 'trg_colour_intent';
  var POLL_MS = 3000;

  function readNode(selector) {
    return document.querySelector(selector);
  }

  function safeParse(value) {
    if (!value || typeof value !== 'string') return null;
    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }

  function readInjectedProfile() {
    var node = readNode('[data-trg-meta-colour_profile]');
    if (!node) return null;
    var raw = node.getAttribute('data-trg-meta-colour_profile');
    return raw ? String(raw).trim() : null;
  }

  function readInjectedIntent() {
    var node = readNode('[data-trg-meta-colour_intent]');
    if (!node) return null;
    var raw = node.getAttribute('data-trg-meta-colour_intent');
    return safeParse(raw);
  }

  function readProxyPath() {
    var node = readNode('[data-trg-app-proxy-path]');
    if (!node) return '';
    return String(node.getAttribute('data-trg-app-proxy-path') || '').trim();
  }

  function setLocalString(key, value) {
    try {
      if (value === null || value === undefined || value === '') {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, String(value));
      }
    } catch (err) {}
  }

  function setLocalJson(key, value) {
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {}
  }

  function hydrateFromMarkup() {
    try {
      if (!localStorage.getItem(PROFILE_KEY)) {
        var profile = readInjectedProfile();
        if (profile) localStorage.setItem(PROFILE_KEY, profile);
      }
      if (!localStorage.getItem(INTENT_KEY)) {
        var intent = readInjectedIntent();
        if (intent) localStorage.setItem(INTENT_KEY, JSON.stringify(intent));
      }
    } catch (err) {}
  }

  function readLocalState() {
    var profile = null;
    var intent = null;
    try {
      profile = localStorage.getItem(PROFILE_KEY);
      intent = safeParse(localStorage.getItem(INTENT_KEY));
    } catch (err) {}
    return {
      colour_profile: profile ? String(profile).trim() : null,
      colour_intent: intent,
    };
  }

  function applyRemoteState(state) {
    if (!state || typeof state !== 'object') return;
    try {
      if (!localStorage.getItem(PROFILE_KEY) && state.colour_profile) {
        localStorage.setItem(PROFILE_KEY, String(state.colour_profile).trim());
      }
      if (!localStorage.getItem(INTENT_KEY) && state.colour_intent) {
        localStorage.setItem(INTENT_KEY, JSON.stringify(state.colour_intent));
      }
    } catch (err) {}
  }

  function sameState(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  var lastSyncedState = null;

  async function pullRemoteState(proxyPath) {
    if (!proxyPath) return;
    try {
      var response = await fetch(proxyPath, {
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) return;
      var payload = await response.json();
      applyRemoteState(payload && payload.state ? payload.state : null);
      lastSyncedState = readLocalState();
    } catch (err) {}
  }

  async function syncRemoteState(proxyPath) {
    if (!proxyPath || document.hidden) return;
    var currentState = readLocalState();
    if (lastSyncedState && sameState(lastSyncedState, currentState)) return;
    try {
      var response = await fetch(proxyPath, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentState),
      });
      if (response.ok) {
        lastSyncedState = currentState;
      }
    } catch (err) {}
  }

  function init() {
    if (!readNode('[data-trg-customer-id]')) return;
    hydrateFromMarkup();

    var proxyPath = readProxyPath();
    if (!proxyPath) {
      return;
    }

    pullRemoteState(proxyPath).finally(function() {
      lastSyncedState = readLocalState();
      window.setInterval(function() {
        syncRemoteState(proxyPath);
      }, POLL_MS);
      window.addEventListener('storage', function() {
        syncRemoteState(proxyPath);
      });
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) syncRemoteState(proxyPath);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

const SELECTOR = '[data-trg-mega-menu]';

function activatePanel(root, panelId) {
  const tabs = root.querySelectorAll('[data-trg-mega-menu-tab]');
  const panels = root.querySelectorAll('[data-trg-mega-menu-panel]');

  tabs.forEach((tab) => {
    const active = tab.dataset.trgMegaMenuTab === panelId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  panels.forEach((panel) => {
    const active = panel.id === panelId;
    panel.classList.toggle('is-active', active);
    panel.toggleAttribute('hidden', !active);
  });
}

function initMenu(root) {
  if (!(root instanceof HTMLElement) || root.dataset.trgMegaMenuReady === 'true') {
    return;
  }

  root.dataset.trgMegaMenuReady = 'true';

  const tabs = root.querySelectorAll('[data-trg-mega-menu-tab]');
  tabs.forEach((tab) => {
    const panelId = tab.dataset.trgMegaMenuTab;
    if (!panelId) return;

    const activate = () => activatePanel(root, panelId);
    tab.addEventListener('click', activate);
    tab.addEventListener('pointerenter', activate);
    tab.addEventListener('focus', activate);
  });
}

function initAllMenus(target = document) {
  if (!(target instanceof ParentNode)) return;
  target.querySelectorAll(SELECTOR).forEach(initMenu);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAllMenus());
} else {
  initAllMenus();
}

document.addEventListener('shopify:section:load', (event) => {
  initAllMenus(event.target);
});

(() => {
  const selector = "#MainContent[data-template*='collection'] .trg-plp-body .trg-plp-main-column > .trg-collection-controls";

  const repairToolbarStructure = (controls) => {
    if (!(controls instanceof HTMLElement)) return;

    const mainColumn = controls.closest(".trg-plp-main-column");
    if (!(mainColumn instanceof HTMLElement)) return;

    const strayChildren = Array.from(controls.children).filter((child) => {
      return child instanceof HTMLElement && child.matches("style[data-shopify], .main-collection-grid");
    });

    if (strayChildren.length === 0) return;

    const fragment = document.createDocumentFragment();
    for (const child of strayChildren) {
      fragment.appendChild(child);
    }

    mainColumn.insertBefore(fragment, controls.nextSibling);
    controls.dataset.trgStructureRepaired = "true";
  };

  const syncCollectionToolbar = () => {
    const controls = document.querySelector(selector);
    if (!(controls instanceof HTMLElement)) return;

    repairToolbarStructure(controls);

    const legacySort = controls.querySelector("sorting-filter-component.sorting-filter");
    const nativeSort = controls.querySelector(".trg-plp-sort-select, .trg-plp-sort-select-bridge");
    const showButton = controls.querySelector(".trg-plp-show-filters-btn");
    if (showButton instanceof HTMLButtonElement) {
      const isMobile = window.matchMedia("(max-width: 989px)").matches;
      const shouldShow = isMobile || document.body.classList.contains("filters-hidden");
      showButton.hidden = !shouldShow;
      if (shouldShow) {
        showButton.removeAttribute("aria-hidden");
      } else {
        showButton.setAttribute("aria-hidden", "true");
      }
    }

    controls.dataset.trgControlsBridged = "true";
    controls.querySelector(".facets--filters-title")?.remove();
    controls.querySelector(".trg-collection-controls__active-filters")?.remove();
    if (legacySort instanceof HTMLElement) {
      legacySort.hidden = true;
      legacySort.setAttribute("aria-hidden", "true");
    }

    if (nativeSort) return;

    let sortShell = controls.querySelector(".trg-plp-sort-shell-bridge");
    let sortSelect = controls.querySelector(".trg-plp-sort-select-bridge");
    if (!(sortShell instanceof HTMLElement) || !(sortSelect instanceof HTMLSelectElement)) {
      sortShell = document.createElement("div");
      sortShell.className = "trg-plp-sort-shell-bridge";

      const label = document.createElement("label");
      label.className = "visually-hidden";
      label.setAttribute("for", "TrgPlpSortBridge");
      label.textContent = "Sort";

      sortSelect = document.createElement("select");
      sortSelect.id = "TrgPlpSortBridge";
      sortSelect.className = "trg-plp-sort-select-bridge";
      sortSelect.setAttribute("data-trg-plp-sort-bridge", "");
      sortSelect.setAttribute("aria-label", "Sort");

      sortShell.append(label, sortSelect);
      controls.append(sortShell);
    }

    const sourceSelect =
      controls.querySelector("select[name='sort_by']") || document.querySelector("select[name='sort_by']");
    if (!(sourceSelect instanceof HTMLSelectElement)) return;

    const currentSort = new URL(window.location.href).searchParams.get("sort_by") || sourceSelect.value;
    const nextSignature = Array.from(sourceSelect.options)
      .map((option) => `${option.value}:${option.textContent?.trim() || ""}`)
      .join("|");

    if (sortSelect.dataset.sourceSignature !== nextSignature) {
      sortSelect.innerHTML = "";
      for (const option of sourceSelect.options) {
        sortSelect.append(new Option(option.textContent?.trim() || option.value, option.value, false, false));
      }
      sortSelect.dataset.sourceSignature = nextSignature;
    }

    sortSelect.value = currentSort;
  };

  const handleBridgeSortChange = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement) || !target.matches("[data-trg-plp-sort-bridge]")) return;

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("page");
    if (target.value) {
      nextUrl.searchParams.set("sort_by", target.value);
    } else {
      nextUrl.searchParams.delete("sort_by");
    }
    window.location.assign(nextUrl.toString());
  };

  const scheduleSync = () => window.requestAnimationFrame(() => window.requestAnimationFrame(syncCollectionToolbar));

  document.addEventListener("change", handleBridgeSortChange, true);
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("[data-trg-plp-filter-toggle]")) {
      scheduleSync();
    }
  }, true);
  document.addEventListener("shopify:section:load", scheduleSync);
  window.addEventListener("trg:url-changed", scheduleSync);
  window.addEventListener("pageshow", scheduleSync);
  window.addEventListener("load", scheduleSync, { once: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleSync, { once: true });
  }

  scheduleSync();
  window.setTimeout(scheduleSync, 0);
  window.setTimeout(scheduleSync, 120);
  window.setTimeout(scheduleSync, 600);
})();

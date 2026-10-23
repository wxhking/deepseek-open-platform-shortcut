(() => {
  const PLATFORM_URL = "https://platform.deepseek.com/";
  const MOBILE_LABEL = "下载手机应用";
  const PLATFORM_LABEL = "开放平台";
  const MARKER = "data-deepseek-open-platform-entry";
  const MENU_SELECTOR = '[role="menu"], .ds-dropdown-menu';
  const MENU_LABELS = new Set([MOBILE_LABEL, "系统设置", "帮助与反馈", "退出登录"]);

  function textOf(element) {
    return (element?.innerText || element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function getMobileRow(menu) {
    const matches = [...menu.querySelectorAll("*")]
      .filter((element) => textOf(element) === MOBILE_LABEL)
      .sort((a, b) => a.querySelectorAll("*").length - b.querySelectorAll("*").length);
    const label = matches[0];
    if (!label) return null;

    // Walk upward until siblings identify this element as a complete menu row.
    let row = label;
    while (row && row !== menu) {
      const parent = row.parentElement;
      if (!parent) break;
      const siblingRows = [...parent.children].filter((child) => MENU_LABELS.has(textOf(child)));
      if (siblingRows.length >= 2 && siblingRows.includes(row)) return row;
      row = parent;
    }
    return label;
  }

  function changeLabel(row) {
    const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.trim() === MOBILE_LABEL) {
        node.nodeValue = node.nodeValue.replace(MOBILE_LABEL, PLATFORM_LABEL);
        return true;
      }
    }
    return false;
  }

  function clearActiveState(row) {
    if (!row) return;
    for (const name of [...row.classList]) {
      if (/(^|[-_])(active|hover|selected|highlighted|focused)([-_]|$)/i.test(name)) row.classList.remove(name);
    }
    ["aria-selected", "aria-current", "data-highlighted"].forEach((attribute) => row.removeAttribute(attribute));
    if (["active", "selected", "highlighted"].includes(row.getAttribute("data-state"))) row.removeAttribute("data-state");
  }

  function processMenu(menu) {
    if (menu.querySelector(`[${MARKER}="true"]`)) return;
    const mobileRow = getMobileRow(menu);
    if (!mobileRow || !mobileRow.parentElement) return;

    // Clean up a marker left on the original item by the first extension version.
    mobileRow.removeAttribute(MARKER);
    menu.querySelectorAll(`[${MARKER}]`).forEach((oldEntry) => oldEntry.remove());
    const entry = mobileRow.cloneNode(true);
    entry.removeAttribute("id");
    entry.removeAttribute("href");
    entry.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    entry.setAttribute(MARKER, "true");
    entry.setAttribute("aria-label", PLATFORM_LABEL);
    entry.setAttribute("role", mobileRow.getAttribute("role") || "menuitem");
    entry.tabIndex = 0;
    if (!changeLabel(entry)) entry.append(document.createTextNode(PLATFORM_LABEL));
    entry.style.cursor = "pointer";
    clearActiveState(entry);
    clearActiveState(mobileRow);

    mobileRow.parentElement.insertBefore(entry, mobileRow);
  }

  function suppressBackground(row) {
    if (!row) return;
    clearActiveState(row);
    row.style.setProperty("background", "transparent", "important");
    row.style.setProperty("box-shadow", "none", "important");
  }

  function restoreBackground(row) {
    if (!row) return;
    row.style.removeProperty("background");
    row.style.removeProperty("box-shadow");
  }

  document.addEventListener("pointerover", (event) => {
    const menu = event.target.closest(MENU_SELECTOR);
    if (!menu) return;
    const added = menu.querySelector(`[${MARKER}]`);
    const original = getMobileRow(menu);
    if (added && added.contains(event.target)) {
      restoreBackground(added);
      suppressBackground(original);
    } else if (original && original.contains(event.target)) {
      restoreBackground(original);
      suppressBackground(added);
    }
  }, true);
  // The sidebar brand mark should open the public DeepSeek homepage.
  document.addEventListener("click", (event) => {
    const logo = event.target.closest('svg[viewBox="0 0 143 23"]');
    if (!logo) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = "https://platform.deepseek.com/";
  }, true);
  document.addEventListener("click", (event) => {
    const entry = event.target.closest(`[${MARKER}]`);
    if (!entry) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = PLATFORM_URL;
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!event.target.closest(`[${MARKER}]`)) return;
    event.preventDefault();
    window.location.href = PLATFORM_URL;
  }, true);

  function scan() {
    document.querySelectorAll(MENU_SELECTOR).forEach(processMenu);
  }

  scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();









const routes = {
  "": "expense-capture",
  "#capture": "expense-capture",
  "#categories": "category-management",
  "#export": "export-actions",
  "#list": "expense-list-section",
};

const subtitles = {
  "expense-capture": "Capture spending fast, even offline.",
  "category-management": "Create and rename your categories.",
  "export-actions": "Download your data as a CSV file.",
  "expense-list-section": "Review your latest saved expenses.",
};

export function resolveRoute(hash) {
  return routes[hash] ?? "expense-capture";
}

export function applyRoute(hash) {
  const current = resolveRoute(hash);
  for (const section of document.querySelectorAll("section.page")) {
    section.hidden = section.id !== current;
  }

  const subtitle = document.getElementById("page-subtitle");
  if (subtitle) {
    subtitle.textContent = subtitles[current] ?? subtitles["expense-capture"];
  }

  for (const link of document.querySelectorAll("[data-route-link]")) {
    const active = link.getAttribute("href") === (hash || "#capture");
    link.classList.toggle("active", active);
  }
}

function closeDrawer() {
  const drawer = document.getElementById("app-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const toggle = document.getElementById("menu-toggle");
  if (!drawer || !overlay || !toggle) {
    return;
  }
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  toggle.setAttribute("aria-expanded", "false");
}

function openDrawer() {
  const drawer = document.getElementById("app-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const toggle = document.getElementById("menu-toggle");
  if (!drawer || !overlay || !toggle) {
    return;
  }
  drawer.classList.add("open");
  overlay.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  toggle.setAttribute("aria-expanded", "true");
}

function initDrawer() {
  const toggle = document.getElementById("menu-toggle");
  const overlay = document.getElementById("drawer-overlay");
  if (!toggle || !overlay) {
    return;
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener("click", closeDrawer);

  for (const link of document.querySelectorAll("[data-route-link]")) {
    link.addEventListener("click", () => closeDrawer());
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });
}

export function initRouter() {
  initDrawer();
  applyRoute(window.location.hash);
  window.addEventListener("hashchange", () => applyRoute(window.location.hash));
}
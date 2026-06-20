function isIosSafari() {
  const userAgent = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS/.test(userAgent);
  return isIos && isSafari;
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

export function initInstallPrompt(showAlert) {
  const installButton = document.getElementById("install-app-button");
  if (!installButton) {
    return;
  }

  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      if (isIosSafari() && !isStandaloneMode()) {
        showAlert("On iPhone/iPad Safari: tap Share, then Add to Home Screen.", "info");
        return;
      }
      showAlert("Install option not available yet. Browse a bit and try again.", "info");
      return;
    }

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === "accepted") {
      showAlert("App install started.", "success");
    }
    deferredPrompt = null;
    installButton.hidden = true;
  });

  window.addEventListener("appinstalled", () => {
    installButton.hidden = true;
    showAlert("Expense Tracker installed successfully.", "success");
  });

  if (isIosSafari() && !isStandaloneMode()) {
    installButton.hidden = false;
    installButton.textContent = "How to Install";
  }
}

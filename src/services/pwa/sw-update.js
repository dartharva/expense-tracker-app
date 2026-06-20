export function watchServiceWorkerUpdates(registration) {
  registration.addEventListener("updatefound", () => {
    const worker = registration.installing;
    if (!worker) {
      return;
    }
    worker.addEventListener("statechange", () => {
      if (worker.state === "installed" && navigator.serviceWorker.controller) {
        console.info("A new offline cache version is available.");
      }
    });
  });
}
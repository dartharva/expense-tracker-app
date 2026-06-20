import { watchServiceWorkerUpdates } from "./sw-update.js";

const SW_VERSION = "v2";

function validatePwaMetadata() {
  const manifest = document.querySelector("link[rel='manifest']");
  if (!manifest) {
    console.warn("PWA manifest link is missing.");
  }
}

async function cleanupDevServiceWorkers() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));

  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }
}

export async function registerServiceWorker() {
  if (!import.meta.env.PROD) {
    await cleanupDevServiceWorkers();
    return;
  }

  validatePwaMetadata();
  if (!("serviceWorker" in navigator)) {
    return;
  }
  try {
    const registration = await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}sw.js?${SW_VERSION}`,
    );
    watchServiceWorkerUpdates(registration);
  } catch (error) {
    console.warn("Service worker registration failed", error);
  }
}
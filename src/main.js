import "./styles/tokens.css";
import "./styles/mobile.css";
import { bootstrapApp } from "./app/bootstrap.js";
import { showAlert } from "./app/ui-components.js";
import { initInstallPrompt } from "./services/pwa/install-prompt.js";
import { registerServiceWorker } from "./services/pwa/register-sw.js";

bootstrapApp().catch((error) => {
  console.error("Failed to bootstrap app", error);
});

registerServiceWorker();
initInstallPrompt(showAlert);
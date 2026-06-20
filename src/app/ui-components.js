export function showAlert(message, type = "info") {
  const alerts = document.getElementById("alerts");
  if (!alerts) {
    return;
  }

  const item = document.createElement("div");
  item.className = `alert alert-${type}`;
  item.textContent = message;
  alerts.replaceChildren(item);

  window.setTimeout(() => {
    if (alerts.contains(item)) {
      item.remove();
    }
  }, 2500);
}
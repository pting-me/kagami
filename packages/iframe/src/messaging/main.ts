export function sendMessage(message: unknown) {
  window.parent.postMessage({ pluginMessage: message }, "*");
}

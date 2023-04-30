import { MessageForSandbox } from "@kagami/common";

export function sendMessage(message: MessageForSandbox) {
  window.parent.postMessage({ pluginMessage: message }, "*");
}

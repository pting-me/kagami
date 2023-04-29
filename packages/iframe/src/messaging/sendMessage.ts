import { MessageForSandbox } from "@figma-react-template/common";

export function sendMessage(message: MessageForSandbox) {
  window.parent.postMessage({ pluginMessage: message }, "*");
}

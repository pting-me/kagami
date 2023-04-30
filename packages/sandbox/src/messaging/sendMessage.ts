import { MessageForIframe } from "@kagami/common";

export function sendMessage(message: MessageForIframe) {
  figma.ui.postMessage(message);
}

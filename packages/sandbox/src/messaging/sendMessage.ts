import { MessageForIframe } from "@figma-react-template/common";

export function sendMessage(message: MessageForIframe) {
  figma.ui.postMessage(message);
}

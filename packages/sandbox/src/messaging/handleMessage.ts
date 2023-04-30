import { MessageForSandbox } from "@kagami/common";

import { getComponentSetNodes } from "../nodes/getComponentSetNodes";
import { sendMessage } from "./sendMessage";

const componentSetNodes = getComponentSetNodes();

function handleIframeLoaded() {
  sendMessage({
    type: "nodes/updateComponentSets",
    payload: componentSetNodes,
  });
}

export function handleMessage(message: MessageForSandbox) {
  switch (message.type) {
    case "iframe/loaded": {
      handleIframeLoaded();
    }
  }
}

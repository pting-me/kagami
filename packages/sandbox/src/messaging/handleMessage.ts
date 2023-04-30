import { MessageForSandbox } from "@kagami/common";

import { getComponentNodes } from "../nodes/getComponentNodes";
import { getComponentSetNodes } from "../nodes/getComponentSetNodes";
import { sendMessage } from "./sendMessage";

const componentSetNodes = getComponentSetNodes();
const componentNodes = getComponentNodes();

function handleIframeLoaded() {
  sendMessage({
    type: "nodes/update",
    payload: { componentNodes, componentSetNodes },
  });
}

export function handleMessage(message: MessageForSandbox) {
  switch (message.type) {
    case "iframe/loaded": {
      handleIframeLoaded();
    }
  }
}

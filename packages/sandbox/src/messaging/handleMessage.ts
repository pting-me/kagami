import { MessageForSandbox } from "@kagami/common";

import { focusNode } from "../nodes/focusNode";
import { getComponentNodes } from "../nodes/getComponentNodes";
import { getComponentSetNodes } from "../nodes/getComponentSetNodes";
import { sendMessage } from "./sendMessage";

const componentSetNodes = getComponentSetNodes();
const componentNodes = getComponentNodes();

export function handleMessage(message: MessageForSandbox) {
  switch (message.type) {
    case "iframe/loaded":
      sendMessage({
        type: "nodes/update",
        payload: { componentNodes, componentSetNodes },
      });
      return;
    case "nodes/selected": {
      focusNode(message.payload);
    }
  }
}

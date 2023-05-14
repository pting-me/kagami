import { MessageForSandbox } from "@kagami/common";

import { generateCode } from "../generator/generateCode";
import { pascal } from "../generator/utils";
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
    case "nodes/selected":
      focusNode({ id: message.payload.nodeId });
      return;
    case "nodes/downloadRequested": {
      const { nodeId, tag, template } = message.payload;
      const node = figma.getNodeById(nodeId);

      if (!node) {
        // TODO: Error handling
        return;
      }

      const content = generateCode({
        node: node as ComponentSetNode,
        tagName: tag.label,
        isForwardRef: template.type === "forwardRef",
      });

      sendMessage({
        type: "files/download",
        payload: {
          filename: `${pascal(node.name)}.tsx`,
          content,
        },
      });
      return;
    }
  }
}

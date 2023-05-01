import { HydratedComponentNode, HydratedComponentSetNode } from "./nodes/types";

/**
 * This is a message that will be received in the sandbox
 */
export type MessageForSandbox =
  | {
      type: "iframe/loaded";
    }
  | {
      type: "nodes/selected";
      payload: {
        id: string;
      };
    };

/**
 * This is a message that will be received in the iframe
 */
export type MessageForIframe = {
  type: "nodes/update";
  payload: {
    componentNodes: HydratedComponentNode[];
    componentSetNodes: HydratedComponentSetNode[];
  };
};
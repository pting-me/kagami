import { HydratedComponentNode, HydratedComponentSetNode } from "./nodes/types";

export interface Tag {
  label: string;
  type: "svg" | "html";
}

export interface Template {
  framework: string;
  type: string;
  language: string;
}

export interface DownloadRequestedPayload {
  tag: Tag;
  template: Template;
}

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
    }
  | {
      type: "nodes/downloadRequested";
      payload: DownloadRequestedPayload;
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

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

// TODO: Not sure how to avoid repeating, without using enums
export const messageTypesForSandbox = [
  "iframe/loaded",
  "nodes/selected",
  "nodes/downloadRequested",
] as const;

export type MessageTypeForSandbox = (typeof messageTypesForSandbox)[number];

export function isMessageForSandbox(message: {
  type: string;
}): message is MessageForSandbox {
  return messageTypesForSandbox.includes(message.type as MessageTypeForSandbox);
}

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

export const messageTypesForIframe = ["nodes/update"] as const;

export type MessageTypeForIframe = (typeof messageTypesForIframe)[number];

export function isMessageForIframe(message: {
  type: string;
}): message is MessageForIframe {
  return messageTypesForIframe.includes(message.type as MessageTypeForIframe);
}

import { HydratedComponentNode, HydratedComponentSetNode } from './figma';

export interface DownloadInfo {
  download: boolean;
  filename: string;
  content: string;
}

/**
 * Message sent from Sandbox to View
 */
export type MessageToView =
  | {
      type: 'setComponentNodes';
      payload: HydratedComponentNode[];
    }
  | {
      type: 'setComponentSetNodes';
      payload: HydratedComponentSetNode[];
    }
  | {
      type: 'setDownloadInfo';
      payload: DownloadInfo;
    };

// Alias makes it easy to understand it's the same type
export type MessageFromSandbox = MessageToView;

/**
 * Message sent from View to Sandbox
 */
export type MessageToSandbox =
  | {
      type: 'focusNode';
      payload: {
        id: string;
      };
    }
  | {
      type: 'generateCode';
      payload: {
        id: string;
      };
    };

// Alias makes it easy to understand it's the same type
export type MessageFromView = MessageToSandbox;

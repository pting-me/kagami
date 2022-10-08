import { createContext } from 'react';

import {
  DownloadInfo,
  DryComponentNode,
  DryComponentSetNode,
} from '@kagami/types';

export interface Environment {
  production: boolean;
}

export interface ContextState {
  componentNodes: DryComponentNode[];
  componentSetNodes: DryComponentSetNode[];
  environment: Environment;
  downloadInfo: DownloadInfo;
}

export const initialContext: ContextState = {
  componentNodes: [],
  componentSetNodes: [],
  environment: { production: true },
  downloadInfo: {
    content: '',
    filename: 'NO_CONTENT',
    download: false,
  },
};

const ViewContext = createContext<ContextState>(initialContext);

export default ViewContext;

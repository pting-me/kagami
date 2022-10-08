import { createContext } from 'react';

export interface Environment {
  production: boolean;
}

export interface FileInfo {
  content: string;
  download: boolean;
}

export interface ContextState {
  componentNodes: ComponentNode[];
  componentSetNodes: ComponentSetNode[];
  environment: Environment;
  fileInfo: FileInfo;
}

export interface ContextAction {
  type: string;
  payload: any;
}

export type ContextDispatch = (action: ContextAction) => void;

export const initialContext: ContextState = {
  componentNodes: [],
  componentSetNodes: [],
  environment: { production: true },
  fileInfo: {
    content: '',
    download: false,
  },
};

const ViewContext = createContext<ContextState>(initialContext);

export default ViewContext;

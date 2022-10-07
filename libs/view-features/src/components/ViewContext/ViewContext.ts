import { createContext } from 'react';

export interface Environment {
  production: boolean;
}

export interface ContextState {
  componentNodes: ComponentNode[];
  componentSetNodes: ComponentSetNode[];
  environment: Environment;
}

export interface ContextAction {
  type: string;
  payload: any;
}

export type ContextDispatch = (action: ContextAction) => void;

export const initialContext: ContextState = {
  environment: { production: true },
  componentNodes: [],
  componentSetNodes: [],
};

const ViewContext = createContext<ContextState>(initialContext);

export default ViewContext;

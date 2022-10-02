import { createContext } from 'react';

export interface ContextState {
  componentNodes: ComponentNode[];
  componentSetNodes: ComponentSetNode[];
}

export interface ContextAction {
  type: string;
  payload: any;
}

export type ContextDispatch = (action: ContextAction) => void;

export const initialContext: ContextState = {
  componentNodes: [],
  componentSetNodes: [],
};

const MessageContext = createContext<ContextState>(initialContext);

export default MessageContext;

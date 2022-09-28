import React from 'react';

export interface ContextState {
  components: ComponentNode[];
  componentSets: ComponentSetNode[];
}

export interface ContextAction {
  type: string;
  payload: any;
}

export type ContextDispatch = (action: ContextAction) => void;

export const initialContext: ContextState = {
  components: [],
  componentSets: [],
};

const MessageContext = React.createContext<ContextState>(initialContext);

export default MessageContext;

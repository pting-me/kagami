import React from 'react';

export interface ContextState {
  components: any;
}

export interface ContextAction {
  type: string;
  payload: any;
}

export type ContextDispatch = (action: ContextAction) => void;

export const initialContext: ContextState = {
  components: null,
};

const MessageContext = React.createContext<ContextState>(initialContext);

export default MessageContext;

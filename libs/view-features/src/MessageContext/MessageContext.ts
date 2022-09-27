import React from 'react';

export interface ContextState {
  components: any;
}

export interface ContextAction {
  type: string;
  payload: any;
}

export type ContextDispatch = (action: ContextAction) => void;

export interface ContextStore {
  state: ContextState;
  dispatch: ContextDispatch;
}

export const initialContext: ContextStore = {
  state: { components: null },
  dispatch: () => {
    /* do nothing */
  },
};

const MessageContext = React.createContext<ContextStore>(initialContext);

export default MessageContext;

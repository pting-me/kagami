import { PropsWithChildren, useReducer } from 'react';

import createHandleMessageFromSandbox from '../createHandleMessageFromSandbox';
import MessageContext, {
  ContextAction,
  ContextState,
  initialContext,
} from './MessageContext';

type Props = PropsWithChildren;

function MessageContextWrapper(props: Props) {
  const { children } = props;

  const reducer = (state: ContextState, action: ContextAction) => {
    switch (action.type) {
      case 'setComponentNodes':
        return { ...state, componentNodes: action.payload };
      case 'setComponentSetNodes':
        return { ...state, componentSetNodes: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialContext);

  window.onmessage = createHandleMessageFromSandbox(dispatch);

  return (
    <MessageContext.Provider value={state}>{children}</MessageContext.Provider>
  );
}

export default MessageContextWrapper;

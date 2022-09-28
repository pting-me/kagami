import { PropsWithChildren, useReducer } from 'react';
import createHandleMessageFromSandbox from '../createHandleMessageFromSandbox';
import MessageContext, {
  initialContext,
  ContextAction,
  ContextState,
} from './MessageContext';

type Props = PropsWithChildren;

function MessageContextWrapper(props: Props) {
  const { children } = props;

  const reducer = (state: ContextState, action: ContextAction) => {
    switch (action.type) {
      case 'setComponents':
        return { ...state, components: action.payload };
      case 'setComponentSets':
        return { ...state, componentSets: action.payload };
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

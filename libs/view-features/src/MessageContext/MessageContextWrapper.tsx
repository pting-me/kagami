import { PropsWithChildren, useReducer } from 'react';
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
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialContext.state);

  window.onmessage = (ev: any) => {
    const message = ev.data.pluginMessage;
    if (!message) {
      return;
    }

    dispatch(message);
  };

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContextWrapper;

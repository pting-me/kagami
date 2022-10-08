import { FC, PropsWithChildren, useReducer } from 'react';

import createHandleMessageFromSandbox from '../../pubsub/createHandleMessageFromSandbox';
import ViewContext, {
  ContextAction,
  ContextState,
  Environment,
  initialContext,
} from './ViewContext';
import downloadFile from './downloadFile';

interface Props extends PropsWithChildren {
  environment: Environment;
}

const DefaultProvider: FC<Props> = (props: Props) => {
  const { children, environment } = props;

  const reducer = (state: ContextState, action: ContextAction) => {
    switch (action.type) {
      case 'setComponentNodes':
        return { ...state, componentNodes: action.payload };
      case 'setComponentSetNodes':
        return { ...state, componentSetNodes: action.payload };
      case 'setFileInfo': {
        const { payload: fileInfo } = action;
        const newState = { ...state, fileInfo };
        const { content, download, filename } = fileInfo;

        if (!download) {
          return newState;
        }

        downloadFile({ filename, dataBlob: [content] });
        return newState;
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialContext,
    environment,
  });

  window.onmessage = createHandleMessageFromSandbox(dispatch);

  return <ViewContext.Provider value={state}>{children}</ViewContext.Provider>;
};

export default DefaultProvider;
export { Props as DefaultProviderProps };

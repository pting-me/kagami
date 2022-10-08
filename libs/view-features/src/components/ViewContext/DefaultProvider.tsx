import { FC, PropsWithChildren, useReducer } from 'react';

import createHandleMessageFromSandbox from '../../pubsub/createHandleMessageFromSandbox';
import ViewContext, { Environment, initialContext } from './ViewContext';
import reducer from './reducer';

interface Props extends PropsWithChildren {
  environment: Environment;
}

const DefaultProvider: FC<Props> = (props: Props) => {
  const { children, environment } = props;

  const [state, dispatch] = useReducer(reducer, {
    ...initialContext,
    environment,
  });

  window.onmessage = createHandleMessageFromSandbox(dispatch);

  return <ViewContext.Provider value={state}>{children}</ViewContext.Provider>;
};

export default DefaultProvider;
export { Props as DefaultProviderProps };

import { useContext, useMemo } from 'react';

import MessageContext from '../MessageContext';
import createLogger from './createLogger';

const useLogger = () => {
  const { environment } = useContext(MessageContext);

  return useMemo(() => createLogger(environment), [environment]);
};

export default useLogger;

import { useContext, useMemo } from 'react';

import ViewContext from '../components/ViewContext';
import createLogger from './createLogger';

const useLogger = () => {
  const { environment } = useContext(ViewContext);

  return useMemo(() => createLogger(environment), [environment]);
};

export default useLogger;

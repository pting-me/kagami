import { Context, FC } from 'react';

import DefaultProvider, { DefaultProviderProps } from './DefaultProvider';
import ViewContext, { type ContextState } from './ViewContext';

interface ViewContextType extends Context<ContextState> {
  DefaultProvider: FC<DefaultProviderProps>;
}

(ViewContext as ViewContextType).DefaultProvider = DefaultProvider;

export default ViewContext as ViewContextType;
export type { ContextState };

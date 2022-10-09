import { useContext } from 'react';

import { DownloadButton } from '@kagami/view-ui';

import useLogger from '../../utils/useLogger';
import NodeList from '../NodeList';
import ViewContext from '../ViewContext';

export function MainLayout() {
  const context = useContext(ViewContext);
  const { componentNodes, componentSetNodes } = context;

  const logger = useLogger();

  const handleLogContext = () => {
    logger.log(context);
  };

  return (
    <div className="pb-4">
      {!context.environment.production && (
        <div className="px-4 pt-4 pb-2 border-b bg-warning-tertiary">
          <h1 className="font-bold">Development Mode</h1>
          <div className="py-2">
            This section only shows up in the development build. To view this in
            production mode, run:
          </div>
          <div className="py-2">
            <code>pnpm build-prod</code>
          </div>
          <div className="py-2 flex">
            <DownloadButton
              className="flex h-4 p-4 border border-onwarning rounded items-center justify-center bg"
              aria-label="Download Context"
              dataBlob={[JSON.stringify(context)]}
              filename={'context.json'}
            >
              Download Context
            </DownloadButton>
            <button
              className="flex h-4 ml-4 p-4 border border-onwarning rounded items-center justify-center bg"
              aria-label="Log Context"
              onClick={handleLogContext}
            >
              Log Context
            </button>
          </div>
        </div>
      )}
      <div className="py-2">
        <div className="py-2 px-4">
          Download TypeScript React component scaffolding from your Figma
          component definitions.
        </div>
      </div>
      <div className="py-2 border-t">
        <h1 className="py-2 px-4 font-bold">Component Sets</h1>
        <div className="py-2">
          {componentSetNodes?.length ? (
            <NodeList nodes={componentSetNodes} type="COMPONENT_SET"></NodeList>
          ) : (
            <div className="px-4 text-warning">No component sets found.</div>
          )}
        </div>
      </div>
      <div className="py-2 border-t">
        <h1 className="py-2 px-4 font-bold">Standalone Components</h1>
        <div className="py-2 px-4 text-secondary">
          Currently only component sets are available for download.
        </div>
        <div className="py-2">
          {componentNodes?.length ? (
            <NodeList nodes={componentNodes} type="COMPONENT"></NodeList>
          ) : (
            <div className="px-4 text-warning">No components found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

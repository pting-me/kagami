import { useContext } from 'react';

import { DownloadButton } from '@kagami/view-ui';

import MessageContext from '../MessageContext';
import NodeList from '../NodeList';

export function MainLayout() {
  const context = useContext(MessageContext);
  const { componentNodes, componentSetNodes } = context;

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
          <div className="py-2">
            <DownloadButton
              className="flex h-4 p-4 border border-onwarning rounded items-center justify-center bg"
              aria-label="Download raw data"
              dataBlob={[JSON.stringify(context)]}
              filename={'mock-manifest.json'}
            >
              Download raw data
            </DownloadButton>
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
        <h1 className="py-2 px-4 font-bold">Components</h1>
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

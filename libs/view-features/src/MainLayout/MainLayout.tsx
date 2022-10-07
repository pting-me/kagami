import { useContext } from 'react';

import { DownloadButton } from '@kagami/view-ui';

import MessageContext from '../MessageContext';
import NodeList from '../NodeList';

export function MainLayout() {
  const context = useContext(MessageContext);
  const { componentNodes, componentSetNodes } = context;
  console.log(context);

  return (
    <div>
      <div className="my-4">
        <div className="px-4 pb-4">
          <h1>Development Section</h1>
          <div>
            This section only shows up in the development build. Run{' '}
            <code>pnpm build-prod</code> for the production build.
          </div>
          {!context.environment.production && (
            <DownloadButton
              className="flex h-4 p-4 border rounded items-center justify-center bg"
              aria-label="Download raw data"
              dataBlob={[JSON.stringify(context)]}
              filename={'mock-manifest.json'}
            >
              Download raw data
            </DownloadButton>
          )}
        </div>
        <div className="px-4">
          Download TypeScript React component scaffolding from your Figma
          component definitions.
        </div>
      </div>
      <div className="my-4 border-t">
        <h1 className="p-4 font-bold">Component Sets</h1>
        {componentSetNodes?.length ? (
          <NodeList nodes={componentSetNodes} type="COMPONENT_SET"></NodeList>
        ) : (
          <div className="px-4 text-warning">No component sets found.</div>
        )}
      </div>
      <div className="my-4 border-t">
        <h1 className="p-4 font-bold">Components</h1>
        <div className="px-4 pb-4 text-secondary">
          Currently only component sets are available for download.
        </div>
        {componentNodes?.length ? (
          <NodeList nodes={componentNodes} type="COMPONENT"></NodeList>
        ) : (
          <div className="px-4 text-warning">No components found.</div>
        )}
      </div>
    </div>
  );
}

export default MainLayout;

import { useContext } from 'react';
import DownloadButton from '../DownloadButton';
import MessageContext from '../MessageContext';
import NodeList from '../NodeList';

export function MainLayout() {
  const context = useContext(MessageContext);
  const { componentNodes, componentSetNodes } = context;

  return (
    <div>
      <div className="my-4 px-4 flex justify-end">
        <div>
          <DownloadButton
            className="h-8 px-3 bg-brand rounded-md"
            data={context}
            filename="hashi-manifest.json"
          >
            Download manifest
          </DownloadButton>
        </div>
      </div>
      <div className="mt-4 border-t">
        <h1 className="p-4 font-bold">Component Sets</h1>
        <NodeList nodes={componentSetNodes} type="COMPONENT_SET"></NodeList>
      </div>
      <div className="mt-4 border-t">
        <h1 className="p-4 font-bold">Components</h1>
        <NodeList nodes={componentNodes} type="COMPONENT"></NodeList>
      </div>
      <div className="h-4"></div>
    </div>
  );
}

export default MainLayout;

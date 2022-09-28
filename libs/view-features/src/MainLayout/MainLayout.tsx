import { useContext } from 'react';
import DownloadButton from '../DownloadButton';
import MessageContext from '../MessageContext';
import NodeList from '../NodeList';

export function MainLayout() {
  const context = useContext(MessageContext);
  const { componentNodes, componentSetNodes } = context;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <DownloadButton
            style={{ backgroundColor: 'var(--figma-color-bg-brand)' }}
            data={context}
            filename="hashi-manifest.json"
          >
            Download manifest
          </DownloadButton>
        </div>
      </div>
      <h1>Component Sets</h1>
      <NodeList nodes={componentSetNodes} type="COMPONENT_SET"></NodeList>
      <h1>Components</h1>
      <NodeList nodes={componentNodes} type="COMPONENT"></NodeList>
    </div>
  );
}

export default MainLayout;

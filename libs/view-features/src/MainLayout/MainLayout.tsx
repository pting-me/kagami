import { useContext } from 'react';

import MessageContext from '../MessageContext';
import NodeList from '../NodeList';

export function MainLayout() {
  const context = useContext(MessageContext);
  const { componentNodes, componentSetNodes } = context;

  return (
    <div>
      <div className="my-4">
        <div className="px-4">
          Download TypeScript React component scaffolding from your Figma
          component definitions.
        </div>
      </div>
      <div className="my-4 border-t">
        <h1 className="p-4 font-bold">Component Sets</h1>
        <NodeList nodes={componentSetNodes} type="COMPONENT_SET"></NodeList>
      </div>
      <div className="my-4 border-t">
        <h1 className="p-4 font-bold">Components</h1>
        <NodeList nodes={componentNodes} type="COMPONENT"></NodeList>
      </div>
    </div>
  );
}

export default MainLayout;

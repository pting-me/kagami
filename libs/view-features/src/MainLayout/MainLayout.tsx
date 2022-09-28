import { useContext } from 'react';
import MessageContext from '../MessageContext';
import NodeList from '../NodeList';

export function MainLayout() {
  const { components, componentSets } = useContext(MessageContext);
  return (
    <div>
      <NodeList nodes={components} type="COMPONENT"></NodeList>
      <NodeList nodes={componentSets} type="COMPONENT_SET"></NodeList>
    </div>
  );
}

export default MainLayout;

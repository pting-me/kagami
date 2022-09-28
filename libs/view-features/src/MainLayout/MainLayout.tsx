import { useContext } from 'react';
import MessageContext from '../MessageContext';
import NodeList from '../NodeList';
import postMessageToSandbox from '../postMessageToSandbox';

export function MainLayout() {
  const { componentNodes, componentSetNodes } = useContext(MessageContext);

  const handleClick = () => {
    postMessageToSandbox({ type: 'download', payload: { componentSetNodes } });
  };

  return (
    <div>
      <button onClick={handleClick}>Download as JSON</button>
      <NodeList nodes={componentNodes} type="COMPONENT"></NodeList>
      <NodeList nodes={componentSetNodes} type="COMPONENT_SET"></NodeList>
    </div>
  );
}

export default MainLayout;

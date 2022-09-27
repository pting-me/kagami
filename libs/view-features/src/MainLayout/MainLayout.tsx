import { ComponentList, MessageContextWrapper } from '@hashi/view-features';
import postMessageToSandbox from '../postMessageToSandbox';

export function MainLayout() {
  const handleClick = () => {
    postMessageToSandbox({ action: 'foo', payload: 'bar' });
  };
  return (
    <div>
      <ComponentList></ComponentList>
      <button onClick={handleClick}>Fire event</button>
    </div>
  );
}

export default MainLayout;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.css';
import { ComponentList, MessageContextWrapper } from '@hashi/view-features';

export function App() {
  return (
    <MessageContextWrapper>
      <ComponentList></ComponentList>
    </MessageContextWrapper>
  );
}

export default App;

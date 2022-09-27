import { MainLayout, MessageContextWrapper } from '@hashi/view-features';

export function App() {
  return (
    <MessageContextWrapper>
      <MainLayout></MainLayout>
    </MessageContextWrapper>
  );
}

export default App;

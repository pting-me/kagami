import { MainLayout, MessageContextWrapper } from '@kagami/view-features';

export function App() {
  return (
    <MessageContextWrapper>
      <MainLayout></MainLayout>
    </MessageContextWrapper>
  );
}

export default App;

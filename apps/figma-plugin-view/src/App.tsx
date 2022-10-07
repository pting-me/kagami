import { MainLayout, MessageContextWrapper } from '@kagami/view-features';

import { environment } from './environments/environment';

export function App() {
  return (
    <MessageContextWrapper environment={environment}>
      <MainLayout></MainLayout>
    </MessageContextWrapper>
  );
}

export default App;

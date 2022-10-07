import { MainLayout, ViewContext } from '@kagami/view-features';

import { environment } from './environments/environment';

export function App() {
  return (
    <ViewContext.DefaultProvider environment={environment}>
      <MainLayout></MainLayout>
    </ViewContext.DefaultProvider>
  );
}

export default App;

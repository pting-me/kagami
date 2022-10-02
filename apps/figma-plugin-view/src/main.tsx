import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(
  // HTML is guaranteed to have #root node
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

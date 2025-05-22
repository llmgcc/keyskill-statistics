import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

import '@radix-ui/themes/styles.css';
import './index.css';

import { Theme } from '@radix-ui/themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter
        basename={
          process.env.NODE_ENV === 'production' ? '/keyskill-statistics/' : '/'
        }
      >
        <App />
      </BrowserRouter>
    </Theme>
  </StrictMode>,
);

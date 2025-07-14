import i18n from '@/i18n/i18n';
import { StrictMode } from 'react';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import '@radix-ui/themes/styles.css';
import './index.css';

import { Theme } from '@radix-ui/themes';

import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';

import App from './App.tsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      staleTime: Infinity,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter
        basename={
          process.env.NODE_ENV === 'production' ? '/keyskill-statistics/' : '/'
        }
      >
        <Provider>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <App />
              <Toaster />
            </QueryClientProvider>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </Theme>
  </StrictMode>
);

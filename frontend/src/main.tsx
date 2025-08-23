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

import './index.css';

import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';

import App from './App.tsx';
import ScrollToTop from './components/ui/ScrollToTop.tsx';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      staleTime: Infinity,
      retry: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter
      basename={
        process.env.NODE_ENV === 'production' ? '/keyskill-statistics/' : '/'
      }
    >
      <ScrollToTop />
      <Provider>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster />
          </QueryClientProvider>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

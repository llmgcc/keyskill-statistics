import { useEffect, useRef } from 'react';

import '@/App.css';
import '@/i18n/i18n';

import i18n from '@/i18n/i18n';
import { useCategoriesStore } from '@/store/categoriesStore.ts';
import { useCurrencyStore } from '@/store/currencyStore.ts';
import { useDomainsStore } from '@/store/domainsStore.ts';
import { useStatsStore } from '@/store/statsStore.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { Filter } from '@/components/Filter/Filter';
import { Highlights } from '@/components/Highlights/Highlights.tsx';
import { Navigation } from '@/components/Navigation/Navigation.tsx';
import { TextSection } from '@/components/TextSection/TextSection';

import { Tabs } from './components/Tabs/Tabs';
import { SkillFilterProvider } from './providers/SkillFilterProvider';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const navigate = useNavigate();
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const fetchDomains = useDomainsStore((state) => state.fetchDomains);
  const fetchStats = useStatsStore((state) => state.fetchStats);
  const fetchCurrencies = useCurrencyStore((state) => state.fetchCurrencies);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCurrencies();
    fetchCategories();
    fetchDomains();
    fetchStats();
  }, []);

  const scrollToTabs = () => {
    const offset = 100;
    const element = tabsRef.current;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const hasTabParam = new URLSearchParams(location.search).has('tab');
    if (!hasTabParam) {
      navigate({ search: `?tab=key-skills` }, { replace: true });
    }
  }, [location.search]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
          <Navigation />
          <TextSection
            onLinkClick={(tabName) => {
              navigate({ search: `?tab=${tabName}` }, { replace: true });
              scrollToTabs();
            }}
          />
          <Filter />
          {/* <Highlights />
          <ScrollToTopButton element={tabsRef} onClick={scrollToTabs} />
          <SkillFilterProvider>
            <div ref={tabsRef}>
              <Tabs />
            </div>
          </SkillFilterProvider> */}
        </div>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

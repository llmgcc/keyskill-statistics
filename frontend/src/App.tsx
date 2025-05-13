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
import { GrTechnology } from 'react-icons/gr';
import { MdCategory, MdLeaderboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Filters } from '@/components/ui/Filters.tsx';
import { TabNavigation } from '@/components/ui/TabNavigation.tsx';
import { Highlights } from '@/components/Highlights/Highlights.tsx';
import { CategoriesTable } from '@/components/key-skills/CategoriesTable.tsx';
import KeySkills from '@/components/key-skills/KeySkills.tsx';
import { TechnologiesTable } from '@/components/key-skills/TechnologiesTable.tsx';
import { Navigation } from '@/components/Navigation/Navigation.tsx';
import { SkillsFilter } from '@/components/SkillsFilter/SkillsFilter.tsx';
import { TextSection } from '@/components/TextSection/TextSection';

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

  const tabs = [
    {
      title: (
        <div className="flex items-center">
          <div>
            <MdLeaderboard />
          </div>
          <div className="ml-1">Key Skills</div>
        </div>
      ),
      body: () => <KeySkills />,
      name: 'skills',
      path: '/key-skills',
      append: (
        <div className="flex w-full items-end justify-end text-right">
          <SkillsFilter />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <MdCategory />
          </div>
          <div className="ml-1">Domains</div>
        </div>
      ),
      body: () => (
        <div>
          <CategoriesTable />
        </div>
      ),
      name: 'domains',
      path: '/domains',
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <GrTechnology />
          </div>
          <div className="ml-1">Categories</div>
        </div>
      ),
      body: () => (
        <div>
          <TechnologiesTable />
        </div>
      ),
      name: 'categories',
      path: '/categories',
    },
  ];

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
          <Navigation />
          <TextSection
            onLinkClick={(tab) => {
              navigate(tabs[tab].path);
              scrollToTabs();
            }}
          />
          {/* <Filters />
          <Highlights />
          <SkillFilterProvider>
            <div ref={tabsRef}>
              <TabNavigation tabs={tabs} />
            </div>
          </SkillFilterProvider> */}
        </div>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

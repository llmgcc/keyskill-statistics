import { useEffect, useRef, useState } from 'react';

import './App.css';
import '@/i18n/i18n';

import i18n from '@/i18n/i18n';
import { Tabs } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { GrTechnology } from 'react-icons/gr';
import { MdCategory, MdLeaderboard } from 'react-icons/md';

import { Highlights } from '@/components/Highlights/Highlights.tsx';

import { CategoriesTable } from './components/key-skills/CategoriesTable.tsx';
import KeySkills from './components/key-skills/KeySkills.tsx';
import { TechnologiesTable } from './components/key-skills/TechnologiesTable.tsx';
import { Navigation } from './components/Navigation/Navigation.tsx';
import { Filters } from './components/ui/Filters.tsx';
import SkillImage from './components/ui/SkillImage.tsx';
import { TextSection } from './components/ui/TextSection.tsx';
import { Categories } from './config/categories.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import { useCategoriesStore } from './store/categoriesStore.ts';
import { useCurrencyStore } from './store/currencyStore.ts';
import { useDomainsStore } from './store/domainsStore.ts';
import { useStatsStore } from './store/statsStore.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const fetchDomains = useDomainsStore((state) => state.fetchDomains);
  const fetchStats = useStatsStore((state) => state.fetchStats);
  const fetchCurrencies = useCurrencyStore((state) => state.fetchCurrencies);
  const [currentTab, setCurrentTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCurrencies();
    fetchCategories();
    fetchDomains();
    fetchStats();
  }, []);

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
    },
  ];

  function openNewTab(tabIndex: number) {
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
    setCurrentTab(tabIndex);
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
            <Navigation />
            <TextSection onLinkClick={(tab) => openNewTab(tab)} />
            <Filters />
            <Highlights />

            {/* {
            Object.keys(Categories).map(c => {
              return (
                <div key={c} className='flex items-center p-2'>
                  <div className='w-10 aspect-square'>
                    <SkillImage category={c}/>
                  </div>
                  <div className='mx-2'>
                    {c}
                  </div>
                </div>
              )
            })
          } */}

            <div className="app-container mt-4" ref={tabsRef}>
              <Tabs.Root
                value={tabs[currentTab].name}
                onValueChange={(value) => {
                  const newIndex = tabs.findIndex((tab) => tab.name === value);
                  setCurrentTab(newIndex);
                }}
              >
                <div className="flex items-center justify-between">
                  <Tabs.List>
                    {tabs.map((tab) => {
                      return (
                        <Tabs.Trigger
                          value={tab.name}
                          key={tab.name}
                          className="cursor-pointer"
                        >
                          {tab.title}
                        </Tabs.Trigger>
                      );
                    })}
                  </Tabs.List>
                </div>
                {tabs.map((tab) => {
                  return (
                    <Tabs.Content
                      value={tab.name}
                      className="py-2"
                      key={tab.name}
                    >
                      {tab.body()}
                    </Tabs.Content>
                  );
                })}
              </Tabs.Root>
            </div>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

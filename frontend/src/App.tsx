import { useEffect, useRef } from 'react';

import '@/App.css';
import '@/i18n/i18n';

import i18n from '@/i18n/i18n';
import { useCategoriesStore } from '@/store/categoriesStore.ts';
import { useCurrencyStore } from '@/store/currencyStore.ts';
import { useDomainsStore } from '@/store/domainsStore.ts';
import { useStatsStore } from '@/store/statsStore.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { GrTechnology } from 'react-icons/gr';
import { MdCategory, MdLeaderboard, MdOutlineCategory } from 'react-icons/md';
import { CgList } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

import { TabNavigation } from '@/components/ui/TabNavigation.tsx';
import { Filter } from '@/components/Filter/Filter';
import { Highlights } from '@/components/Highlights/Highlights.tsx';
import { CategoriesTable } from '@/components/key-skills/CategoriesTable.tsx';
import KeySkills from '@/components/key-skills/KeySkills.tsx';
import { TechnologiesTable } from '@/components/key-skills/TechnologiesTable.tsx';
import { Navigation } from '@/components/Navigation/Navigation.tsx';
import { SkillFilter } from '@/components/SkillFilter/SkillFilter';
import { TextSection } from '@/components/TextSection/TextSection';

import { SkillFilterProvider } from './providers/SkillFilterProvider';
import { BiCategory } from 'react-icons/bi';

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
  const {t} = useTranslation()

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
            <CgList />
          </div>
          <div className="ml-1">{t('common.skills')}</div>
        </div>
      ),
      body: () => <div><KeySkills /></div>,
      name: 'skills',
      path: '/key-skills',
      append: (
        <div className="flex w-full items-end justify-end text-right h-fit">
          <SkillFilter />
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <MdOutlineCategory />
          </div>
          <div className="ml-1">{t('common.domains')}</div>
        </div>
      ),
      body: () => <div><CategoriesTable /></div>,
      name: 'domains',
      path: '/domains',
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <BiCategory />
          </div>
          <div className="ml-1">{t('common.categories')}</div>
        </div>
      ),
      body: () => <div><TechnologiesTable /></div>,
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
          <Filter />
          <Highlights />
          <SkillFilterProvider>
            <div ref={tabsRef}>
              <TabNavigation tabs={tabs} />
            </div>
          </SkillFilterProvider>
        </div>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

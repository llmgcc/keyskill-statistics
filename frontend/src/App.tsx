import { useEffect } from 'react';

import '@/App.css';
import '@/i18n/i18n';

import { Route, Routes } from 'react-router-dom';

import { useCategoriesStore } from '@/store/categoriesStore.ts';
import { useCurrencyStore } from '@/store/currencyStore.ts';
import { useDomainsStore } from '@/store/domainsStore.ts';
import { useStatsStore } from '@/store/statsStore.ts';
import { Navigation } from '@/components/Navigation/Navigation.tsx';

import { Footer } from './components/Footer/Footer';
import { Categories } from './components/Pages/Categories/Categories';
import { CategoryPage } from './components/Pages/CategoryPage';
import { DomainPage } from './components/Pages/DomainPage';
import { Domains } from './components/Pages/Domains/Domains';
import { Favourites } from './components/Pages/Favourites/Favourites';
import { Highlights } from './components/Pages/Highlights/Highlights';
import { MainPage } from './components/Pages/MainPage';
import { SkillPage } from './components/Pages/SkillPage';
import { Skills } from './components/Pages/Skills/Skills';
import { useRouterConfig } from './router';

function TitleWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
}

export default function App() {
  const fetchCategories = useCategoriesStore(state => state.fetchCategories);
  const fetchDomains = useDomainsStore(state => state.fetchDomains);
  const fetchStats = useStatsStore(state => state.fetchStats);
  const fetchCurrencies = useCurrencyStore(state => state.fetchCurrencies);

  useEffect(() => {
    fetchCurrencies();
    fetchCategories();
    fetchDomains();
    fetchStats();
  }, []);

  const config = useRouterConfig();

  return (
    <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
      <Navigation />
      <Routes>
        {config.map(c => (
          <Route
            path={c.path}
            element={<TitleWrapper title={c.title}>{c.element}</TitleWrapper>}
            key={c.id}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

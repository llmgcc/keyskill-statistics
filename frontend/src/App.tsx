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
import { CategoryPage } from './components/Pages/CategoryPage';
import { DomainPage } from './components/Pages/DomainPage';
import { MainPage } from './components/Pages/MainPage';
import { SkillPage } from './components/Pages/SkillPage';

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

  return (
    <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/skill/:name" element={<SkillPage />} />
        <Route path="/domain/:name" element={<DomainPage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

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
import { routerConfig } from './router';

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

  const config = routerConfig();

  return (
    <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
      <Navigation />
      <Routes>
        {config.map(c => (
          <Route path={c.path} element={c.element} key={c.id} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

import { Navigate } from 'react-router-dom';

import { Categories } from './components/Pages/Categories/Categories';
import { CategoryPage } from './components/Pages/CategoryPage/CategoryPage';
import { DomainPage } from './components/Pages/DomainPage/DomainPage';
import { Domains } from './components/Pages/Domains/Domains';
import { Favorites } from './components/Pages/Favorites/Favorites';
import { HighlightsPage } from './components/Pages/Highlights/HighlightsPage';
import { HighlightTypePage } from './components/Pages/Highlights/HighlightTypePage';
import { MainPage } from './components/Pages/MainPage/MainPage';
import { SkillPage } from './components/Pages/SkillPage/SkillPage';
import { Skills } from './components/Pages/Skills/Skills';

export function routerConfig() {
  return [
    {
      id: 'skills',
      path: '/skills',
      element: <Skills />,
    },
    {
      id: 'categories',
      path: '/categories',
      element: <Categories />,
    },
    {
      id: 'domains',
      path: '/domains',
      element: <Domains />,
    },
    {
      id: 'highlights',
      path: '/highlights',
      element: <HighlightsPage />,
    },
    {
      id: 'highlights',
      path: '/highlights/:type',
      element: <HighlightTypePage />,
    },
    {
      id: 'favorites',
      path: '/favorites',
      element: <Favorites />,
    },
    {
      id: 'mainPage',
      path: '/',
      element: <MainPage />,
    },
    {
      id: 'skill',
      path: '/skill/:name',
      element: <SkillPage />,
    },
    {
      id: 'domain',
      path: '/domain/:name',
      element: <DomainPage />,
    },
    {
      id: 'category',
      path: '/category/:name',
      element: <CategoryPage />,
    },
    {
      id: 'default',
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ];
}

// import { useTranslation } from 'react-i18next';

import { APP_NAME } from './components/Navigation/Logo';
import { Categories } from './components/Pages/Categories/Categories';
import { CategoryPage } from './components/Pages/CategoryPage/CategoryPage';
import { DomainPage } from './components/Pages/DomainPage/DomainPage';
import { Domains } from './components/Pages/Domains/Domains';
import { Favourites } from './components/Pages/Favourites/Favourites';
import { HighlightsPage } from './components/Pages/Highlights/HighlightsPage';
import { HighlightTypePage } from './components/Pages/Highlights/HighlightTypePage';
import { MainPage } from './components/Pages/MainPage';
import { SkillPage } from './components/Pages/SkillPage/SkillPage';
import { Skills } from './components/Pages/Skills/Skills';

export function useRouterConfig() {
  // const { t } = useTranslation();

  function createTitle(name: string) {
    return `${APP_NAME}: ${name}`;
  }

  return [
    {
      id: 'skills',
      path: '/skills',
      element: <Skills />,
      title: createTitle('Skills'),
    },
    {
      id: 'categories',
      path: '/categories',
      element: <Categories />,
      title: createTitle('Categories'),
    },
    {
      id: 'domains',
      path: '/domains',
      element: <Domains />,
      title: createTitle('Domains'),
    },
    {
      id: 'highlights',
      path: '/highlights',
      element: <HighlightsPage />,
      title: createTitle('Highlights'),
    },
    {
      id: 'highlights',
      path: '/highlights',
      element: <HighlightsPage />,
      title: createTitle('Highlights'),
    },
    {
      id: 'highlights',
      path: '/highlights/:type',
      element: <HighlightTypePage />,
      title: createTitle('Highlights'),
    },
    {
      id: 'favourites',
      path: '/favourites',
      element: <Favourites />,
      title: createTitle('Favourites'),
    },
    {
      id: 'mainPage',
      path: '/',
      element: <MainPage />,
      title: createTitle('Main page'),
    },
    {
      id: 'skill',
      path: '/skill/:name',
      element: <SkillPage />,
      title: createTitle('Skill'),
    },
    {
      id: 'domain',
      path: '/domain/:name',
      element: <DomainPage />,
      title: createTitle('Domain'),
    },
    {
      id: 'category',
      path: '/category/:name',
      element: <CategoryPage />,
      title: createTitle('Category'),
    },
  ];
}

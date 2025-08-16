import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { Highlights } from '@/components/Pages/MainPage/Highlights/Highlights';
import { TextSection } from '@/components/Pages/MainPage/TextSection/TextSection';

import { StickyFilter } from '../Common/StickyFilter';
import { Tabs } from './Tabs';

export function MainPage() {
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
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

  const { t } = useTranslation();
  useDocumentTitle(t(`common.mainPage`));

  return (
    <div>
      <TextSection
        onLinkClick={(tabName: string) => {
          navigate({ search: `?tab=${tabName}` }, { replace: true });
          scrollToTabs();
        }}
      />
      <div className="app-container">
        <StickyFilter />
      </div>
      <Highlights />
      <ScrollToTopButton element={tabsRef} onClick={scrollToTabs} />
      <div ref={tabsRef} className="app-container mt-8">
        <Tabs />
      </div>
    </div>
  );
}

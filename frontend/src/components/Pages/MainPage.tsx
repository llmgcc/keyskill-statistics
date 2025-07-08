import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { Filter } from '@/components/Filter/Filter';
import { Highlights } from '@/components/Highlights/Highlights.tsx';
import { TextSection } from '@/components/TextSection/TextSection';

import { Tabs } from '../Tabs/Tabs';

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

  return (
    <div>
      <TextSection
        onLinkClick={tabName => {
          navigate({ search: `?tab=${tabName}` }, { replace: true });
          scrollToTabs();
        }}
      />
      <div className="app-container">
        <Filter />
      </div>
      <Highlights />
      <ScrollToTopButton element={tabsRef} onClick={scrollToTabs} />
      <div ref={tabsRef}>
        <Tabs />
      </div>
    </div>
  );
}

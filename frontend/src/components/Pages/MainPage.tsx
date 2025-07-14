import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { useTopOffset } from '@/hooks/useTopOffset';
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

  const navOffset = useTopOffset('#navbar');

  return (
    <div>
      <TextSection
        onLinkClick={tabName => {
          navigate({ search: `?tab=${tabName}` }, { replace: true });
          scrollToTabs();
        }}
      />
      <div className="app-container">
        <Sticky
          top={navOffset}
          enableTransforms={false}
          innerActiveClass="shadow-md shadow-background-secondary"
          innerZ={1000}
        >
          <Filter />
        </Sticky>
      </div>
      <Highlights />
      <ScrollToTopButton element={tabsRef} onClick={scrollToTabs} />
      <div ref={tabsRef}>
        <Tabs />
      </div>
    </div>
  );
}

import { memo, useEffect } from 'react';
import { Tabs } from '@radix-ui/themes';
import { useLocation, useNavigate } from 'react-router-dom';

import { useScreenSize } from '@/hooks/useScreenSize';

interface Tab {
  title: JSX.Element;
  body: JSX.Element;
  name: string;
  append?: JSX.Element;
}

interface TabNavigationProps {
  tabs: Tab[];
  paramKey?: string;
}

function _TabNavigation({ tabs, paramKey = 'tab' }: TabNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get(paramKey) || tabs[0].name;
  const { isMobile } = useScreenSize();
  const handleTabChange = (value: string) => {
    searchParams.set(paramKey, value);
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  useEffect(() => {
    if (!tabs.some(tab => tab.name === currentTab)) {
      navigate({ search: `?${paramKey}=${tabs[0].name}` }, { replace: true });
    }
  }, [currentTab]);

  const currentTabConfig = tabs.find(tab => tab.name === currentTab) || tabs[0];

  return (
    <div className="app-container mt-4">
      <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
        <div className="items-center lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-4">
          <Tabs.List size={isMobile ? '1' : '2'}>
            {tabs.map(tab => (
              <Tabs.Trigger
                value={tab.name}
                key={tab.name}
                className="cursor-pointer"
              >
                {tab.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <div>{currentTabConfig.append}</div>
        </div>

        {tabs.map(tab => (
          <Tabs.Content key={tab.name} value={tab.name} className="py-2">
            {tab.body}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

export const TabNavigation = memo(_TabNavigation);

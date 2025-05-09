import { useEffect, useRef } from 'react';
import { Tabs } from '@radix-ui/themes';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

interface Tabs {
  title: JSX.Element;
  body: () => JSX.Element;
  name: string;
  path: string;
}

interface TabNavigationProps {
  tabs: Tabs[];
}

export function TabNavigation({ tabs }: TabNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const getCurrentTabFromPath = () => {
    const currentPath = location.pathname;
    const foundTab = tabs.find((tab) => tab.path === currentPath);
    return foundTab ? foundTab.name : tabs[0].name;
  };

  const validPaths = tabs.map((tab) => tab.path);

  useEffect(() => {
    if (!validPaths.includes(location.pathname)) {
      navigate(tabs[0].path, { replace: true });
    }
  }, [location.pathname]);

  return (
    <div className="app-container mt-4" ref={tabsRef}>
      <Tabs.Root
        value={getCurrentTabFromPath()}
        onValueChange={(value) => {
          const selectedTab = tabs.find((tab) => tab.name === value) ?? tabs[0];
          navigate(selectedTab.path);
        }}
      >
        <div className="flex items-center justify-between">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Trigger
                value={tab.name}
                key={tab.name}
                className="cursor-pointer"
              >
                {tab.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>

        <Routes>
          {tabs.map((tab) => (
            <Route
              key={tab.path}
              path={tab.path}
              element={
                <Tabs.Content value={tab.name} className="py-2">
                  {tab.body()}
                </Tabs.Content>
              }
            />
          ))}
          <Route path="/" element={<Navigate to={tabs[0].path} replace />} />
        </Routes>
      </Tabs.Root>
    </div>
  );
}

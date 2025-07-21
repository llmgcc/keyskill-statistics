import { useCallback, useEffect } from 'react';
import { Tabs } from '@chakra-ui/react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface Tab {
  title: JSX.Element;
  body: JSX.Element;
  name: string;
  append?: JSX.Element;
}

interface RouterTabsProps {
  tabs: Tab[];
  paramKey?: string;
  defaultTab?: string;
}

export function RouterTabs({ tabs, paramKey = 'tab' }: RouterTabsProps) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = searchParams.get(paramKey) || tabs[0].name;
  const currentTabConfig = tabs.find(tab => tab.name === currentTab) || tabs[0];

  const handleTabChange = useCallback(
    (name: string) => {
      const newTab = tabs.find(t => t.name === name)?.name ?? tabs[0].name;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramKey, newTab);

      navigate(
        {
          pathname: location.pathname,
          search: newSearchParams.toString(),
        },
        { replace: true }
      );
    },
    [tabs, searchParams, paramKey, navigate, location.pathname]
  );

  useEffect(() => {
    if (!searchParams.get(paramKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramKey, currentTabConfig?.name);
      navigate(
        {
          pathname: location.pathname,
          search: newSearchParams.toString(),
        },
        { replace: true }
      );
    }
  }, [paramKey, searchParams, navigate, location.pathname, currentTabConfig]);

  return (
    <div className="app-container mt-4">
      <Tabs.Root
        defaultValue={tabs[0].name}
        value={currentTabConfig.name}
        variant="enclosed"
        className="mt-2 border-none bg-background-primary"
        size="sm"
        lazyMount
        onValueChange={details => handleTabChange(details.value)}
      >
        <Tabs.List className="flex gap-2 border-background-secondary bg-background-primary shadow-background-secondary">
          {tabs.map(tab => (
            <Tabs.Trigger
              value={tab.name}
              key={tab.name}
              className="border-none border-background-secondary bg-background-primary p-2 shadow-background-secondary"
              _selected={{
                bg: 'rgba(var(--color-background-secondary))',
              }}
            >
              {tab.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div>{currentTabConfig.append ?? null}</div>
        {tabs.map(tab => (
          <Tabs.Content
            value={tab.name}
            key={tab.name}
            className="mt-1 px-1 py-0 text-base"
          >
            {tab.body}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

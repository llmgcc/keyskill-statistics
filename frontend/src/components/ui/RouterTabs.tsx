import { memo, useCallback, useEffect } from 'react';
import { Separator, Tabs } from '@chakra-ui/react';
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
  append?: JSX.Element;
}

export function RouterTabs_({
  tabs,
  paramKey = 'tab',
  append,
}: RouterTabsProps) {
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
    <div className="">
      <Tabs.Root
        defaultValue={tabs[0].name}
        value={currentTabConfig.name}
        variant="enclosed"
        className="mt-2 border-none bg-background-primary p-0"
        size="sm"
        lazyMount
        onValueChange={details => handleTabChange(details.value)}
      >
        <div className="flex items-center gap-2 overflow-x-auto p-0">
          <Tabs.List className="flex gap-2 border-background-secondary bg-background-primary p-0 shadow-background-secondary">
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
          <div className=" ">
            <Separator
              orientation={'vertical'}
              size="md"
              className="mx-1"
              height="6"
            />
          </div>
          <div>{append ?? null}</div>
        </div>
        <div>{currentTabConfig.append ?? null}</div>
        {tabs.map(tab => (
          <Tabs.Content
            value={tab.name}
            key={tab.name}
            className="mt-1 p-0 text-base"
          >
            {tab.body}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

export const RouterTabs = memo(RouterTabs_);

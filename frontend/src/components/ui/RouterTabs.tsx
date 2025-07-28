import { memo, useCallback, useEffect } from 'react';
import { Separator, Tabs } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';

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
  onValueChange: () => void;
}

function RouterTabs_({
  tabs,
  paramKey = 'tab',
  onValueChange = () => {},
}: RouterTabsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentTab = searchParams.get(paramKey) || tabs[0].name;
  const currentTabConfig = tabs.find(tab => tab.name === currentTab) || tabs[0];

  const handleTabChange = useCallback(
    (name: string) => {
      onValueChange();
      const newTab = tabs.find(t => t.name === name)?.name ?? tabs[0].name;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramKey, newTab);
      setSearchParams(prev => newSearchParams);
    },
    [tabs, searchParams, paramKey, setSearchParams, onValueChange]
  );

  useEffect(() => {
    if (!searchParams.get(paramKey)) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramKey, currentTab);
      setSearchParams(prev => newSearchParams, { replace: true });
    }
  }, [paramKey, searchParams, setSearchParams, location.pathname, currentTab]);

  return (
    <div className="">
      <Tabs.Root
        defaultValue={tabs[0].name}
        value={currentTabConfig.name}
        variant="enclosed"
        className="mt-2 border-none bg-background-primary p-0"
        size="sm"
        lazyMount
        onValueChange={details => {
          handleTabChange(details.value);
        }}
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
          <div key={currentTabConfig.name}>
            {currentTabConfig.append ?? null}
          </div>
        </div>
        {/* <div>{currentTabConfig.append ?? null}</div> */}
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

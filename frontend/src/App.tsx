import { useEffect, useRef, useState } from 'react';

import './App.css';
import '@/i18n/i18n';

import { Tabs } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GrTechnology } from 'react-icons/gr';
import { MdCategory, MdLeaderboard } from 'react-icons/md';

import { CategoriesTable } from './components/key-skills/CategoriesTable.tsx';
import KeySkills from './components/key-skills/KeySkills.tsx';
import { TechnologiesTable } from './components/key-skills/TechnologiesTable.tsx';
import { Filters } from './components/ui/Filters.tsx';
import { Highlights } from './components/ui/Highlights.tsx';
import Navigation from './components/ui/Navigation.tsx';
import { TextSection } from './components/ui/TextSection.tsx';
import { useCategoriesStore } from './store/categoriesStore.ts';
import { useCurrencyStore } from './store/currencyStore.ts';
import { useDomainsStore } from './store/domainsStore.ts';
import { useStatsStore } from './store/statsStore.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { fetchCategories } = useCategoriesStore();
  const { fetchDomains } = useDomainsStore();
  const { fetchStats, stats } = useStatsStore();
  const [currentTab, setCurrentTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    useCurrencyStore.getState().fetchCurrencies();
    fetchCategories();
    fetchDomains();
    fetchStats();
  }, []);

  const tabs = [
    {
      title: (
        <div className="flex items-center">
          <div>
            <MdLeaderboard />
          </div>
          <div className="ml-1">Key Skills</div>
        </div>
      ),
      body: () => <KeySkills />,
      name: 'skills',
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <MdCategory />
          </div>
          <div className="ml-1">Domains</div>
        </div>
      ),
      body: () => (
        <div>
          <CategoriesTable />
        </div>
      ),
      name: 'domains',
    },
    {
      title: (
        <div className="flex items-center">
          <div>
            <GrTechnology />
          </div>
          <div className="ml-1">Categories</div>
        </div>
      ),
      body: () => (
        <div>
          <TechnologiesTable />
        </div>
      ),
      name: 'categories',
    },
  ];

  function openNewTab(tabIndex: number) {
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
    setCurrentTab(tabIndex);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-app relative z-10 min-h-screen w-full bg-background-primary">
        <Navigation stats={stats} />

        <TextSection stats={stats} onLinkClick={(tab) => openNewTab(tab)} />
        {/* 
        <div className='app-container'>
          {
            categories.map(d => {
              return (
                <div className=' p-2'>
                  <div className='flex items-center'>
                    <div className='w-10 aspect-square p-0'><SkillImage technology={d.name}/></div>
                    <div className='mx-2'>{d.name}</div>
                  </div>
                </div>
              )
            })
          }
        </div> */}

        <Filters />

        <Highlights />

        <div className="app-container mt-4" ref={tabsRef}>
          <Tabs.Root
            value={tabs[currentTab].name}
            onValueChange={(value) => {
              const newIndex = tabs.findIndex((tab) => tab.name === value);
              setCurrentTab(newIndex);
            }}
          >
            <Tabs.List>
              {tabs.map((tab) => {
                return (
                  <Tabs.Trigger value={tab.name} key={tab.name}>
                    {tab.title}
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
            {tabs.map((tab) => {
              return (
                <Tabs.Content value={tab.name} className="py-2" key={tab.name}>
                  {tab.body()}
                </Tabs.Content>
              );
            })}
          </Tabs.Root>
        </div>

        <div className="flex">
          <div className="app w-full">
            <div>
              {/* <Highlights/> */}

              <div className="">
                <div>
                  {/* <div className='flex justify-end align-bottom mb-2'>
                  <div>
                    <ButtonGroup buttons={buttons}/>
                  </div>
                </div>

                <div className='flex justify-end w-full'>
                    <div className='mx-1 text-lg'>
                      <ButtonGroup buttons={buttonsDark}/>
                    </div>
                </div>
                <div className='flex justify-end py-2'>
                  <div>
                    <ButtonGroup buttons={countButtons}/>
                  </div>
                  <div className='mx-1'>
                    <ButtonGroup buttons={buttonsPlot} />
                  </div>
                  <div>
                    <ButtonGroup buttons={buttons}/>
                  </div>
                </div> */}

                  {/* <div className='flex justify-between items-center'>
                  <div className='flex justify-start w-full my-2'>
                      <ButtonGroup buttons={buttons}/>
                  </div>
                  <div className='flex justify-end w-full my-2'>
                      <ButtonGroup buttons={settings} defaultActiveButtonIndex={1}/>
                  </div>
                  <div>
                    <Button title={<div className='flex'><div><GiSettingsKnobs/></div><div className='ml-1'>Settings</div></div>} ></Button>
                  </div>
                </div> */}
                  {/* <Plot data={Array.from({length: 10}, () => Math.random()*100)} color="#009900"/> */}
                  {/* <Plot data={[0, 1,2,3, 4, 5, 6, 7, 8, 9, -10, -9, 25, 17, 6, 5, 4, 3, 2, 1, 0, -5]} color="#009900"/> */}
                  {/* <KeySkills></KeySkills> */}
                  {/* <div className="m-4">
                  <Tabs tabs={tabs} />
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;

import { Tabs } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { useSkillDetails } from '@/hooks/data/useSkillDetails';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useTopOffset } from '@/hooks/useTopOffset';

import { Filter } from '../Filter/Filter';
import { Complexity } from './Common/Complexity';
import { DemandTrend } from './Common/DemandTrend';
import { Header } from './Common/Header';
import { PredictionsCard } from './Common/PredictionsCard';
import { SalaryDistribution } from './Common/SalaryDistribution';

export function SkillPage() {
  const { name } = useParams<{ name: string }>();
  const decodedName = name ? decodeURIComponent(name) : null;

  const { skillDetails, isLoading, isFetching } = useSkillDetails(
    decodedName ?? null
  );

  const navOffset = useTopOffset('#navbar');
  const headerOffset = useTopOffset('#header');

  const skillChanged = skillDetails?.name !== name;

  return (
    <div className="app-container">
      <div className="rounded bg-background-primary py-2">
        <div>
          <Header skill={skillDetails} isLoading={skillChanged} />
        </div>

        <div className="my-2">
          <Sticky
            top={navOffset + headerOffset}
            enableTransforms={false}
            innerActiveClass="border-none rounded-none shadow-md shadow-background-secondary"
            innerClass="border-[1px] border-background-secondary"
            innerZ={1000}
          >
            <div className="relative z-40 bg-background-primary">
              <Filter />
            </div>
          </Sticky>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full md:flex-[65]">
            <DemandTrend
              data={skillDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
          <div className="w-full md:flex-[35]">
            <SalaryDistribution
              data={skillDetails ?? null}
              isDataReady={!(isLoading || isFetching)}
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2 lg:flex-row">
          <div className="flex-[70]">
            <div>
              <Complexity
                data={skillDetails ?? null}
                isDataReady={!(isLoading || isFetching)}
              />
            </div>
            {/* <div className="w-full">
              <Tabs.Root
                defaultValue="members"
                variant="enclosed"
                className="mt-2 border-none bg-background-primary"
                size="sm"
              >
                <Tabs.List className="flex gap-2 bg-background-primary">
                  {['Related skills', 'Similar skills'].map(tab => (
                    <Tabs.Trigger
                      value={tab}
                      key={tab}
                      className="border-none bg-background-primary p-2"
                      _selected={{
                        bg: 'rgba(var(--color-background-secondary))',
                      }}
                    >
                      {tab}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                <Tabs.Content value="Related skills" className="p-0">
                  <div className="p-2 text-base">
                    <div className="text-sm text-text-secondary">
                      Skills that frequently appear together in job postings.
                      Shows which competencies are typically required in
                      combination
                    </div>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="Similar skills" className="p-0">
                  <div className="p-2 text-base">
                    <div className="text-sm text-text-secondary">
                      Skills that are similar in meaning or functionality. They
                      can be alternatives or useful additions
                    </div>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div> */}
          </div>
          <div className="flex-[30]">
            {skillDetails?.name && (
              <div className="flex w-[100%] flex-col gap-2">
                <PredictionsCard
                  translationKey="domains"
                  type="domain"
                  categories={skillDetails?.domains ?? []}
                />
                {/* <PredictionsCard
                  translationKey="categories"
                  categories={skillDetails?.categories ?? []}
                /> */}
              </div>
            )}
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

import { useParams } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { useSkillDetails } from '@/hooks/data/useSkillDetails';
import { useTopOffset } from '@/hooks/useTopOffset';

import { Filter } from '../Filter/Filter';
import { Complexity } from './Common/Complexity';
import { DemandTrend } from './Common/DemandTrend';
import { Header } from './Common/Header';
import { PredictionsCard } from './Common/PredictionsCard';
import { SalaryDistribution } from './Common/SalaryDistribution';
import { SkillPageTabs } from './SkillPage/SkillPageTabs';

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
            innerActiveClass="border-none rounded-none shadow-md shadow-background-secondary rounded-none"
            innerClass="border-[1px] border-background-secondary rounded"
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
          <div className="order-2 flex flex-[70] flex-col gap-2 lg:order-1">
            <div className="">
              <Complexity
                data={skillDetails ?? null}
                isDataReady={!(isLoading || isFetching)}
              />
            </div>
            <SkillPageTabs skill={skillDetails ?? null} />
          </div>
          <div className="order-1 flex-[30] lg:order-2">
            <div className="flex w-[100%] flex-col gap-2">
              <PredictionsCard
                categories={skillDetails?.domains ?? []}
                type="domains"
                isDataReady={!(isLoading || isFetching)}
              />
              <PredictionsCard
                categories={skillDetails?.categories ?? []}
                type="categories"
                isDataReady={!(isLoading || isFetching)}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

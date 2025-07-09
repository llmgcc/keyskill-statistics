import { Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useSkillDetails } from '@/hooks/data/useSkillDetails';
import { useSkillDetailsShort } from '@/hooks/data/useSkillDetailsShort';

import { Filter } from '../Filter/Filter';
import { SkillImage } from '../ui/SkillImage';
import { Complexity } from './Common/Complexity';
import { DemandTrend } from './Common/DemandTrend';
import { PredictionsCard } from './Common/PredictionsCard';
import { SalaryDistribution } from './Common/SalaryDistribution';

function Header({ skillShort }) {
  return (
    <>
      {skillShort?.name && (
        <div className="relative z-10 flex items-center justify-between rounded border-[0px] border-background-secondary p-2 py-4 shadow-background-secondary">
          <div className="gradient absolute left-0 top-[-50%] -z-10 size-full h-[200%]"></div>
          <div className="flex">
            <div className="h-10 w-10">
              <SkillImage
                domain={skillShort.domains[0]?.name}
                path={skillShort?.image}
              />
            </div>
            <div className="mx-3">
              <div className="text-xl font-bold">{skillShort?.name}</div>
              <div className="flex items-center text-xs text-text-secondary">
                <div className="">{skillShort.domains[0]?.name}</div>
                <div className="mx-1">•</div>
                <div className="">{skillShort.categories[0]?.name}</div>
              </div>
            </div>
          </div>

          {/* <div className="text-base">
              Rank
              <Badge
                size={'md'}
                variant={'surface'}
                className="ml-2 bg-background-secondary"
              >
                #{skillDetails?.place}
              </Badge>
            </div> */}
        </div>
      )}
    </>
  );
}

export function SkillPage() {
  const { name } = useParams<{ name: string }>();
  const decodedName = name ? decodeURIComponent(name) : null;
  const { skillDetailsShort: skillShort } = useSkillDetailsShort(
    decodedName ?? null
  );
  const { skillDetails } = useSkillDetails(decodedName ?? null);

  return (
    <div className="app-container">
      <div className="rounded bg-background-primary py-2">
        <Header skillShort={skillShort} />

        <div className="my-2">
          <Filter />
        </div>

        <div className="flex gap-2">
          <div className="w-[65%]">
            {skillDetails?.name && (
              <DemandTrend
                name={skillDetails.name}
                mentions={skillDetails.count}
                prevMentions={skillDetails.prev_count}
              />
            )}
          </div>
          <div className="w-[35%]">
            {skillDetails?.name && (
              <SalaryDistribution
                name={skillDetails.name}
                medianSalary={skillDetails.average_salary}
                prevMedianSalary={skillDetails.prev_average_salary}
              />
            )}
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <div className="w-[75%]">
            <Complexity skill={skillDetails} />
          </div>
          <div className="w-[25%]">
            {skillDetails?.name && (
              <div className="flex w-[100%] flex-col gap-2">
                <PredictionsCard
                  translationKey="domains"
                  categories={skillDetails?.domains ?? []}
                />
                <PredictionsCard
                  translationKey="categories"
                  categories={skillDetails?.categories ?? []}
                />
              </div>
            )}
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

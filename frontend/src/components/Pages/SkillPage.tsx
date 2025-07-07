import { Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useSkillDetails } from '@/hooks/data/useSkillDetails';

import { Filter } from '../Filter/Filter';
import { SkillImage } from '../ui/SkillImage';
import { Complexity } from './Complexity';
import { DemandTrend } from './DemandTrend';
import { PredictionsCard } from './PredictionsCard';
import { SalaryDistribution } from './SalaryDistribution';

export function SkillPage() {
  const { name } = useParams<{ name: string }>();
  const { skillDetails: skill } = useSkillDetails(name);

  return (
    <div className="app-container">
      <div className="rounded bg-background-primary py-2">
        {skill?.name && (
          <div className="flex items-center justify-between rounded border-[0px] border-background-secondary p-2 py-4 shadow-background-secondary">
            <div className="flex">
              <div className="h-10 w-10">
                <SkillImage
                  domain={skill.domains[0]?.name}
                  path={skill?.image}
                />
              </div>
              <div className="mx-3">
                <div className="text-xl font-bold">{skill?.name}</div>
                <div className="flex items-center text-xs text-text-secondary">
                  <div className="">{skill.domains[0]?.name}</div>
                  <div className="mx-1">•</div>
                  <div className="">{skill.categories[0]?.name}</div>
                </div>
              </div>
            </div>

            <div className="text-base">
              Rank
              <Badge
                size={'md'}
                variant={'surface'}
                className="ml-2 bg-background-secondary"
              >
                #{skill?.place}
              </Badge>
            </div>
          </div>
        )}

        <div className="my-2">
          <Filter />
        </div>

        <div className="flex gap-2">
          <div className="w-[65%]">
            {skill?.name && (
              <DemandTrend
                name={skill.name}
                mentions={skill.count}
                prevMentions={skill.prev_count}
              />
            )}
          </div>
          <div className="w-[35%]">
            {skill?.name && (
              <SalaryDistribution
                name={skill.name}
                medianSalary={skill.average_salary}
                prevMedianSalary={skill.prev_average_salary}
              />
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-[75%]">
            <Complexity />
          </div>
          <div className="w-[25%]">
            {skill?.name && (
              <div className="w-[100%]">
                <PredictionsCard
                  translationKey="domains"
                  categories={skill?.domains ?? []}
                />
                <PredictionsCard
                  translationKey="categories"
                  categories={skill?.categories ?? []}
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

import { Badge, Separator } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { Experience, ExperienceColor } from '@/config/experience';
import { Level, LevelColor } from '@/config/level';
import { Overlay } from '@/components/ui/Overlay';

interface ComplexityData {
  complexity_score?: number;
  experience_counts?: Record<string, number>;
}

interface ComplexityProps {
  data?: ComplexityData;
  isDataReady: boolean;
}

export function Complexity({ data, isDataReady }: ComplexityProps) {
  const { t } = useTranslation();
  const complexity = data?.complexity_score ?? 0;

  const experienceSum = Object.values(data?.experience_counts ?? {}).reduce(
    (acc, curr) => acc + curr,
    0
  );

  function getLevel(): Level {
    if (complexity <= 0.33) {
      return Level.Junior;
    }
    if (complexity <= 0.66) {
      return Level.Middle;
    }
    return Level.Senior;
  }

  const currentLevel = getLevel();

  return (
    <div className="relative">
      <Overlay isLoading={!data} isFetching={!isDataReady} />

      <div className="resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
        <div className="text-base font-[500]">{t('complexity.title')}</div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-3xl font-bold">
              {/* <div className='w-4 aspect-square rounded' style={{backgroundColor: LevelColor[currentLevel] }}></div> */}
              {experienceSum ? currentLevel : '-'}
            </div>
          </div>
          <div className="flex items-center gap-1 font-[500]">
            {/* <div className='w-4 h-4 aspect-square rounded' style={{backgroundColor: LevelColor[currentLevel] }}></div> */}
            <div className="text-xl font-bold">
              {(complexity * 10).toFixed(2)}{' '}
              <span className="text-lg text-text-secondary/50">/ 10</span>
            </div>
          </div>
        </div>

        <div className="mb-2 text-xs text-text-secondary">
          {experienceSum
            ? t(`complexity.subtitle.${currentLevel}`)
            : t('charts.notEnoughData')}
        </div>

        {/* <div className="relative w-full p-2 border-background-secondary      shadow shadow-background-secondary border-[1px]">
        <div className='relative flex w-full'>
          <div className="h-full w-full">
            <div className="py-1 text-xs text-text-secondary">{Level.Junior}</div>
            <div
              className="flex h-2 items-center justify-center rounded-l-sm border-[2px] border-background-secondary"
              style={{ backgroundColor: LevelColor[Level.Junior] }}
            ></div>

          </div>
          <div className="h-full w-full">
            <div className="py-1 text-xs text-text-secondary">{Level.Middle}</div>
            <div
              className="flex h-2 items-center justify-center border-[2px] border-background-secondary"
              style={{ backgroundColor: LevelColor[Level.Middle] }}
            ></div>
          </div>
          <div className="h-full w-full">
            <div className="py-1 text-xs text-text-secondary">{Level.Senior}</div>
            <div
              className="flex h-2 items-center justify-center rounded-r-sm border-[2px] border-background-secondary"
              style={{ backgroundColor: LevelColor[Level.Senior] }}
            ></div>
          </div>
                <div
                className="absolute top-[20px] flex h-4 w-4 items-center justify-center rounded-full bg-background-primary transition-all duration-1000 ease-in-out"
                style={{
                  left: `calc(${Math.min(98, complexity * 100)}%)`,
                }}
              >
                <div className="size-1/2 rounded-full" style={{backgroundColor: LevelColor[currentLevel] }}>
                </div>
              </div>
        </div>
        <div className='flex justify-between text-text-secondary mt-2 text-xs'>
          <div>0%</div>
          <div>100%</div>
        </div>



      </div> */}

        {/* <div className="mt-5 text-base">
      <div className="text-base text-text-primary">
      {t('complexity.description')}
      </div>
      </div> */}

        {/* <Separator variant="solid" className='mt-4'  size="md"/> */}

        <div className="mt-1">
          <div className="my-1 text-base">{t('complexity.distribution')}</div>
          <div className="flex h-5 w-full gap-1">
            {Object.keys(Experience)
              .filter(exp => exp !== Experience.any)
              .map(experience => {
                return (
                  <div
                    className={`h-full rounded transition-all duration-1000 ease-in-out`}
                    style={{
                      width: `${(data?.experience_counts?.[experience] || 1) * 100}%`,
                      backgroundColor:
                        ExperienceColor[experience as Experience],
                    }}
                    key={experience}
                  ></div>
                );
              })}
          </div>

          <div className="mt-2">
            {Object.keys(Experience)
              .filter(exp => exp !== Experience.any)
              .map(experience => {
                return (
                  <div
                    className="my-3 flex h-5 items-center justify-between"
                    key={experience}
                  >
                    <div className="flex h-full items-center gap-1">
                      <div
                        className="h-3 w-3 rounded"
                        style={{
                          backgroundColor: `${ExperienceColor[experience as Experience]}`,
                        }}
                      ></div>
                      <div className="text-sm text-text-secondary">
                        {t(`experience.${experience}`)} -{' '}
                        {data?.experience_counts?.[experience] ?? 0}
                      </div>
                    </div>
                    <div className="text-sm text-text-primary">
                      {(
                        ((data?.experience_counts?.[experience] ?? 0) /
                          (experienceSum || 1)) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

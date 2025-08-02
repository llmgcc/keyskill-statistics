import { Separator } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Experience, ExperienceColor } from '@/config/experience';
import { Level, LevelRange } from '@/config/level';
import { Overlay } from '@/components/ui/Overlay';
import { InfoTip } from '@/components/ui/toggle-tip';

interface ComplexityData {
  complexity_score?: number;
  experience_counts?: Record<string, number>;
}

interface ComplexityProps {
  data: ComplexityData | null;
  isDataReady: boolean;
}

function ComplexityTooltip() {
  const { t } = useTranslation();

  return (
    <InfoTip
      content={
        <div className="min-w-34 flex max-w-96 flex-col gap-1 overflow-auto text-xs text-text-primary">
          <div className="mb-1 text-sm">
            {t('charts.tooltips.complexity.title')}
          </div>
          <Separator />

          <div>
            {Object.keys(LevelRange).map(level => (
              <div className="my-1 flex justify-between" key={level}>
                <div>{level}</div>
                <div className="flex gap-1">
                  <div>{LevelRange[level as Level].min}</div>-
                  <div>{LevelRange[level as Level].max}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    ></InfoTip>
  );
}

export function Complexity({ data, isDataReady }: ComplexityProps) {
  const { t } = useTranslation();
  const complexity = data?.complexity_score ?? 0;

  const experienceSum = Object.values(data?.experience_counts ?? {}).reduce(
    (acc, curr) => acc + curr,
    0
  );

  function getLevel(): Level {
    const c = complexity * 10;
    for (const level of Object.keys(Level)) {
      if (
        LevelRange[level as Level].min <= c &&
        LevelRange[level as Level].max >= c
      ) {
        return level as Level;
      }
    }
    return Level.Junior;
  }

  const currentLevel = getLevel();

  return (
    <Overlay isLoading={!data} isFetching={!isDataReady}>
      <div className="resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
        <div className="flex items-center text-base font-[500]">
          <div className="text-base font-[500]">{t('complexity.title')}</div>
          <div>
            <ComplexityTooltip />
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-3xl font-bold">
              {experienceSum ? currentLevel : '-'}
            </div>
          </div>
          <div className="flex items-center gap-1 font-[500]">
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
                      width: `${((data?.experience_counts?.[experience] || 0) / (experienceSum || 1)) * 100}%`,
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
    </Overlay>
  );
}

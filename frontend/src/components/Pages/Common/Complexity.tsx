import { useTranslation } from 'react-i18next';

import { Experience, ExperienceColor } from '@/config/experience';
import { Level } from '@/config/level';
import { Overlay } from '@/components/ui/Overlay';

interface ComplexityData {
  complexity_score?: number;
  experience_counts?: Record<string, number>;
}

interface ComplexityProps {
  data: ComplexityData | null;
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
    const c = complexity * 10;

    if (c < 2) {
      return Level.Junior;
    }
    if (c < 5) {
      return Level['Junior+'];
    }
    if (c < 6) {
      return Level.Middle;
    }
    if (complexity < 7.5) {
      return Level['Middle+'];
    }
    if (complexity < 9) {
      return Level.Senior;
    }
    return Level['Senior+'];
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

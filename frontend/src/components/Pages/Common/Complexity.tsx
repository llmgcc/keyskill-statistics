import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { Experience, ExperienceColor } from '@/config/experience';
import { Level, LevelColor } from '@/config/level';

interface ComplexityProps {
  skill?: KeySkill;
}

export function Complexity({ skill }: ComplexityProps) {
  const { t } = useTranslation();
  const complexity = skill?.complexity_score ?? 0;

  const experienceSum = Object.values(skill?.experience_counts ?? {}).reduce(
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
    <div className="resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">{t('complexity.title')}</div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">{currentLevel}</div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold">
            {(complexity * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="mb-2 text-xs text-text-secondary">
        {t(`complexity.subtitle.${currentLevel}`)}
      </div>

      <div className="gap relative flex w-full">
        <div className="h-full w-full">
          <div className="py-1 text-xs text-text-secondary">{Level.Junior}</div>
          <div
            className="flex h-2 items-center justify-center rounded-l"
            style={{ backgroundColor: LevelColor[Level.Junior] }}
          ></div>
        </div>
        <div className="h-full w-full">
          <div className="py-1 text-xs text-text-secondary">{Level.Middle}</div>
          <div
            className="flex h-2 items-center justify-center"
            style={{ backgroundColor: LevelColor[Level.Middle] }}
          ></div>
        </div>
        <div className="h-full w-full">
          <div className="py-1 text-xs text-text-secondary">{Level.Senior}</div>
          <div
            className="flex h-2 items-center justify-center rounded-r"
            style={{ backgroundColor: LevelColor[Level.Senior] }}
          ></div>
        </div>

        <div
          className="absolute top-[20px] flex h-4 w-4 items-center justify-center rounded-full bg-background-primary transition-all duration-1000 ease-in-out"
          style={{
            left: `calc(${Math.min(98, complexity * 100)}%)`,
          }}
        >
          <div className="size-1/2 rounded-full bg-text-primary"></div>
        </div>
      </div>

      {/* <div className="mt-5 text-base"> */}
      {/* <div className="text-base text-text-primary"> */}
      {/* {t('complexity.description')} */}
      {/* </div> */}
      {/* </div> */}

      <div className="mt-3">
        <div className="my-1 text-base">{t('complexity.distribution')}</div>
        <div className="flex h-5 w-full gap-1">
          {Object.keys(Experience)
            .filter(exp => exp !== Experience.any)
            .map(experience => {
              return (
                <div
                  className={`h-full rounded transition-all duration-1000 ease-in-out`}
                  style={{
                    width: `${(skill?.experience_counts?.[experience] ?? 0) * 100}%`,
                    backgroundColor: ExperienceColor[experience as Experience],
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
                      {skill?.experience_counts?.[experience] ?? 0}
                    </div>
                  </div>
                  <div className="text-sm text-text-primary">
                    {(
                      ((skill?.experience_counts?.[experience] ?? 0) /
                        experienceSum) *
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
  );
}

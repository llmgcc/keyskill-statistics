import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { SkillImage } from '@/components/ui/SkillImage';

interface PredictionsCardProps {
  categories: Category[];
  translationKey: string;
}

export function PredictionsCard({
  categories,
  translationKey,
}: PredictionsCardProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">
        {t(`common.${translationKey}`)}
      </div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">
          {t(`${translationKey}.${categories[0].name}`)}
        </div>
      </div>

      <div className="text-xs text-text-secondary">
        {t(`common.${translationKey}Primary`)}
      </div>

      <div className="w-full">
        {
          <div>
            {categories.map(d => (
              <div
                key={d.name}
                className="group relative my-1 w-full cursor-pointer rounded p-2"
              >
                <div className="flex items-center gap-2">
                  <div className="aspect-square h-7 w-7">
                    <SkillImage {...{ ['domain']: d.name }} />
                  </div>
                  <div className="w-full">
                    <div className="flex w-full items-center justify-between text-sm">
                      <div>{t(`${translationKey}.${d.name}`)}</div>
                      <div>{(d?.confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div className="relative h-2 w-full rounded-sm bg-background-secondary">
                      <div
                        className="absolute left-0 top-0 z-0 h-full rounded-sm bg-background-gray ease-in-out hover:bg-background-accent group-hover:bg-background-accent/70"
                        style={{
                          width: `${(d?.confidence ?? 0) * 100}%`,
                          transition: 'width 1000ms ease-in-out',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

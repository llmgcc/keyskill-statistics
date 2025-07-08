import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';

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
    <div className="mt-2 rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
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

      <div className="mt-3 w-full">
        {
          <div>
            {categories.map(d => (
              <div
                key={d.name}
                className="group relative my-2 h-8 w-full cursor-pointer rounded bg-background-secondary p-2"
              >
                <div
                  className="absolute left-0 top-0 z-0 h-full rounded bg-background-gray hover:bg-background-accent group-hover:bg-background-accent/70"
                  style={{ width: `${d?.confidence * 100}%` }}
                ></div>
                <div className="relative z-10 flex h-full w-full items-center justify-between text-sm">
                  <div>
                    <div className="mx-2 flex h-full items-center">
                      {t(`${translationKey}.${d.name}`)}
                    </div>
                  </div>
                  <div className="flex h-full items-center">
                    {(d?.confidence * 100).toFixed(1)}%
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

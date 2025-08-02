import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { Overlay } from '@/components/ui/Overlay';
import { SkillImage } from '@/components/ui/SkillImage';
import { InfoTip } from '@/components/ui/toggle-tip';

interface PredictionsCardProps {
  categories: Category[];
  type: 'domains' | 'categories';
  isDataReady: boolean;
  tooltip: JSX.Element;
}

interface PredictionTooltipProps {
  name: string | null;
  translationKey: string;
}

export function PredictionTooltip({
  name,
  translationKey,
}: PredictionTooltipProps) {
  const { i18n } = useTranslation();
  if (!name) {
    return null;
  }

  return (
    <InfoTip
      content={
        <div className="flex min-w-56 max-w-96 flex-col gap-1 overflow-auto text-xs text-text-primary">
          <div className="mb-1 text-sm">
            <Trans
              i18nKey={translationKey}
              components={{ b: <b /> }}
              values={{
                name,
              }}
              tOptions={{ lng: i18n.language }}
            />
          </div>
        </div>
      }
    ></InfoTip>
  );
}

export function PredictionsCard({
  categories,
  type,
  isDataReady,
  tooltip,
}: PredictionsCardProps) {
  const { t } = useTranslation();

  const [showAll, setShowAll] = useState(false);

  function getCategories(): Category[] {
    if (!categories?.length) {
      return new Array(10).fill(null).map((_, i) => ({
        name: i.toString(),
        confidence: 0.5,
        count: 1,
        place: 1,
      }));
    }
    const displayCount = showAll ? categories.length : 5;
    return categories.slice(0, displayCount);
  }

  const hasMore = categories.length > 5;

  return (
    <Overlay isLoading={!categories.length} isFetching={!isDataReady}>
      <div className="rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
        <div className="flex items-center text-base font-[500]">
          <div className="text-base font-[500]">{t(`common.${type}`)}</div>
          <div>{tooltip}</div>
        </div>

        <div className="mt-2 w-full">
          {
            <div>
              {getCategories().map(d => (
                <div
                  key={d.name}
                  className="group relative w-full cursor-pointer rounded p-1"
                >
                  <div className="flex w-full items-center gap-2">
                    <div className="aspect-square h-8 w-8">
                      {<SkillImage {...{ [type]: d.name }} />}
                    </div>
                    <div className="w-full">
                      <div className="relative flex w-full items-center justify-between overflow-hidden text-sm">
                        <div
                          className="absolute left-0 top-0 z-0 h-full rounded-sm bg-background-secondary ease-in-out hover:bg-background-accent group-hover:bg-background-accent/70"
                          style={{
                            width: `${(d?.confidence ?? 0) * 100}%`,
                            transition: 'width 1000ms ease-in-out',
                          }}
                        ></div>

                        <div className="z-[0] flex w-full justify-between px-2 py-1">
                          <div>{t(`${type}.${d.name}`)}</div>
                          <div>{(d?.confidence * 100).toFixed(1)}%</div>
                        </div>
                        {/* <div className="z-[0] flex h-8 w-full items-center justify-between px-1 bg-white">
                          <div className="flex-1 overflow-hidden truncate bg-red-400 overflow-hidden max-w-[50%]">
                              {t(`${type}.${d.name}`)}
                          </div>
                          <div className="bg-yellow-400">
                            {(d?.confidence * 100).toFixed(1)}%
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
          {hasMore && (
            <div className="mt-2 flex items-center justify-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant={'ghost'}
                size={'xs'}
                className="text-sm text-text-secondary hover:bg-background-secondary"
              >
                {showAll ? t('common.showLess') : t('common.showMore')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Overlay>
  );
}

import { Trans, useTranslation } from 'react-i18next';

import { useFilters } from '@/hooks/useFilters';
import { InfoTip } from '@/components/ui/toggle-tip';
import { ValueChangeRenderer } from '@/components/Table/renderers/ValueChangeRenderer';

interface ChartsTooltipProps {
  name: string | null;
  translationKey: string;
  count?: number;
  prevCount?: number;
  unit: string;
}

export function ChartsTooltip({
  name,
  translationKey,
  count,
  prevCount,
  unit,
}: ChartsTooltipProps) {
  const { t } = useTranslation();
  const { period } = useFilters();
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
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-32 capitalize">
              <div>
                {t(`common.last`)} <b>{period}</b> {t(`common.days`)}
              </div>
            </div>
            <div className="">
              <div className="text-text-secondary">
                {count} {unit}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-32 capitalize">
              <div>
                {t(`common.previous`)} <b>{period}</b> {t(`common.days`)}
              </div>
            </div>
            <div className="">
              <div className="text-text-secondary">
                {prevCount} {unit}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-32 capitalize">
              <div>{t(`common.change`)}</div>
            </div>
            <div>
              <ValueChangeRenderer
                current={count ?? 0}
                prev={prevCount}
                percent={true}
              />
            </div>
          </div>
        </div>
      }
    ></InfoTip>
  );
}

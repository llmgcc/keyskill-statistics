import { Trans, useTranslation } from 'react-i18next';

import { InfoTip } from '../ui/toggle-tip';

export function ComplexityTooltip() {
  return (
    <InfoTip
      content={
        <div className="flex max-w-56 flex-col gap-1 overflow-auto text-xs text-text-primary">
          <Trans i18nKey="complexity.info" />
        </div>
      }
    ></InfoTip>
  );
}

export function SimilarityTooltip() {
  return (
    <InfoTip
      content={
        <div className="flex max-w-56 flex-col gap-1 overflow-auto text-xs text-text-primary">
          <Trans i18nKey="tooltips.similarity" />
        </div>
      }
    ></InfoTip>
  );
}

export function SalaryTooltip() {
  return (
    <InfoTip
      content={
        <div className="flex max-w-56 flex-col gap-1 overflow-auto text-xs text-text-primary">
          <Trans i18nKey="tooltips.salary" />
        </div>
      }
    ></InfoTip>
  );
}

interface ConfidenceTooltipProps {
  categoryKey: 'domains' | 'categories';
  name: string;
}

export function ConfidenceTooltip({
  categoryKey,
  name,
}: ConfidenceTooltipProps) {
  const { t } = useTranslation();
  return (
    <InfoTip
      content={
        <div className="flex max-w-56 flex-col gap-1 overflow-auto text-xs text-text-primary">
          <div>
            <Trans
              i18nKey={`tooltips.${categoryKey}Confidence`}
              components={{ text: <strong /> }}
              values={{
                name: t(`${categoryKey}.${name}`),
              }}
            />
          </div>
        </div>
      }
    ></InfoTip>
  );
}

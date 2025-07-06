import { useTranslation } from 'react-i18next';

import { ChartTooltip } from '../common';

export function MentionsTooltip({ active, payload }: ChartTooltip) {
  const { i18n, t } = useTranslation();

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const date = new Date(data.from).toLocaleDateString(i18n.language, {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    return (
      <div className="rounded border-[1px] border-background-secondary bg-background-primary p-2 shadow-md shadow-background-secondary">
        <div className="text-sm">{date}</div>
        <div className="text-xs text-text-secondary">
          <span className="font-[600]">{payload[0].payload.count}</span>{' '}
          {t('columns.mentions').toLowerCase()}
        </div>
      </div>
    );
  }
  return null;
}

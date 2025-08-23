import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ChartTooltip } from '../common';

interface DateTimeProps {
  datetime: number;
  language: string;
}

function DateTime({ datetime, language }: DateTimeProps) {
  const date = new Date(datetime).toLocaleDateString(language, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  const time = new Date(datetime).toLocaleTimeString(language, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center justify-center gap-1">
      <div className="text-sm">{date}</div>
      <div className="text-xs text-text-secondary">{time}</div>
    </div>
  );
}

function MentionsTooltip_({ active, payload }: ChartTooltip) {
  const { i18n, t } = useTranslation();

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded border-[1px] border-background-secondary bg-background-primary p-2 shadow-md shadow-background-secondary">
        <div className="flex items-center gap-1">
          <DateTime datetime={data.from} language={i18n.language} />
          <div>-</div>
          <DateTime datetime={data.to} language={i18n.language} />
        </div>
        <div className="text-xs text-text-secondary">
          <span className="font-[600]">{payload[0].payload.count}</span>{' '}
          {t('columns.mentions').toLowerCase()}
        </div>
      </div>
    );
  }
  return null;
}

export const MentionsTooltip = memo(MentionsTooltip_);

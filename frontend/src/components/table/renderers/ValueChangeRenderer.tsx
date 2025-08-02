import { getPercentDifference } from '@/utils/common';

interface ValueChangeRendererProps {
  current: number;
  prev?: number;
  percent?: boolean;
}

export function ValueChangeRenderer({
  current,
  prev,
  percent = false,
}: ValueChangeRendererProps) {
  let colorClass = '';
  let difference: number | null = null;
  const isValid = prev && !isNaN(prev) && !isNaN(current);
  if (isValid) {
    difference = percent ? getPercentDifference(current, prev) : current - prev;
    if (difference < 0) {
      colorClass = 'text-rose-500';
    } else {
      colorClass = 'text-emerald-500';
    }
  }

  return (
    <div>
      <div className={colorClass}>
        {isValid ? (
          <div>
            {percent
              ? `${!!difference && difference >= 0 ? '+' : ''}${getPercentDifference(current, prev).toFixed(1)}%`
              : `${!!difference && difference >= 0 ? '+' : ''}${difference}`}
          </div>
        ) : (
          <div className="text-zinc-400">-</div>
        )}
      </div>
    </div>
  );
}

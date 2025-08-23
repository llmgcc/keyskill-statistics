import { getPercentDifference } from '@/utils/common';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

interface ValueChangeRendererProps {
  current: number;
  prev?: number;
  percent?: boolean;
  inverse?: boolean;
}

export function ValueChangeRenderer({
  current,
  prev,
  percent = false,
  inverse = false,
}: ValueChangeRendererProps) {
  let colorClass = '';
  let difference: number | null = null;
  const isValid = prev && !isNaN(prev) && !isNaN(current);
  if (isValid) {
    difference = percent ? getPercentDifference(current, prev) : current - prev;
    if ((difference < 0 && !inverse) || (difference > 0 && inverse)) {
      colorClass = 'text-rose-500';
    } else {
      colorClass = 'text-emerald-500';
    }
  }

  const baseSize = 1;
  const sign =
    Number(difference) * (inverse ? -1 : 1) > 0 ? (
      <FaCaretUp size={`${baseSize}em`} />
    ) : (
      <FaCaretDown size={`${baseSize}em`} />
    );

  return (
    <div>
      <div className={colorClass}>
        {isValid && difference ? (
          <div>
            <div className="flex items-center">
              <div>{sign}</div>
              <div>
                {percent
                  ? `${Math.abs(getPercentDifference(current, prev)).toFixed(1)}%`
                  : `${Math.abs(difference)}`}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-zinc-400">{percent ? '0.0%' : '0'}</div>
        )}
      </div>
    </div>
  );
}

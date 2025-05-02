import { getPercentDifference } from "@/utils/common";

interface ValueChangeRendererProps {
  current: number;
  prev?: number;
  percent?: boolean
}

export function ValueChangeRenderer({
  current,
  prev,
  percent = false
}: ValueChangeRendererProps) {
  let colorClass = '';
  let difference : number | null = null
  if (prev && current) {
    difference = percent ? getPercentDifference(current, prev) : current - prev;
    if (difference < 0) {
      colorClass = 'text-red-400';
    } else {
      colorClass = 'text-green-400';
    }
  }

  return (
    <div>
      <div className={colorClass}>
        {prev && current !== null ? (
          <div>{percent ? `${getPercentDifference(current, prev).toFixed(2)}%` : difference}</div>
        ) : (
          <div className="text-text-secondary">-</div>
        )}
      </div>
    </div>
  );
}

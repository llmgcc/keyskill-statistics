interface ValueChangeRendererProps {
  current: number;
  prev?: number;
}

export function ValueChangeRenderer({
  current,
  prev,
}: ValueChangeRendererProps) {
  let colorClass = 'text-yellow-400';
  if (prev && current) {
    const difference = current - prev;
    if (difference < 0) {
      colorClass = 'text-red-400';
    } else {
      colorClass = 'text-green-400';
    }
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <div className={colorClass}>
        {prev && current ? <div>{current - prev}</div> : <div>NEW</div>}
      </div>
    </div>
  );
}

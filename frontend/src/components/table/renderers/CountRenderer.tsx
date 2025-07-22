import { ValueChangeRenderer } from './ValueChangeRenderer';

interface CountRendererProps {
  count: number;
  prevCount?: number;
}

export function CountRenderer({ count, prevCount }: CountRendererProps) {
  return (
    <div className="relative size-full">
      <div className="font-[500]">{count}</div>
      <div className="text-xs">
        <ValueChangeRenderer current={count} prev={prevCount} percent={true} />
      </div>
    </div>
  );
}

import { memo, useLayoutEffect, useRef, useState } from 'react';

import { SvgHist } from './SvgHist';

interface HistProps {
  data: number[];
  color: string;
}

function _Hist({ data, color }: HistProps) {
  const svgWrapper = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (!svgWrapper.current) return;
    setSize({
      width: svgWrapper.current.clientWidth,
      height: svgWrapper.current.clientHeight,
    });
    const resizeObserver = new ResizeObserver(() => {
      if (svgWrapper.current) {
        setSize({
          width: svgWrapper.current.clientWidth,
          height: svgWrapper.current.clientHeight,
        });
      }
    });
    resizeObserver.observe(svgWrapper.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="h-full w-full" ref={svgWrapper}>
      {!!size.width && !!size.height && (
        <SvgHist
          data={data}
          width={size.width}
          height={size.height}
          color={color}
          strokeWidth={2}
        />
      )}
    </div>
  );
}

export const Hist = memo(_Hist);

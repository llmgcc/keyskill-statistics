import { useEffect, useRef } from 'react';
import { useStickyHeights } from '@/store/stickyHeightsStore';

export const useStickyOffset = (id: string) => {
  const ref = useRef<HTMLDivElement | HTMLTableSectionElement>(null);
  const { setHeight, getOffset } = useStickyHeights();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setHeight(id, height);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, setHeight]);

  const offset = getOffset(id);

  return { ref, offset };
};
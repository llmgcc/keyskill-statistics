import { useEffect, useState } from 'react';

export const useTopOffset = (selector: string) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const element = document.querySelector(selector);
      setOffset(element?.getBoundingClientRect().height || 0);
    };

    const resizeObserver = new ResizeObserver(updateOffset);

    const element = document.querySelector(selector);
    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
      resizeObserver.disconnect();
    };
  }, [selector]);

  return offset;
};

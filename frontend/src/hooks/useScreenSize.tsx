import { useEffect, useState } from 'react';

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function getScreenSize() {
  return {
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  };
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => getScreenSize());

  useEffect(() => {
    function handleResize() {
      const newSize = getScreenSize();
      setScreenSize(prev => {
        if (
          prev.isMobile === newSize.isMobile &&
          prev.isTablet === newSize.isTablet &&
          prev.isDesktop === newSize.isDesktop
        ) {
          return prev;
        }
        return newSize;
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
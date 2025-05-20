import { useEffect, useState } from 'react';

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize((prev) => {
        const newIsMobile = window.innerWidth < 768;
        const newIsTablet =
          window.innerWidth >= 768 && window.innerWidth < 1024;
        const newIsDesktop = window.innerWidth >= 1024;
        if (
          newIsMobile !== prev.isMobile ||
          newIsTablet !== prev.isTablet ||
          newIsDesktop !== prev.isDesktop
        ) {
          return {
            isMobile: newIsMobile,
            isTablet: newIsTablet,
            isDesktop: newIsDesktop,
          };
        }
        return prev;
      });
    };
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenSize;
};

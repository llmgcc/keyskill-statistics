import { useEffect, useState } from 'react';
import { Button } from '@radix-ui/themes';
import { RiArrowUpSLine } from 'react-icons/ri';

interface ScrollToTopButtonProps {
  element: React.RefObject<HTMLDivElement>;
  onClick: () => void;
}

export function ScrollToTopButton({
  element,
  onClick,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (element?.current) {
        const elementRect = element.current.getBoundingClientRect();
        setIsVisible(elementRect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [element]);

  return isVisible ? (
    <Button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-background-accent p-4 text-white shadow-md shadow-background-secondary"
      aria-label="Scroll to top"
    >
      <div className="flex items-center justify-center">
        <RiArrowUpSLine size={20} className="flex items-center" />
      </div>
    </Button>
  ) : null;
}

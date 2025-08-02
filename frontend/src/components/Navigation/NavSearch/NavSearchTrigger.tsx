import { useEffect } from 'react';
import { Button, Kbd } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';

import { useScreenSize } from '@/hooks/useScreenSize';

interface NavSearchTriggerProps {
  onOpen: () => void;
}

export function NavSearchTrigger({ onOpen }: NavSearchTriggerProps) {
  const { isMobile } = useScreenSize();
  const { t } = useTranslation();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === '/') {
      event.preventDefault();
      onOpen();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return isMobile ? (
    <Button
      onClick={onOpen}
      variant="ghost"
      className="flex aspect-square size-fit items-center !bg-transparent !p-0"
      size={isMobile ? 'xs' : 'md'}
    >
      <IoSearch className="cursor-pointer !text-2xl font-[900] text-text transition-colors duration-150 hover:text-background-accent" />
    </Button>
  ) : (
    <Button
      onClick={onOpen}
      className="flex size-full h-8 w-fit cursor-pointer items-center justify-between rounded bg-background-secondary px-2 py-1 text-sm text-text-secondary hover:bg-background-gray md:w-56"
    >
      <div className="flex">
        <div className="mr-2">
          <IoSearch />
        </div>
        <div>{t('common.search')}</div>
      </div>
      <div className="flex aspect-square w-5 items-center justify-center rounded bg-background-primary text-xs text-text">
        <Kbd>/</Kbd>
      </div>
    </Button>
  );
}

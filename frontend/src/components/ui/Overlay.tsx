import { Box, Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface OverlayProps {
  isLoading: boolean;
  isFetching: boolean;
}

export function Overlay({ isLoading, isFetching }: OverlayProps) {
  const { t } = useTranslation();

  if (!(isLoading || isFetching)) {
    return null;
  }

  return (
    <Box
      position="absolute"
      inset="0"
      bg="rgba(var(--color-background-primary))"
      opacity={isLoading ? 1 : isFetching ? 0.75 : 0}
      zIndex={1000}
      aria-busy="true"
      userSelect="none"
      backdropBlur="blur(0.5px)"
      animation={isLoading ? '' : isFetching ? 'pulse 1.5s infinite' : ''}
      className="border-[1px] border-background-secondary"
    >
      <div className="flex size-full flex-col items-center justify-center">
        <Spinner
          size={'lg'}
          className="text-background-secondary"
          borderWidth="3px"
        ></Spinner>
        <div className="mt-2 text-sm">{t('common.loading')}...</div>
      </div>
    </Box>
  );
}

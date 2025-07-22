import { ReactNode } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

interface OverlayProps {
  isLoading: boolean;
  isFetching: boolean;
  children?: ReactNode;
}

export function Overlay({ children, isLoading, isFetching }: OverlayProps) {
  return (
    <div className="relative">
      {(isLoading || isFetching) && (
        <Box
          position="absolute"
          inset="0"
          bg="rgba(var(--color-background-primary))"
          opacity={isLoading ? 1 : isFetching ? 0.75 : 0}
          zIndex={500}
          aria-busy="true"
          userSelect="none"
          backdropBlur="blur(0.5px)"
          animation={isLoading ? '' : isFetching ? 'pulse 1.5s infinite' : ''}
          className="border-[1px] border-background-secondary"
        >
          <div className="flex size-full flex-col items-center justify-center">
            <Spinner
              size={'lg'}
              className="text-background-accent"
              borderWidth="4px"
            ></Spinner>
          </div>
        </Box>
      )}

      {children ?? <></>}
    </div>
  );
}

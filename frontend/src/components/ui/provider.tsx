'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const system = createSystem(defaultConfig, {
  cssVarsPrefix: 'ck',
  // disableLayers: true,
});

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}

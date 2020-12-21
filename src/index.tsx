import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { unstable_createRoot } from 'react-dom';
import { App } from './App';

const chakraTheme = extendTheme({ config: { useSystemColorMode: true } })

const rootElement = document.getElementById('root');

unstable_createRoot(rootElement!).render(
  <ChakraProvider theme={chakraTheme}>
    <App />
  </ChakraProvider>
);

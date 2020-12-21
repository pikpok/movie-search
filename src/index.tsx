import { ChakraProvider } from '@chakra-ui/react';
import { unstable_createRoot } from 'react-dom';
import { App } from './App';

const rootElement = document.getElementById('root');

unstable_createRoot(rootElement!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';
import { defaultSystem } from '@chakra-ui/react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
    <App />
    </ChakraProvider>
  </React.StrictMode>
);
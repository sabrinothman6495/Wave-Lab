import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultSystem } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client';
import App from './App';
import { ThemeProvider } from './components/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider value={defaultSystem}>
          <ThemeProvider>
            <App />
        </ThemeProvider>
    </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
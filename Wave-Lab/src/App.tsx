import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import Profile from './pages/profilePage';

// Create an HTTP link
const httpLink = createHttpLink({
  uri: '/graphql',  // Your GraphQL endpoint
});

// Add authentication to requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Profile />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    // gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { App } from '@app/app';

const httpLink = createHttpLink({
    uri: 'https://api.escuelajs.co/graphql',
});

const authLink = setContext((_, { headers }) => {
    const tokens = localStorage.getItem('AUTH_TOKENS');

    const newHeaders = {
        ...headers,
    };

    if (tokens) {
        newHeaders.authorization = `Bearer ${JSON.parse(tokens).access}`;
    }

    return {
        headers: newHeaders,
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </StrictMode>
);

import React from 'react'
import { render } from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from 'react-apollo'

import App from './App'

const cache = new InMemoryCache()

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000/graphql', }),
    cache
})

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)

render(ApolloApp(), document.getElementById('root'))
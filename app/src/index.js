import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

import store from './redux'
import App from './App'


const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>
)

render(ApolloApp, document.getElementById('root'))
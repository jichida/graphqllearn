import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from './config'


let apolloClient = null

const create = async (initialState, resolvers, typeDefs) => {
  const httpLink = new HttpLink({
      uri: config.httplink,
  })
    
  const wsLink = new WebSocketLink({
      uri: config.wslink,
      options: {
        reconnect: true,
      },
  })
    
  const terminatingLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
  )

  const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        const token = localStorage.getItem('token')
    
        if (token) {
          headers = { ...headers, authorization: token }
        }
    
        return { headers }
      })
    
      return forward(operation)
  })

  const signOut = client => {
      localStorage.removeItem('token')
      client.resetStore()
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log('GraphQL error', message)

        if (message === 'UNAUTHENTICATED') {
          signOut(client);
        }
      })
    }

    if (networkError) {
      console.log('Network error', networkError)

      if (networkError.statusCode === 401) {
        signOut(client)
      }
    }
  })

  const link = ApolloLink.from([authLink, errorLink, terminatingLink]) 

  const cache = new InMemoryCache()

  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    // typeDefs
  })

  cache.writeData({data: initialState})

  client.onResetStore(() => cache.writeData({data: initialState}))

  return client
}

export default (initialState = {}, resolvers = {}, typeDefs = {}) => {
    if (!apolloClient) {
        apolloClient = create(initialState, resolvers, typeDefs)
    }

    return apolloClient
}


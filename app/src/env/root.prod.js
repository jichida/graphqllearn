import React from 'react'
import lodashGet from 'lodash.get'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd-mobile'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { GetLocale } from '../components/controls/app'
import { useStatusBarHeight } from './hooks/hookstatusbarheight'
import AppRoot from '../components/approot.js'

// apollo client
import config from './config'
import { initState, resolvers, typeDefs } from './apollo'
import { ApolloClient } from 'apollo-client'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// antd 国际化
import enUS from 'antd-mobile/lib/locale-provider/en_US'
// import zhTW from 'antd-mobile/lib/locale-provider/en_US'

//react 国际化
import { IntlProvider } from 'react-intl'
import MessageProvider from '../locales/MessageProvider'

const languages = {
  'zh-cn': undefined,
  'zh-tw': undefined,
  'en': enUS
}

const ChildRoot = (props)=>{
  const { data: { locale } } = useQuery(GetLocale)

  return (
      <IntlProvider locale={locale} messages={MessageProvider(locale)}>
        <div>
            <Router>
              <LocaleProvider locale={languages[locale]}>
                <Route path="/" component={AppRoot}/>
              </LocaleProvider>
            </Router>
        </div>
      </IntlProvider>
  )
}

const Root = (props) => {
  const statusbarInfo = useStatusBarHeight()

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
      const { kind, operation } = getMainDefinition(query)
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      const token = localStorage.getItem('token')
  
      if (token) {
        headers = { ...headers, "x-token": token }
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
          signOut(client)
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
  
  cache.writeData({data: {...initState, statusbar: lodashGet(statusbarInfo, 'data.statusBarHeight', 22),}})
  client.onResetStore(() => cache.writeData({data: initState}))

  return (
    <ApolloProvider client={client}>
        <ChildRoot />
    </ApolloProvider>
  )
}

export default Root;

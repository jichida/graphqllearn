import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import Approot from './env/root';

// import config from './env/config';
// import {generatersapair} from './util/rsa';
// import VConsole from 'vconsole';
// import 'moment/locale/zh-cn';

// import {
//   registerandroid
// } from './env/android';
// // const vConsole = new VConsole();
// registerandroid();

// ----------------------- mock -----------------------
import lodashGet from 'lodash.get'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { useStatusBarHeight } from './env/hooks/hookstatusbarheight'

// apollo client
import config from './env/config'
import { initState, resolvers, typeDefs } from './env/apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ChildRoot } from './env/root'
import { SchemaLink } from 'apollo-link-schema';
import {
  makeExecutableSchema,
  introspectSchema,
} from 'graphql-tools';

import { printSchema } from 'graphql/utilities/schemaPrinter';
// ----------------------- mock -----------------------


const render = async (props) => {
  // const statusbarInfo = useStatusBarHeight()

  const httpLink = new HttpLink({
    uri: config.httplink,
  })

  // ----------------------- mock -----------------------
  const schema = await introspectSchema(httpLink)

  const executableSchema = makeExecutableSchema({
    typeDefs: printSchema(schema),
    // typeDefs: schema,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })
  const link = new SchemaLink({ schema: executableSchema })
  // ----------------------- mock -----------------------
  
  // const link = ApolloLink.from([authLink, errorLink, terminatingLink])  
  const cache = new InMemoryCache()     
  const client = new ApolloClient({
    link,
    cache,
    resolvers,
    // typeDefs
  })
  
  cache.writeData({data: {...initState}})
  client.onResetStore(() => cache.writeData({data: initState}))

  console.log(client)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <ChildRoot />
    </ApolloProvider>,
    document.getElementById('root'),
  )
}

render()

// --------------------mock end ------------------
// ReactDOM.render( < Approot / > ,
//     document.getElementById('root'));

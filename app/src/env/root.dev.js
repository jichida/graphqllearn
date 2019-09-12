import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd-mobile'
import AppRoot from '../components/approot.js'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import config from './config'
import { AppContextWrap, AppContext } from '../contexts/app'
import { UserloginContextWrap } from '../contexts/userlogin'

import enUS from 'antd-mobile/lib/locale-provider/en_US'
// import zhTW from 'antd-mobile/lib/locale-provider/en_US'

//react 国际化
import { IntlProvider } from 'react-intl'
import MessageProvider from '../locales/MessageProvider'

const apolloClient = new ApolloClient({
  uri: config.serverurl
})

const languages = {
  'zh-cn': undefined,
  'zh-tw': undefined,
  'en': enUS
}

const ChildRoot = (props)=>{
  const { app: { locale = 'zh-cn' }} = useContext(AppContext)

  return (
    <ApolloProvider client={apolloClient}>
    <IntlProvider locale={locale} messages={MessageProvider(locale)}>
      <div>
          <Router>
            <LocaleProvider locale={languages[locale]}>
              <Route path="/" component={AppRoot}/>
            </LocaleProvider>
          </Router>
      </div>
    </IntlProvider>
    </ApolloProvider>
  )
}

const Root = (props)=>
    (
      <AppContextWrap>
        <UserloginContextWrap>
          <ChildRoot />
        </UserloginContextWrap>
      </AppContextWrap>
    )

export default Root;

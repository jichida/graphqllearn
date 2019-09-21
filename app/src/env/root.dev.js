import React from 'react'
import lodashGet from 'lodash.get'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { LocaleProvider } from 'antd-mobile'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { GetLocale } from '../components/controls/app'
import { useStatusBarHeight } from './hooks/hookstatusbarheight'
import AppRoot from '../components/approot.js'
import initApollo from './apollo'

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
  // const { data: { locale } } = useQuery(GetLocale)
  const locale = 'zh-cn'

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
  const initState = {
    locale: 'zh-cn',
    maintabIndex: 0,
    statusbar: lodashGet(statusbarInfo, 'data.statusBarHeight', 22),
  }

  const apolloClient = initApollo(initState)

  console.log(apolloClient)

  return (
    <ApolloProvider client={apolloClient}>
        <ChildRoot />
    </ApolloProvider>
  )
}

export default Root;

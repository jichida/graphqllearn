import React, { Suspense, lazy } from 'react';
import { Route,Switch,withRouter } from 'react-router-dom';
import './common.less';
import Spin from 'antd/es/spin';

import {requireAuthentication} from './requireauthentication';

import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import SignForget from './pages/sign-forget'
import AccountSetting from './pages/account-setting'
// import Index from './index-container'
// // import MyPersonal from './my-personal'
// import MyPersonalProfit from './my-personalprofit'
// import MyPersonalClubProfit from './my-personalclubprofit'
// import MyClubProfit from './my-clubprofit'
// import MyClub from './my-club'
// import MyDiscovery from './my-discovery'
// import MyDiscoveryNews from './my-discovery-news'
// import MySetting from './my-setting'
// import MySettingPassword from './my-setting-change-password'
// import MySettingTransaction from './my-setting-change-transaction'
// import MySettingKeyExport from './my-setting-key-export'
// import MySettingKeyView from './my-setting-key-view'
// import MyContact from './my-contact'
// import MyContactChat from './my-contact-chat'
// import MyAbout from './my-about'

const rootStyle = {
    position: 'relative',
    overflow: 'auto',
    minHeight: '100vh',
    backgroundColor: '#0b1129'
}

const AppRoot = (props) => {

  return (
    <div style={rootStyle} >
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup/:invitecode" component={SignUp} />
        {/* <Route exact path="/signupsuccess" component={SignUpSuccess} />
        <Route exact path="/signupagreement" component={SignUpAgreement} /> */}
        <Route exact path="/signforget" component={SignForget} />
        <Route exact path="/accountsetting/0" component={AccountSetting} />
        {/* <Route exact path="/index" component={requireAuthentication(Index)} />
        <Route exact path="/mypersonal" component={requireAuthentication(MyPersonal)} />
        <Route exact path="/mypersonalprofit" component={requireAuthentication(MyPersonalProfit)} />
        <Route exact path="/mypersonalclubprofit" component={requireAuthentication(MyPersonalClubProfit)} />
        <Route exact path="/myclubprofit" component={requireAuthentication(MyClubProfit)} />
        <Route exact path="/myclub" component={requireAuthentication(MyClub)} />
        <Route exact path="/mydiscovery" component={requireAuthentication(MyDiscovery)} />
        <Route exact path="/news/:id" component={requireAuthentication(MyDiscoveryNews)} />
        <Route exact path="/mysetting" component={requireAuthentication(MySetting)} />
        <Route exact path="/mysettingpassword" component={requireAuthentication(MySettingPassword)} />
        <Route exact path="/mysettingtransaction" component={requireAuthentication(MySettingTransaction)} />
        <Route exact path="/mysettingkeyexport" component={requireAuthentication(MySettingKeyExport)} />
        <Route exact path="/mysettingkeyview" component={requireAuthentication(MySettingKeyView)} />
        <Route exact path="/mycontact" component={requireAuthentication(MyContact)} />
        <Route exact path="/mycontactchat/:adminuserid" component={requireAuthentication(MyContactChat)} />
        <Route exact path="/myabout" component={requireAuthentication(MyAbout)} /> */}
      </Switch>
    </div>
  )
}

export default AppRoot

import React, { Suspense, lazy } from 'react';
import { Route,Switch,withRouter } from 'react-router-dom';
import './common.less';
import Spin from 'antd/es/spin';

import {requireAuthentication} from './requireauthentication';

import SignForget from './pages/sign-forget'
// import Index from './index-container'
// import Arbitrage from './money-arbitrage'
// import Arbitraging from './money-arbitraging'
// import ArbitrageRecord from './money-arbitragerecord'
// import Recharge from './money-recharge'
// import RechargeRecord from './money-rechargerecord'
// import Cash from './money-cash'
// import CashRecord from './money-cashrecord'
// import PriceDetail from './price-detail'
// import RollIn from './price-rollin'
// import RollInRecord from './price-rollin-record'
// import RollInRecordDetail from './price-rollin-record-detail'
// import RollOut from './price-rollout'
// import RollOutRecord from './price-rollout-record'
// import RollOutRecordDetail from './price-rollout-record-detail'
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


const SignIn = withRouter(lazy(() => import('./pages/sign-in')));
const SignUp =  withRouter(lazy(() => import('./pages/sign-up')));
// const SignUpSuccess =  withRouter(lazy(() => import('./sign-up-success')));
// const SignUpAgreement =  withRouter(lazy(() => import('./sign-up-agreement')));

// const SignForget =  withRouter(lazy(() => import('./sign-forget')));
// const Index =  withRouter(lazy(() => import('./index-container')));
// const Arbitrage =  withRouter(lazy(() => import('./money-arbitrage')));
// const Arbitraging =  withRouter(lazy(() => import('./money-arbitraging')));
// const ArbitrageRecord=  withRouter(lazy(() => import('./money-arbitragerecord')));
// const Recharge =  withRouter(lazy(() => import('./money-recharge')));
// const RechargeRecord =  withRouter(lazy(() => import('./money-rechargerecord')));
// const Cash =  withRouter(lazy(() => import('./money-cash')));
// const CashRecord =  withRouter(lazy(() => import('./money-cashrecord')));
// const PriceDetail =  withRouter(lazy(() => import('./price-detail')));
// const RollIn =  withRouter(lazy(() => import('./price-rollin')));
// const RollInRecord =  withRouter(lazy(() => import('./price-rollin-record')));
// const RollInRecordDetail =  withRouter(lazy(() => import('./price-rollin-record-detail')));
// const RollOut =  withRouter(lazy(() => import('./price-rollout')));
// const RollOutRecord =  withRouter(lazy(() => import('./price-rollout-record')));
// const RollOutRecordDetail =  withRouter(lazy(() => import('./price-rollout-record-detail')));
// const MyPersonal =  withRouter(lazy(() => import('./my-personal')));
// const MyPersonalProfit =  withRouter(lazy(() => import('./my-personalprofit')));
// const MyPersonalClubProfit =  withRouter(lazy(() => import('./my-personalclubprofit')));
// const MyClubProfit =  withRouter(lazy(() => import('./my-clubprofit')));
// const MyClub =  withRouter(lazy(() => import('./my-club')));
// const MyDiscovery =  withRouter(lazy(() => import('./my-discovery')));
// const MyDiscoveryNews =  withRouter(lazy(() => import('./my-discovery-news')));
// const MySetting =  withRouter(lazy(() => import('./my-setting')));
// const MySettingPassword =  withRouter(lazy(() => import('./my-setting-change-password')));
// const MySettingTransaction =  withRouter(lazy(() => import('./my-setting-change-transaction')));
// const MySettingKeyExport =  withRouter(lazy(() => import('./my-setting-key-export')));
// const MySettingKeyView =  withRouter(lazy(() => import('./my-setting-key-view')));
// const MyContact =  withRouter(lazy(() => import('./my-contact')));
// const MyAbout =  withRouter(lazy(() => import('./my-about')));



const rootStyle = {
    position: 'relative',
    overflow: 'auto',
    minHeight: '100vh',
    backgroundColor: '#0b1129'
}

const loadingStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh'
}

const AppRoot = (props) => {

  return (
    <div style={rootStyle} >
      <Suspense fallback={
        <div style={loadingStyle}>
          <Spin size="large" />
        </div>}
      >
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup/:invitecode" component={SignUp} />
        {/* <Route exact path="/signupsuccess" component={SignUpSuccess} />
        <Route exact path="/signupagreement" component={SignUpAgreement} /> */}
        <Route exact path="/signforget" component={SignForget} />
        {/* <Route exact path="/index" component={requireAuthentication(Index)} />
        <Route exact path="/arbitrage" component={requireAuthentication(Arbitrage)} />
        <Route exact path="/arbitraging" component={requireAuthentication(Arbitraging)} />
        <Route exact path="/arbitragerecord" component={requireAuthentication(ArbitrageRecord)} />
        <Route exact path="/recharge" component={requireAuthentication(Recharge)} />
        <Route exact path="/rechargerecord" component={requireAuthentication(RechargeRecord)} />
        <Route exact path="/cash" component={requireAuthentication(Cash)} />
        <Route exact path="/cashrecord" component={requireAuthentication(CashRecord)} />
        <Route exact path="/pricedetail" component={requireAuthentication(PriceDetail)} />
        <Route exact path="/pricerollin" component={requireAuthentication(RollIn)} />
        <Route exact path="/pricerollinrecord" component={requireAuthentication(RollInRecord)} />
        <Route exact path="/pricerollinrecorddetail/:id" component={requireAuthentication(RollInRecordDetail)} />
        <Route exact path="/pricerollout" component={requireAuthentication(RollOut)} />
        <Route exact path="/pricerolloutrecord" component={requireAuthentication(RollOutRecord)} />
        <Route exact path="/pricerolloutrecorddetail/:id" component={requireAuthentication(RollOutRecordDetail)} />
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
      </Suspense>
    </div>
  )
}

export default AppRoot

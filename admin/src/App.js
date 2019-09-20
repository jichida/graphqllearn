import React, { Component } from 'react';
import { Admin, Resource } from "react-admin";

import dataProvider from './dataProvider.js';
import authProvider from './authProvider.js';
// import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
//import Login from './Login';
//import Layout from './Layout.js';
import Menu from './CustomMenu';
import { reducer as tree } from 'ra-tree-ui-materialui';
import { Dashboard } from './Dashboard.js';
//import CustomRoutes from './routes';
import translations from './i18n';
import singledocumentpage from './components/singledocumentpage/reducer';
import systemconfigreducer from './components/systemconfig/reducer';
//import themeReducer from './themeReducer.js';
//import menu from './menu/reducer';

import Widgets from '@material-ui/icons/Widgets' //系统设置
import { SystemconfigList } from './components/systemconfig/index.js';
import {AddressconstCreate,AddressconstList,AddressconstEdit} from './components/addressconst';
// import {CategorylistCreate,CategorylistList,CategorylistEdit} from './components/category/index.js';
import {ProductlistCreate as CPCreate,ProductlistList as CPCList,ProductlistEdit as CPCEdit} from './components/product/indexc.js';
import {ProductlistCreate as EPCreate,ProductlistList as EPCList,ProductlistEdit as EPCEdit} from './components/product/indexc.js';
import {ExpresslistCreate,ExpresslistList,ExpresslistEdit} from './components/express/index.js';
import {BannerlistCreate,BannerlistList,BannerlistEdit} from './components/banner/index.js';
import {TopiclistList,TopiclistEdit} from './components/topic/index.js';
import {TopiccommentlistList,TopiccommentlistEdit} from './components/topiccomment/index.js';
// import {FeedbackList,FeedbackShow} from './components/feedback/index.js';
// import {CouponlistList,CouponlistCreate,CouponlistEdit,CouponlistShow} from './components/coupon/index.js';
import {OrderlistList,OrderlistEdit,OrderlistCreate} from './components/order/index.js';
import {UserlistList,UserlistEdit} from './components/user/index.js';
import {ShopList as CShopList,ShopEdit as CShopEdit,ShopCreate as CShopCreate } from './components/shop/indexc.js';
import {ShopList as EShopList,ShopEdit as EShopEdit,ShopCreate as EShopCreate} from './components/shop/indexe.js';
import {TypeofworkCreate,TypeofworkList,TypeofworkEdit,} from './components/typeofwork/index.js';
import {AboutlistList,AboutlistEdit,AboutlistCreate} from './components/abouts/index.js';
import {CategoriesList,CategoriesCreate,CategoriesEdit,} from './components/category';
import {PostageTemplatelistCreate,PostageTemplatelistList,PostageTemplatelistEdit} from './components/postagetemplate';
import {DevicelistList,DevicelistEdit} from './components/device/index';
import {RealtimedatalistList,RealtimedatalistEdit} from './components/realtimedata/index';
import {DevicedatahistoryList,DevicedatahistoryEdit} from './components/devicedatahistory/index';
import {RecommendHistoryList,RecommendHistoryEdit} from './components/recommendhistory/index';
import {WithdrawcashList,WithdrawcashEdit} from './components/withdrawcash/index';
import {TagCreate,TagList,TagEdit} from './components/tag';
import {LinkCreate,LinkList,LinkEdit} from './components/website/link';

const i18nProvider = locale => translations[locale];


class App extends Component {
  render() {
    return (
      <Admin dataProvider = {dataProvider}
      title = "爱上门APP管理后台"
      authProvider = {authProvider}
      customReducers = {{
        tree,
        systemconfig: systemconfigreducer,
        singledocumentpage,
      }}
      customSagas = {sagas}
      menu={Menu}
      dashboard = {Dashboard}
      locale = "cn"
      i18nProvider = {i18nProvider}
      >
      {
        permissions =>{
          return [
            <Resource name="systemconfig" icon={Widgets} list={SystemconfigList} />,
            <Resource name="addressconst"  icon={Widgets} list={AddressconstList} edit={AddressconstEdit} create={AddressconstCreate}  />,
            <Resource name="postagetemplate"  icon={Widgets} list={PostageTemplatelistList} edit={PostageTemplatelistEdit}  create={PostageTemplatelistCreate}  />,
            <Resource name="cproduct"  icon={Widgets} list={CPCList} edit={CPCEdit} create={CPCreate}  />,
            <Resource name="eproduct"  icon={Widgets} list={EPCList} edit={EPCEdit} create={EPCreate} />,
            <Resource name="ecategory" icon={Widgets}  list={CategoriesList} edit={CategoriesEdit} create={CategoriesCreate} />,
            <Resource name="express"  icon={Widgets} list={ExpresslistList} edit={ExpresslistEdit}  create={ExpresslistCreate}  />,
            <Resource name="banner"  icon={Widgets} list={BannerlistList} edit={BannerlistEdit}  create={BannerlistCreate}  />,
            <Resource name="topic"  icon={Widgets} list={TopiclistList} edit={TopiclistEdit}  />,
            <Resource name="comments"  icon={Widgets} list={TopiccommentlistList} edit={TopiccommentlistEdit}  />,
            <Resource name="user"  icon={Widgets} list={UserlistList} edit={UserlistEdit}  />,
            <Resource name="cshop"  icon={Widgets} list={CShopList} edit={CShopEdit}  create={CShopCreate} />,
            <Resource name="eshop"  icon={Widgets} list={EShopList} edit={EShopEdit}  create={EShopCreate} />,
            <Resource name="order"  icon={Widgets} list={OrderlistList} edit={OrderlistEdit} create={OrderlistCreate}/>,
            <Resource name="typeofwork"  icon={Widgets} list={TypeofworkList} edit={TypeofworkEdit}  create={TypeofworkCreate} />,
            <Resource name="device"  icon={Widgets} list={DevicelistList} edit={DevicelistEdit}  />,
            <Resource name="recommendhistory"  icon={Widgets} list={RecommendHistoryList} edit={RecommendHistoryEdit}  />,
            <Resource name="realtimedata" list={RealtimedatalistList} edit={RealtimedatalistEdit}  />,
            <Resource name="cwithdrawcash"  icon={Widgets} list={WithdrawcashList} edit={WithdrawcashEdit}  />,
            <Resource name="devicedatahistory" list={DevicedatahistoryList} edit={DevicedatahistoryEdit}   />,
            <Resource name="about"  icon={Widgets} list={AboutlistList} edit={AboutlistEdit}  create={AboutlistCreate}  />,
            <Resource name="tag"  icon={Widgets} list={TagList} edit={TagEdit}  create={TagCreate}  />,
            <Resource name="link"  icon={Widgets} list={LinkList} edit={LinkEdit}  create={LinkCreate}  />,
            <Resource name="devicetype" />
        ]}
      }
      </Admin>
    );
  }
}

export default App;

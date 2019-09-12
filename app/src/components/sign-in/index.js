import React,{ useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useLazyQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl'
import './index.less'
import {rsaencrpt} from '../../util/rsa';
// import config from '../../env/config';
import Container from '../Controls/Container'
import RenderForm from './renderForm'
import SelectLanguage from './languageSelect'
import { Modal } from 'antd-mobile'
import { setbackhandler, removebackhandler, exitAndroidApp} from '../../env/android';
const alert = Modal.alert

const loginQuery = gql`
  query login_request($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`

const Index = ({history, intl: { formatMessage}}) => {
  const [ getLogin, { loading, data}] = useLazyQuery(loginQuery)

    useEffect(() => {
      //处理安卓退出/onback
      setbackhandler(()=>{
        //处理返回键
        alert(formatMessage({id: "form.quit"}), formatMessage({id: "form.confirmquit"}), [
          { text: formatMessage({id: "form.cancel"}), onPress: () => console.log('cancel') },
          { text: formatMessage({id: "form.quit"}), onPress: () => {
            exitAndroidApp();
          } },
        ])
      });

      return (()=>{
        removebackhandler();
      })
    },[])

    const handleSubmit = (values) => {
        // 处理登录
        console.log('Sign In:', values)
        // try{
        //   dispatch(set_weui({
        //     toast:{
        //       type:'loading',
        //       text:intl.formatMessage({id:'app.logining'}),
        //       value:'show',
        //     }
        //   }));
        //   values.password = rsaencrpt(values.password,config.server_publickey);
        //   dispatch(callthen(login_request, login_result, values))
        //   .then((result) => {
        //     dispatch(set_weui({
        //       toast:{
        //         type:'loading',
        //         value:'hide',
        //       }
        //     }));
        //     const fdStart = location.search.indexOf("?next=");
        //     if(fdStart === 0){
        //         const redirectRoute = location.search.substring(6);
        //         history.replace(redirectRoute);
        //     }
        //     else{
        //         history.replace(`/index`);
        //     }
        //   })
        //   .catch((e)=> {
        //     dispatch(set_weui({
        //       toast:{
        //         type:'loading',
        //         value:'hide',
        //       }
        //     }));
        //     console.log(e)
        //   })
        // }
        // catch(e){
        //   dispatch(set_weui({
        //     toast:{
        //       type:'loading',
        //       value:'hide',
        //     }
        //   }));
        //   console.log(e);
        // }

    }

    return (
        <Container className="sign-in-container">
            <NavBar
                mode="dark"
            ><FormattedMessage id="login.signin" /></NavBar>
            <RenderForm onSubmit={handleSubmit} />
            <div className="info">
                <div className="info-btn" onClick={() => history.push('/signup/000000')}>没有账户，立即注册</div>
                <div className="info-btn" onClick={() => history.push('/signforget')}><FormattedMessage id="login.forgetpassword" />?</div>
            </div>
            <SelectLanguage visible={true} />
        </Container>
    )
}

export default withRouter(injectIntl(Index))

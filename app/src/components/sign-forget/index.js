import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl'
import './index.less'
import { rsaencrpt } from '../../util/rsa';
import config from '../../env/config';
import Container from '../Controls/Container'

import RenderForm from './renderForm'

const Index = ({history, intl: { formatMessage }}) => {
    const handleSubmit = (values) => {
        // 处理忘记密码
        console.log('Forget Password:', values)
        // const payload = {
        //   authcode:values.captcha,
        //   password:rsaencrpt(values.password,config.server_publickey),
        //   email:values.email,
        // };
        // dispatch(callthen(findpwd_request,findpwd_result,payload)).then((result)=>{
        //   dispatch(set_weui({toast:{type: 'success', text: formatMessage({id: "login.successchangepassword"})}}))
        //   history.replace('/');
        // }).catch((e)=>{

        // });
        // dispatch(callthen(findpwd_request,findpwd_result,payload));
        // captcha: "123456"
        // confirm: "123456"
        // email: "xiaoqingwang@126.com"
        // password: "123456"

    }

    return (
        <Container className="sign-forget-container">
            <NavBar
                mode="dark"
                icon={<Icon type="left" size="lg" />}
                onLeftClick={() => history.goBack()}
            ><FormattedMessage id="login.forgetpassword" /></NavBar>
            <RenderForm onSubmit={handleSubmit} />
        </Container>
    )
}

export default withRouter(injectIntl(Index))

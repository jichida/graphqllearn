import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, Popover } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl'
import { set_locale, AppContext } from '../../contexts/app'
import './index.less'
import {rsaencrpt} from '../../util/rsa';
import RenderForm from './renderForm'
import Container from '../Controls/Container'

const Item = Popover.Item

const Index = ({history, match, intl: { formatMessage }}) => {
    const { app: { locale }, dispatch } = useContext(AppContext)
    const [ popVisible, setPopVisible ] = useState(false)
    
    const lanString = {
        'en': 'EN',
        'zh-cn': '简',
        'zh-tw': '繁'
    }

    const handleVisibleChange = (visible) => {
        setPopVisible(visible)
    }

    const handleSelect = (opt) => {
        console.log(opt.props.value);
        dispatch({
            type: set_locale,
            payload: opt.props.value
        })
        setPopVisible(false)
    }

    const handleSubmit = (values) => {
        // 处理注册
        console.log('Sign Up:', values)
        // const payload = {
        //   authcode:values.captcha,
        //   password:rsaencrpt(values.password,config.server_publickey),
        //   email:values.email,
        //   invitecode:values.invitecode,
        //   passwordtrade:rsaencrpt(values.transaction,config.server_publickey),
        // };
        // dispatch(callthen(register_request,register_result,payload)).then((result)=>{
        //   dispatch(set_weui({toast:{type: 'success', text: formatMessage({id: "login.registersuccess"})}}))
        //   history.replace('/signupsuccess');
        // }).catch((e)=>{

        // });
        // captcha: "1234"
        // confirm: "123456"
        // confirmtransaction: "123465"
        // email: "xiaoqingwang@126.com"
        // invite: "000000"
        // password: "123456"
        // transaction: "123465"
    }

    return (
        <Container className="sign-up-container">
            <NavBar
                mode="dark"
                icon={<Icon type="left" size="lg" />}
                onLeftClick={() => history.goBack()}
                rightContent={
                    <Popover mask
                        visible={popVisible}
                        placement = "bottomLeft"
                        overlay={[
                            (<Item key="1" value="zh-cn" data-seed="logId">中文简体</Item>),
                            (<Item key="2" value="en">English</Item>),
                        ]}
                        align={{
                            overflow: { adjustY: 30, adjustX: 30 },
                            offset: [10, 30],
                        }}
                        onVisibleChange={handleVisibleChange}
                        onSelect={handleSelect}
                    >
                        <div style={{fontSize: '16px', color: '#ffffff'}}>
                            {lanString[locale]}
                        </div>
                    </Popover>
                }
            ><FormattedMessage id="login.register" /></NavBar>
            <RenderForm onSubmit={handleSubmit} invitecode={match.params.invitecode} />
        </Container>
    )
}

// const mapStateToProps = ({app: { locale }}) => ({
//     locale
// })

export default withRouter(injectIntl(Index))

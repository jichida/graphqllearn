import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import './index.less'
import Container from '../../component/container'
import RenderForm from './renderForm'

const ChangePassword = gql`
    mutation ChangePassword($username: String!, $password: String!) {
        updateUser(username: $username, password: $password) 
    }
`

const Index = ({history}) => {
    const handleSubmit = (values) => {
        // 处理忘记密码
        console.log('Forget Password:', values)
    }

    return (
        <Container className="sign-forget-container">
            <NavBar
                mode="dark"
                icon={<Icon type="left" size="lg" />}
                onLeftClick={() => history.goBack()}
            ><FormattedMessage id="login.password.forget" /></NavBar>
            <RenderForm onSubmit={handleSubmit} />
        </Container>
    )
}

export default withRouter(Index)

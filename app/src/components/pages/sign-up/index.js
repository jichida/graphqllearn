import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { FormattedMessage } from 'react-intl'
import './index.less'
import RenderForm from './renderForm'
import Container from '../../controls/container'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SignUp = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
        signUp (username: $username, email: $email, password: $password) {
            token
        }
    }
`

const Index = ({history, match}) => {
    const [ signUp, { data, error }] = useMutation(SignUp)

    const handleSubmit = async (values) => {
        // 处理注册
        console.log('Sign Up:', values)
        const result = await signUp({variables: { username: 'name', email: '123456@qq.com', password: '1234567'}})
        console.log('sign up result:', result)
    }

    return (
        <Container className="sign-up-container">
            <NavBar
                mode="dark"
                icon={<Icon type="left" size="lg" />}
                onLeftClick={() => history.goBack()}
            ><FormattedMessage id="login.register" /></NavBar>
            <RenderForm onSubmit={handleSubmit} invitecode={match.params.invitecode} />
        </Container>
    )
}

export default withRouter(Index)

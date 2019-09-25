import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'
import { NavBar, Toast } from 'antd-mobile'
import { useIntl, FormattedMessage } from 'react-intl'
import './index.less'
import Container from '../../controls/container'
import RenderForm from './renderForm'
import SelectLanguage from '../../controls/language'
import BackToExit from '../../controls/backToExitApp'

const SignIn = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) @client {
      token
    }
  }
`

const Index = ({history}) => {
  const { formatMessage } = useIntl()
  const [ signIn, { error }] = useMutation(SignIn, {
    onCompleted({signIn}) {
      console.log('sign in result:', signIn)
    }
  })

  useEffect(() => {
    if(!!error) {
      Toast.fail(`${formatMessage({id: 'login.check'})}`)
    }
  }, [error])

  const handleSubmit = async ({ email, password }) => {
    // 处理登录
    const result = await signIn({variables: {
      email,
      password
    }})
  }

  return (
      <Container className="sign-in-container">
          <NavBar
              mode="dark"
          ><FormattedMessage id="login.signin" /></NavBar>
          <RenderForm onSubmit={handleSubmit} />
          <div className="info">
              <div className="info-btn" onClick={() => history.push('/signup/000000')}>没有账户，立即注册</div>
              <div className="info-btn" onClick={() => history.push('/signforget')}>
                {`${formatMessage({id: 'login.password.forget'})}?`}
              </div>
          </div>
          <SelectLanguage visible={true} />
          <BackToExit />
      </Container>
  )
}

export default withRouter(Index)

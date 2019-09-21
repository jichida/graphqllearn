import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { injectIntl, FormattedMessage } from 'react-intl'
import { List, Button, InputItem, Toast } from 'antd-mobile'

export const GetCaptcha = gql`
    mutation GetCaptcha($email: String!) {
        getCaptcha(email: $email)
    }
`

const formikOption = {
    displayName: 'forgetForm',
    mapPropsToValues: () => ({
        email: '',
        captcha: '',
        password: '',
        confirm: ''
    }),
    validationSchema: ({intl: { formatMessage }}) => Yup.object().shape({
        email: Yup.string()
            .email(`${formatMessage({id: 'login.mail.incorrect'})}`)
            .required(`${formatMessage({id: 'login.mail.input'})}`),
        password: Yup.string()
            .required(`${formatMessage({id: 'login.password.input'})}`),
    }),
    validate: (values, {intl: { formatMessage }}) => {
        const errors = {}
        if(values.password !== values.confirm) {
            errors.confirm = `${formatMessage({id: 'login.password.new.confirm.error'})}`
        }
        return errors
    },
    handleSubmit: (values, { props: { onSubmit }, setSubmiting}) => {
        setSubmiting(true)
        onSubmit(values)
    }
}

const Index = (props) => {
    const { intl: { formatMessage }, values, touched, errors, isSubmitting, handleSubmit, setFieldValue, setFieldTouched } = props
    const { email, captcha, password, confirm } = values
    const [ isSending, setIsSending ] = useState(false)
    const [ getCaptcha ] = useMutation(GetCaptcha)

    console.log('forget form props:', props)

    const isInvalid =
        password !== confirm ||
        password === '' ||
        email === '' ||
        captcha === ''

    const handleSend = async () => {
        if(!!values.email) {
            setIsSending(true)
            await getCaptcha({variables: {
                email: values.email
            }})
            setIsSending(false)
        }
    }
    
    return (
        <form className="form">
            <List className="form-list">
                <InputItem
                    name="email"
                    value={values.email}
                    onChange={(value) => setFieldValue('email', value)}
                    onBlur={() => setFieldTouched('email', true)}
                    clear
                    extra={
                        <Button size="small" className="btn-send" disabled={!isSending} onClick={handleSend}>
                            <FormattedMessage id="login.sendcode" />
                        </Button>
                    }
                    error={errors.email&&touched.email}
                    onErrorClick={() => {
                        Toast.fail(errors.email)
                    }}
                    placeholder={`${formatMessage({id: "login.mail.input"})}`}
                ><FormattedMessage id="login.mail" /></InputItem>
                <InputItem
                    name="captcha"
                    value={values.captcha}
                    onChange={(v) => setFieldValue('captcha', v)}
                    onBlur={() => setFieldTouched('captcha', true)}
                    clear
                    error={errors.captcha&&touched.captcha}
                    onErrorClick={() => {
                        Toast.fail(errors.captcha)
                    }}
                    placeholder={`${formatMessage({id: "login.checkcode"})}`}
                ><FormattedMessage id="login.code" /></InputItem>
                <InputItem
                    name="password"
                    value={values.password}
                    onChange={(v) => setFieldValue('password', v)}
                    onBlur={() => setFieldTouched('password', true)}
                    clear
                    error={errors.password&&touched.password}
                    onErrorClick={() => {
                        Toast.fail(errors.password)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.loginpassword"})}`}
                ><FormattedMessage id="login.resetloginpassword" /></InputItem>
                <InputItem
                    name="confirm"
                    value={values.confirm}
                    onChange={(v) => setFieldValue('confirm', v)}
                    onBlur={() => setFieldTouched('confirm', true)}
                    clear
                    error={errors.confirm&&touched.confirm}
                    onErrorClick={() => {
                        Toast.fail(errors.confirm)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.loginpasswordagain"})}`}
                ><FormattedMessage id="login.confirmloginpassword" /></InputItem>
            </List>
            <div className="submit">
                <Button disabled={isInvalid||isSubmitting} onClick={handleSubmit}>
                    <FormattedMessage id="form.ok" />
                </Button>
            </div>
        </form>
    )
}

export default injectIntl(withFormik(formikOption)(Index))

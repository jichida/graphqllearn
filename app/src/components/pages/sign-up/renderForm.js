import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { List, Button, InputItem, Toast, Checkbox } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl';
import { GetCaptcha } from '../sign-forget/renderForm'

const AgreeItem = Checkbox.AgreeItem

const formikOption = {
    displayName: 'signupForm',
    mapPropsToField: ({invitecode}) => ({
        email: '',
        captcha: '',
        password: '',
        confirm: '',
        invitecode
    }),
    validationSchema: ({intl: { formatMessage }}) => Yup.object().shape({
        email: Yup.string()
            .required(`${formatMessage({id: 'login.mail.input'})}`)
            .email(`${formatMessage({id: 'login.mail.incorrect'})}`),
        captcha: Yup.string()
            .required(`${formatMessage({id: 'login.checkcode'})}`),
        password: Yup.string()
            .required(`${formatMessage({id: 'login.loginpassword'})}`),
        confirm: Yup.string()
            .required(`${formatMessage({id: 'login.loginpasswordagain'})}`),
        invitecode: Yup.string()
            .required(`${formatMessage({id: 'login.inviteinput'})}`),
    }),
    validate: (values, {intl: { formatMessage }}) => {
        const errors = {}
        if(values.password !== values.confirm) {
            errors.confirm = `${formatMessage({id: 'login.password.new.confirm.error'})}`
        }
        return errors
    },
    handleSubmit: (values, { props: { onSubmit }, setSubmitting}) => {
        setSubmitting(true)
        onSubmit(values)
    }
}

const Index = (props) => {
    const { history, intl: { formatMessage }, values, errors, touched, handleSubmit, setFieldValue, setFieldTouched, isSubmitting } = props
    const [ isAgree, setAgree ] = useState(false)
    const [ isSending, setIsSending ] = useState(false)
    const [ getCaptcha ] = useMutation(GetCaptcha)

    const isInvalid = values.email === '' || values.captcha === '' || values.password !== values.confirm

    const handleSend = async () => {
        console.log('request captcha')
        if(!!values.email) {
            setIsSending(true)
            await getCaptcha({variables: {
                email: values.email
            }})
            setIsSending(false)
        }
    }

    return (
        <React.Fragment>
        <div className="form">
            <List className="form-list">
                <InputItem
                    name="email"
                    value={values.email}
                    onChange={(v) => setFieldValue('email', v)}
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
                ><FormattedMessage id="login.setloginpassword" /></InputItem>
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
                <InputItem
                    name="invitecode"
                    value={values.invite}
                    onChange={(v) => setFieldValue('invitecode', v)}
                    onBlur={() => setFieldTouched('invitecode', true)}
                    clear
                    error={errors.invitecode&&touched.invitecode}
                    onErrorClick={() => {
                        Toast.fail(errors.invitecode)
                    }}
                    placeholder={`${formatMessage({id: "login.inviteinputrequired"})}`}
                ><FormattedMessage id="login.invite" /></InputItem>
            </List>
        </div>
        <div className="agree">
            <AgreeItem checked={isAgree} onChange={e => setAgree(e.target.checked)}>
                <span onClick={() => history.push('/signupagreement')}><FormattedMessage id="login.agree" /></span>
            </AgreeItem>
        </div>
        <div className="submit">
            <Button disabled={!isAgree || isInvalid || isSubmitting} onClick={handleSubmit}>
                <FormattedMessage id="login.registernow" />
            </Button>
        </div>
        </React.Fragment>
    )
}

export default injectIntl(withFormik(formikOption)(withRouter(Index)))

import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { List, Button, InputItem, Toast } from 'antd-mobile'

const formikOption = {
    displayName: 'loginForm',
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: ({intl: {formatMessage}}) => Yup.object().shape({
        email: Yup.string()
          .email(`${formatMessage({id: 'login.mail.incorrect'})}`)
          .required(`${formatMessage({id: 'login.mail.input'})}`),
        password: Yup.string()
          .required(`${formatMessage({id: 'login.password.input'})}`),
    }),
    handleSubmit: (values, { props: { onSubmit }, setSubmitting }) => {
        // setSubmitting(true)
        onSubmit(values)
        setSubmitting(false)
    }
}

const Index = (props) => {
    const { values, touched, errors, isSubmitting, handleSubmit, setFieldValue, setFieldTouched } = props
    const { formatMessage } = props.intl
    return (
        <form className="form">
            <List className="form-list">
                <InputItem
                    name="email"
                    value={values.email}
                    clear
                    error={errors.email&&touched.email}
                    onChange={(value) => setFieldValue('email', value)}
                    onBlur={() => setFieldTouched('email', true)}
                    onErrorClick={() => {
                        Toast.fail(errors.email)
                    }}
                    placeholder={`${formatMessage({id: "login.mail.input"})}`}
                ><FormattedMessage id= "login.mail" /></InputItem>
                <InputItem
                    name="password"
                    value={values.password}
                    error={errors.password&&touched.password}
                    onChange={(value) => setFieldValue('password', value)}
                    onBlur={() => setFieldTouched('password', true)}
                    onErrorClick={() => {
                        Toast.fail(errors.password, 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.password.input"})}`}
                    clear
                ><FormattedMessage id= "login.password" /></InputItem>
            </List>
            <div className="submit"><Button disabled={isSubmitting} onClick={handleSubmit}><FormattedMessage id="login.login" /></Button></div>
        </form>
    )
}

export default injectIntl(withFormik(formikOption)(Index)) 

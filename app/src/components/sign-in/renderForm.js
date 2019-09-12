import React from 'react'
import { createForm } from 'rc-form'
import { List, Button, InputItem, Toast } from 'antd-mobile'
import { injectIntl, FormattedMessage } from 'react-intl'

const Index = ({ form, onSubmit, email, password, intl}) => {
    const { getFieldProps, getFieldError, validateFields } = form
    const { formatMessage } = intl

    const handleSubmit = () => {
        validateFields((err, values) => {
            if(!err) {
                onSubmit(values)
            } else {
                Toast.fail(formatMessage({id: "login.check"}))
            }
        })
    }
    return (
        <React.Fragment>
        <div className="form">
            <List className="form-list">
                <InputItem
                    {...getFieldProps('email', {
                        validateTrigger: 'onBlur',
                        // initialValue: 'a18767448686@163.com',
                        initialValue: email,
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.mailinput"})
                            },
                            {
                                type: 'email',
                                message: formatMessage({id: "login.mailinputcorrect"})
                            }
                        ]
                    })}
                    clear
                    error={!!getFieldError('email')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('email'), 2)
                    }}
                    placeholder={`${formatMessage({id: "login.mailinput"})}`}
                ><FormattedMessage id= "login.mail" /></InputItem>
                <InputItem
                    {...getFieldProps('password', {
                        validateTrigger: 'onBlur',
                        initialValue: password,
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.passwordinput"})
                            }
                        ]
                    })}
                    clear
                    error={!!getFieldError('password')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('password'), 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.passwordinput"})}`}
                ><FormattedMessage id= "login.password" /></InputItem>
            </List>
        </div>
        <div className="submit"><Button onClick={handleSubmit}><FormattedMessage id="login.login" /></Button></div>
        </React.Fragment>
    )
}

// const mapStateToProps = (state, ownProps) => {
//     const email = lodashGet(state, 'userlogin.email', '')
//     const password = lodashGet(state, 'userlogin.password', '')
//     return {
//         email,
//         password,
//     }
// }

export default createForm()(injectIntl(Index))

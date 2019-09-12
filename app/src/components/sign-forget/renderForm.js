import React, { useState } from 'react'
import { createForm } from 'rc-form'
import { injectIntl, FormattedMessage } from 'react-intl'
import { List, Button, InputItem, Toast } from 'antd-mobile'
// import { callthen } from '../../sagas/pagination'
// import { sendauth_request, sendauth_result } from '../../actions'

const Index = ({ dispatch,form, onSubmit, intl: { formatMessage }}) => {
    const { getFieldProps, getFieldError, validateFields, getFieldValue } = form
    const [ confirmDirty, setConfirmDirty ] = useState(false)

    const handleSend = () => {
        validateFields(['email'], (err, values) => {
            if(!err) {
                console.log('Request Auth:', values)
                // const authpayload = {...values};
                // authpayload.typestring = 'forgetpwd';
                // dispatch(callthen(sendauth_request, sendauth_result,authpayload ))
                // .then((result) => {
                //     Toast.success(`${formatMessage({id: "login.codesend"})}${result.message}`, 1)
                // })
                // .catch((e)=> {
                //     console.log(e)
                // })
            }
        })
    }

    const handleSubmit = () => {
        validateFields((err, values) => {
            if(!err) {
                const { password, confirm } = values
                if(password === confirm) {
                    onSubmit(values)
                } else {
                    Toast.fail(formatMessage({id: "login.matchpassword"}))
                }
            } else {
                Toast.fail(formatMessage({id: "login.checkinput"}))
            }
        })
    }

    const handleConfirmBlur = (value) => {
        setConfirmDirty(confirmDirty || !!value)
    }

    const validateNextConfirm = (rule, value, callback ) => {
        if (value && confirmDirty) {
            validateFields(['confirm'], { force: true });
        }
        callback();
    }

    const passwordConfirm = (rule, value, callback) => {
        const password = getFieldValue('password')
        if(password !== value) {
            callback(formatMessage({id: "login.matchpassword"}))
        }
        callback()
    }

    return (
        <React.Fragment>
        <div className="form">
            <List className="form-list">
                <InputItem
                    {...getFieldProps('email', {
                        validateTrigger: 'onBlur',
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
                    extra={<Button size="small" className="btn-send" onClick={handleSend}><FormattedMessage id="login.sendcode" /></Button>}
                    error={!!getFieldError('email')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('email'), 2)
                    }}
                    placeholder={`${formatMessage({id: "login.mailinput"})}`}
                ><FormattedMessage id="login.mail" /></InputItem>
                <InputItem
                    {...getFieldProps('captcha', {
                        validateTrigger: 'onBlur',
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.checkcode"})
                            }
                        ]
                    })}
                    clear
                    error={!!getFieldError('captcha')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('captcha'), 2)
                    }}
                    placeholder={`${formatMessage({id: "login.checkcode"})}`}
                ><FormattedMessage id="login.code" /></InputItem>
                <InputItem
                    {...getFieldProps('password', {
                        validateTrigger: 'onBlur',
                        // initialValue: '',
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.loginpassword"})
                            },
                            {
                                validator: validateNextConfirm
                            }
                        ]
                    })}
                    clear
                    error={!!getFieldError('password')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('password'), 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.loginpassword"})}`}
                ><FormattedMessage id="login.resetloginpassword" /></InputItem>
                <InputItem
                    {...getFieldProps('confirm', {
                        // validateTrigger: 'onBlur',
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.loginpasswordagain"})
                            },
                            {
                                validator: passwordConfirm
                            }
                        ]
                    })}
                    clear
                    onBlur={handleConfirmBlur}
                    error={!!getFieldError('confirm')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('confirm'), 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.loginpasswordagain"})}`}
                ><FormattedMessage id="login.confirmloginpassword" /></InputItem>
            </List>
        </div>
        <div className="submit"><Button onClick={handleSubmit}><FormattedMessage id="form.ok" /></Button></div>
        </React.Fragment>
    )
}

export default createForm()(injectIntl(Index))

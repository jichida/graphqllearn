import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { createForm } from 'rc-form'
import { List, Button, InputItem, Toast, Checkbox } from 'antd-mobile'
// import { sendauth_request, sendauth_result } from '../../actions'
import { injectIntl, FormattedMessage } from 'react-intl';

const AgreeItem = Checkbox.AgreeItem

const Index = ({ form, dispatch, onSubmit, invitecode, history, intl: { formatMessage }}) => {
    const { getFieldProps, getFieldError, validateFields, getFieldValue } = form
    const [ isAgree, setAgree ] = useState(false)
    const [ passwordDirty, setPasswordDirty ] = useState(false)
    const [ tradeDirty, setTradeDirty ] = useState(false)
    const iseditable = invitecode==='000000';
    const handleSend = () => {
        validateFields(['email'], (err, values) => {
            if(!err) {
                console.log('Request Auth:', values)
                // const authpayload = {...values};
                // authpayload.typestring = 'register';
                // dispatch(callthen(sendauth_request, sendauth_result, authpayload))
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
                const { password, confirm, transaction, confirmtransaction } = values
                if(password === confirm) {
                    if(transaction === confirmtransaction) {
                        onSubmit(values)
                    } else {
                        Toast.fail(formatMessage({id: "login.matchtrade"}), 1)
                    }
                } else {
                    Toast.fail(formatMessage({id: "login.matchpassword"}), 1)
                }
            } else {
                Toast.fail(formatMessage({id: "login.checkinput"}), 1)
            }
        })
    }

    const handlePasswordConfirmBlur = (value) => {
        setPasswordDirty(passwordDirty || !!value)
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== getFieldValue('password')) {
          callback(formatMessage({id: "login.matchpassword"}));
        } else {
          callback()
        }
      }
    
    const validateToNextPassword = (rule, value, callback) => {
        if (value && passwordDirty) {
            validateFields(['confirm'], { force: true });
        }
        callback();
    }

    const handleTradeConfirmBlur = (value) => {
        setTradeDirty(tradeDirty || !!value)
    }

    const compareToFirstTrade = (rule, value, callback) => {
        if (value && value !== getFieldValue('transaction')) {
          callback(formatMessage({id: "login.matchtrade"}));
        } else {
          callback()
        }
      }
    
    const validateToNextTrade = (rule, value, callback) => {
        if (value && tradeDirty) {
            validateFields(['confirmtransaction'], { force: true });
        }
        callback();
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
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.loginpassword"})
                            },
                            {
                                validator: validateToNextPassword
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
                ><FormattedMessage id="login.setloginpassword" /></InputItem>
                <InputItem
                    {...getFieldProps('confirm', {
                        // validateTrigger: 'onBlur',
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.loginpasswordagain"})
                            },
                            {
                                validator: compareToFirstPassword,
                            }
                        ]
                    })}
                    clear
                    onBlur={handlePasswordConfirmBlur}
                    error={!!getFieldError('confirm')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('confirm'), 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.loginpasswordagain"})}`}
                ><FormattedMessage id="login.confirmloginpassword" /></InputItem>
                <InputItem
                    {...getFieldProps('transaction', {
                        validateTrigger: 'onBlur',
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.tradepassword"})
                            },
                            {
                                validator: validateToNextTrade
                            }
                        ]
                    })}
                    clear
                    error={!!getFieldError('transaction')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('transaction'), 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.tradepassword"})}`}
                ><FormattedMessage id="login.settradepassword" /></InputItem>
                <InputItem
                    {...getFieldProps('confirmtransaction', {
                        // validateTrigger: 'onBlur',
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.tradepasswordagain"})
                            },
                            {
                                validator: compareToFirstTrade
                            }
                        ]
                    })}
                    clear
                    onBlur={handleTradeConfirmBlur}
                    error={!!getFieldError('confirmtransaction')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('confirmtransaction'), 2)
                    }}
                    type="password"
                    placeholder={`${formatMessage({id: "login.tradepasswordagain"})}`}
                ><FormattedMessage id="login.confirmtradepassword" /></InputItem>
                <InputItem
                    {...getFieldProps('invitecode', {
                        validateTrigger: 'onBlur',
                        initialValue: invitecode,
                        rules: [
                            {
                                required: true,
                                message: formatMessage({id: "login.inviteinput"})
                            }
                        ]
                    })}
                    clear
                    editable={iseditable}
                    error={!!getFieldError('invitecode')}
                    onErrorClick={() => {
                        Toast.fail(getFieldError('invitecode'), 2)
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
        <div className="submit"><Button disabled={!isAgree} onClick={handleSubmit}><FormattedMessage id="login.registernow" /></Button></div>
        </React.Fragment>
    )
}

export default createForm()(injectIntl(withRouter(Index)))

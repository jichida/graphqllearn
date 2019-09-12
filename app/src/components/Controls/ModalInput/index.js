import React from 'react'
import { injectIntl } from 'react-intl'
import { Modal, Icon, Toast } from 'antd-mobile'
import './index.less'

class Index extends React.Component {

    check = (email) => {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if(email === ""){ //输入不能为空
            Toast.fail('Please input Email!', 1)
            return false
        } else if(!reg.test(email)){ //正则验证不通过，格式不对
            Toast.fail('Please input correct Email!', 1)
            return false
        } else {
            return true
        }
    }

    render() {
        const { value, onChange, intl: { formatMessage } } = this.props
        console.log(value)

        const handlePopup = (title) => {
            Modal.prompt(`${title}`, '', [
                {   text: formatMessage({id: "form.cancel"}) },
                {   text: formatMessage({id: "form.ok"}),
                    onPress: value => new Promise((resolve, reject) => {
                        if( this.props.title === formatMessage({id: "login.mail"})) {
                            if(this.check(value)) {
                                onChange(value)
                                resolve()
                            } else {
                                console.log('Reject!')
                                reject()
                            }
                            }
                            else {
                                onChange(value)
                                resolve()
                            }
                    }),
                },
                ], 'default', value)
        }

        return (
            <div className="item-extra" onClick={()=>handlePopup(this.props.title)}>
                <div className="extra-item">
                    {value}
                </div>
                { this.props.enableArrow && (
                    <div className="extra-item">
                        <Icon type="right" />
                    </div>)
                }
            </div>
        )
    }
}

export default injectIntl(Index)
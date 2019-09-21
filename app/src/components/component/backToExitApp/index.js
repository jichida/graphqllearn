import React, { useEffect } from 'react'
import { Modal } from 'antd-mobile'
import { useIntl } from 'react-intl'
import { setbackhandler, removebackhandler, exitAndroidApp } from '../../../env/android'

const alert = Modal.alert

const Index = (props) => {
    const { formatMessage } = useIntl()
    useEffect(() => {
        //处理安卓退出/onback
        setbackhandler(()=>{
          //处理返回键
          alert(formatMessage({id: "form.quit"}), formatMessage({id: "form.confirmquit"}), [
            { text: formatMessage({id: "form.cancel"}), onPress: () => console.log('cancel') },
            { text: formatMessage({id: "form.quit"}), onPress: () => {
                exitAndroidApp();
            } },
          ])
        });
  
        return (()=>{
          removebackhandler();
        })
    },[])

    return (<></>)
}

export default Index
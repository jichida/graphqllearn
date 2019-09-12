import React, { useState, useContext } from 'react'
import { Modal, List } from 'antd-mobile'
// import { set_locale } from '../../actions'
import { AppContext, set_locale } from '../../contexts/app'
import './languageSelect.less'

const Index = ({visible}) => {
    const { dispatch } = useContext(AppContext)
    const [ modalVisible, setModalVisible ] = useState(visible)

    const handleSelect = (locale) => {
        setModalVisible(false)
        // dispatch(set_locale(locale))
        dispatch({
            type: set_locale,
            payload: locale
        })
    }

    return (
        <Modal
            className="languages"
            popup
            visible={modalVisible}
            maskClosable={true}
            onClose={() => setModalVisible(false)}
            animationType="slide-up"
        >
            <List className="language-list" renderHeader={() => <div>Select Language</div>} style={{height: '210px', overflow: 'auto'}}>
                <List.Item onClick={() => handleSelect('zh-cn')}><div style={{textAlign: 'center'}}>中文</div></List.Item>
                <List.Item onClick={() => handleSelect('en')}><div style={{textAlign: 'center'}}>English</div></List.Item>
            </List>
        </Modal>
    )
}

export default Index
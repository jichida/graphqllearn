import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Modal, List } from 'antd-mobile'
import { GetLocale } from '../app'
import './index.less'

const Index = ({visible}) => {
    const [ modalVisible, setModalVisible ] = useState(visible)
    // const { data, client } = useQuery(GetLocale)

    const handleSelect = (locale) => {
        setModalVisible(false)
        // client.writeData({data: {locale}})
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
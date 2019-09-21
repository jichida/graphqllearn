import React from 'react'
import { Modal, Icon, List } from 'antd-mobile'
import './index.less'

const Index = (props) => {
    const { visible, handleClose, info:{title, content} } = props
    return (
        <Modal
          popup
          visible={visible}
          onClose={handleClose}
          animationType="slide-up"
          className="popup"
        >
            <List 
                renderHeader={() => (
                    <div className="popup-title">
                        <div className="title">{title}</div>
                        <div className="close"><Icon type="cross" onClick={handleClose} /></div>
                    </div>
                )} 
                className="popup-list"
            >
                <List.Item className="content">{content}</List.Item>
                {/* <List.Item className="close-item"><Icon type="cross" onClick={handleClose} /></List.Item> */}
          </List>
        </Modal>
    )
}

export default Index
import React from 'react'
import { Modal } from 'antd-mobile'

const Index = ({children, visible, className, onClose}) => {
    return (
        <Modal
          popup
          visible={visible}
          onClose={onClose}
          wrapClassName={className}
          animationType="slide-up"
        >
            {children}
        </Modal>
    )
}

export default Index
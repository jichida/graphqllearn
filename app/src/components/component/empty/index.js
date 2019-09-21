import React from 'react'
import { FormattedMessage } from 'react-intl'
import img_empty from './empty.png'

const Index = (props) => {
    return (
        <div className="empty-content">
            <div><img src={img_empty} alt="" /></div>
            <div style={{marginTop: '20px'}}><FormattedMessage id="app.error.empty" /></div>
        </div>
    )
}

export default Index
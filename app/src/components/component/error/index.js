import React from 'react'
import { FormattedMessage } from 'react-intl'
import img_error from './error.png'

const Index = (props) => {
    return (
        <div className="error-content">
            <div><img src={img_error} alt="" /></div>
            <div style={{marginTop: '20px'}}><FormattedMessage id="app.error.network" /></div>
        </div>
    )
}

export default Index
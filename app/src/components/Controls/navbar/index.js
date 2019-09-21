import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import './index.less'

const Index = ({history, title, mode = 'light'}) => {
    return (
        <NavBar
            mode={mode}
            icon={<Icon type="left" size="lg" />}
            onLeftClick={() => history.goBack()}
            >{title}
        </NavBar>
    )
}

export default withRouter(Index)

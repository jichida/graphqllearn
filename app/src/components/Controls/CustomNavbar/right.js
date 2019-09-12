import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'

const Index = ({history, title, right}) => {
    return (
        <NavBar
            icon={<Icon type="left" size="lg" />}
            onLeftClick={() => history.goBack()}
            rightContent={right}
            >{title}
        </NavBar>
    )
}

export default withRouter(Index)

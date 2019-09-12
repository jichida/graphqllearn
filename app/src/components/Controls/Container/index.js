import React, { useContext } from 'react'
import lodashGet from 'lodash.get'
import { AppContext } from '../../../contexts/app'

const Index = (props) => {
    const { app: { statusbar } } = useContext(AppContext)
    const class_name = lodashGet(props, 'className', '')
    const customTop = lodashGet(props, 'top', 0)
    const style = {
        paddingTop: `${customTop + statusbar}px`,
        boxSizing: 'border-box'
    }

    return (
        <div className={class_name} style={style}>
            {props.children}
        </div>
    )
}

export default Index
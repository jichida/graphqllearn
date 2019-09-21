import React from 'react'
import lodashGet from 'lodash.get'
import { useQuery } from '@apollo/react-hooks'
import { GetStatusbar } from '../Container'

const Index = (props) => {
    const { data: { statusbar }} = useQuery(GetStatusbar)
    const total = statusbar + lodashGet(props, 'top', 45) // top： 默认为顶部导航栏高度
    const style = {
        minHeight: `calc(100vh - ${total}px)`
    }

    return (
        <div className={lodashGet(props, 'className', '')} style={{...style, ...props.style}}>
            {props.children}
        </div>
    )
}

export default Index
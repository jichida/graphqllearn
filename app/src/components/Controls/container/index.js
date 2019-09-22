import React from 'react'
import lodashGet from 'lodash.get'
import { GetStatusbar } from '../app'
import { useQuery } from '@apollo/react-hooks'

const Index = (props) => {
    const { data: { statusbar }} = useQuery(GetStatusbar)
    const class_name = lodashGet(props, 'className', '')
    const customTop = lodashGet(props, 'top', 0) // 额外距离顶部位置
    const style = {
        paddingTop: `${customTop + statusbar}px`,
        boxSizing: 'border-box'
    }

    return (
        <div className={class_name} style={style}>{props.children}</div>
    )
}

export default Index
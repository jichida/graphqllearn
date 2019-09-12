import React from 'react'
import lodashGet from 'lodash.get'
import { connect } from 'react-redux'

const Index = (props) => {
    const class_name = lodashGet(props, 'className', '')
    const total = props.statusbar + lodashGet(props, 'extraHeight', 45)
    const style = {
        minHeight: `calc(100vh - ${total}px)`
    }

    return (
        <div className={class_name} style={{...style, ...props.style}}>
            {props.children}
        </div>
    )
}

const mapStateToProps = ({app: { statusbar }}) => ({
    statusbar
})

export default connect(mapStateToProps)(Index)
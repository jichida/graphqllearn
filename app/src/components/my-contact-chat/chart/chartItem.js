import React from 'react'
import moment from 'moment'

export const Other = ({chart}) => {
    return (
        <div className="chart-item">
            <div className="avatar-con">
                <div className="avatar">
                    <img src={chart.avatar} alt=""/>
                </div>
            </div>
            <div className="chart-txt-con other">
                <label className="name">{`${chart.userName}  ${moment(chart.created_at).format('YYYY-MM-DD, H:mm:ss')}`}</label>
                <div className="chart-txt">{chart.content}</div>
            </div>
        </div>
    )
}

export const Own = ({chart}) => {
    return (
        <div className="chart-item">
            <div className="chart-txt-con own">
                <label className="name">{`${moment(chart.created_at).format('YYYY-MM-DD, H:mm:ss')}  ${chart.userName}`}</label>
                <div className="chart-txt">{chart.content}</div>
            </div>
            <div className="avatar-con">
                <div className="avatar">
                    <img src={chart.avatar} alt=""/>
                </div>
            </div>
        </div>
    )
}


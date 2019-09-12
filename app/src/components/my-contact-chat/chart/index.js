import React from 'react'
import lodashGet from 'lodash.get'
import { PullToRefresh, ListView, List } from 'antd-mobile'
// import { injectIntl } from 'react-intl'
import { Own, Other } from './chartItem'
import './index.less'
// import avatar from '../../../assets/touxiang.png'
import user_avatar from '../../../assets/user.png'
import service_avatar from '../../../assets/service.png'

const Item = List.Item

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            indexData: [],
            records: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            pageInfo: { ...this.props.pageInfo }
        }
    }

    componentDidMount() {
        this.initData()
    }

    scrollToBottom = () => {
        setTimeout(() => {
            this.lv.scrollTo(0, 200*this.state.indexData.length)
        }, 0)
    }

    genSource = (pIndex = 0, pageSize) => {
        const dataArr = [];
        if(pageSize) {
            for (let i = 0; i < pageSize; i++) {
                dataArr.push(pIndex * pageSize + i)
            }
        }
        return dataArr;
    }

    distinct = (a, b) => {
        let arr = a.concat(b)
        let result = []
        let obj = {}
    
        for (let i of arr) {
            if (!obj[i._id]) {
                result.push(i)
                obj[i._id] = i
            }
        }
    
        return result
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        const { select, sort, pageSize } = this.state.pageInfo
        const options = {
            select,
            sort,
            page: 1,
            limit: pageSize
        }
        const { dispatch, queryfun } = this.props
        dispatch(queryfun({
            query: this.props.query || {},
            options
        })).then((result) => {
            const { result:{ docs, total, page }} = result
            const number = total - this.state.pageInfo.total
            if(number > 0) {
                const data = []
                for(let i = 0; i < number; i++) {
                    data.push(docs[i])
                }
                console.log('new records:', [...data, ...this.state.records])

                let dataSource = new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
                })
                const newIndex = [...this.state.indexData, ...this.genSource(page-1, number)]
                this.setState({
                    records: [...data, ...this.state.records],
                    pageInfo: {
                        ...this.state.pageInfo,
                        total
                    },
                    indexData: newIndex,
                    dataSource: dataSource.cloneWithRows(newIndex),
                    refreshing: false
                })
                this.scrollToBottom()
            } else {
                this.setState({refreshing: false})
            }
            
        })
        .catch((e)=> {
            console.log(e)
            return {}
        })
    }

    onLoad = () => {
        this.setState({refreshing: true})
        const { select, sort, page, pageSize, pages } = this.state.pageInfo
        if(page !== pages) {
            const options = {
                select,
                sort,
                page,
                limit: pageSize,
            }
            const { dispatch, queryfun } = this.props
            dispatch(queryfun({
                query: this.props.query || {},
                options
            })).then((result) => {
                console.log(result)
                const { result:{ docs, total, page, pages }} = result
                const records = this.distinct(this.state.records, docs)
                this.setState({
                    records,
                    pageInfo: {
                        ...this.state.pageInfo,
                        page: page + 1,
                        total,
                        pages
                    },
                    indexData: [...this.state.indexData, ...this.genSource(page-1, docs.length)],
                    dataSource: this.state.dataSource.cloneWithRows([...this.state.indexData, ...this.genSource(page -1, docs.length)]),
                    refreshing: false
                })
            })
            .catch((e)=> {
                console.log(e)
                return {}
            })
        }
    }

    initData = () => {
        const options = {
            select: this.state.pageInfo.select,
            sort: this.state.pageInfo.sort,
            page: this.state.pageInfo.page,
            limit: this.state.pageInfo.pageSize,
        }
        const { dispatch, queryfun } = this.props
        dispatch(queryfun({
            query: this.props.query || {},
            options
        })).then((result) => {
            console.log(result)
            const { result:{ docs, total, page, pages }} = result
            this.setState({
                records: docs,
                pageInfo: {
                    ...this.state.pageInfo,
                    page: page +1,
                    total,
                    pages
                },
                indexData: [...this.genSource(page-1, docs.length)],
                dataSource: this.state.dataSource.cloneWithRows([...this.genSource(page -1, docs.length)]),
                refreshing: false
            })
            this.scrollToBottom()
        })
        .catch((e)=> {
            console.log(e)
            return {}
        })
    }

    // getData = (options) => {
    //     const { dispatch, queryfun } = this.props
    //     dispatch(queryfun({
    //         query: this.props.query || {},
    //         options
    //     })).then((result) => {
    //         console.log(result)
    //         return result
    //     })
    //     .catch((e)=> {
    //         console.log(e)
    //         return {}
    //     })
    // }

    render() {
        const { userlogin, adminUser,  formatMessage  } = this.props

        const row = (rowData, sectionID, rowID) => {
            const dataItem = lodashGet(this.state, `records[${rowID}]`, {})
            const own = dataItem.from === userlogin._id ? true : false
            const userName = dataItem.from === userlogin._id ? lodashGet(userlogin, 'name', `${formatMessage({id: 'app.user'})}`) : lodashGet(adminUser, 'name', `${formatMessage({id: 'app.service'})}`)
            const avatar = dataItem.from === userlogin._id ? user_avatar : service_avatar
            const chart = {...dataItem, own, avatar, userName}
            return (
                <Item key={rowID} wrap={true} >
                    { own ? <Own chart={chart} /> : <Other chart={chart} /> }
                </Item>
            )
        }

        return (
            <ListView
                key="0"
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderRow={row}
                useBodyScroll={false}
                style={{
                    height: `calc(100vh - ${this.props.extraHeight}px)`,
                    boxSizing: 'border-box'
                }}
                pullToRefresh={
                    <PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onLoad}
                />}
                pageSize={this.state.pageInfo.pageSize}
        />)
    }
}

// const mapStateToProps = ({userlogin, app: { serviceadminuserlist }}, { adminuserid }) => {
//     const adminUsers = {}
//     lodashMap(serviceadminuserlist, (item) => {
//         adminUsers[item._id] = item
//     })

//     return {
//         userlogin,
//         adminUser: adminUsers[adminuserid]
//     }
// }


// export default connect(mapStateToProps, null, null, { forwardRef: true })(injectIntl(Index))
export default Index;
import React, { useState, useEffect,useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import lodashMap from 'lodash.map'
import { NavBar, Icon, Button } from 'antd-mobile'
import Container from '../Controls/Container'
import Content from '../Controls/ContentFixed'
import { injectIntl, FormattedMessage } from 'react-intl'
import { callthen } from '../../sagas/pagination'
import { page_getmessages_request, page_getmessages_result, createmessage_request,createmessage_result } from '../../actions'
import Chart from './chart'
import './index.less'

const useInterval = (callback, delay)=> {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

const Index = ({dispatch, history, serviceadminuserlist, extraHeight, adminuserid, userlogin, intl: { formatMessage }}) => {
    const [ message, setMessage ] = useState('')
    const [ isSend, setIsSend ] = useState(false)
    let chat = React.createRef()

    const handleSend = () => {
        if(message.trim() !== '') {
            const newMessage = {
                adminuserid,
                created_at: moment(),
                from: userlogin._id,
                to: adminuserid,
                type: 'text',
                content: message
            }
            dispatch(callthen(createmessage_request,createmessage_result,newMessage))
            .then((result) => {
                console.log(result);
                setMessage('')
                setIsSend(true)
                // console.log('chat:', chat.current)
                // chat.current.onRefresh()
            }).catch((e)=>{
                console.log(e)
            })
        }
    }

    useEffect(() => {
        console.log('chat:', chat.current)
        if(isSend){
            chat.current.onRefresh()
        }
        setIsSend(false)
    }, [isSend])

    useInterval(() => {
        chat.current.onRefresh();
    }, 10*1000);

    return (
        <Container className="contact-chat-container">
            <NavBar
                mode="dark"
                icon={<Icon type="left" size="lg" onClick={() => history.goBack()} />}
                leftContent={<FormattedMessage id="app.customerservice" />}
            ></NavBar>
            <Content className="content" style={{backgroundColor: '#eee'}}>
                <Chart pageInfo={{
                        select:{},
                        sort: { created_at: -1 },
                        page: 1,
                        pageSize: 20,
                        total: 20,
                        pages: 2,
                    }}
                    formatMessage={formatMessage}
                    dispatch={dispatch}
                    userlogin={userlogin}
                    serviceadminuserlist={serviceadminuserlist}
                    ref={chat}
                    adminuserid={adminuserid}
                    extraHeight={extraHeight}
                    query={{
                        "userid" :userlogin._id,
                        "adminuserid" : adminuserid,
                    }}
                    queryfun={(payload)=>{
                        return callthen(page_getmessages_request, page_getmessages_result, payload);
                    }} 
                />
                <div className="action">
                    <div className="message-input">
                        <input 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value) }
                            placeholder={formatMessage({id: 'my.chat.ask'})}
                        />
                    </div>
                    <div className="message-action">
                        <Button size="small" type="primary" onClick={handleSend}><FormattedMessage id="form.send" /></Button>
                    </div>
                </div>
            </Content>
        </Container>
    )
}

const mapStateToProps = ({app, userlogin}, props) => {
    const { match: { params: { adminuserid }}} = props
    const adminUsers = {}
    const {serviceadminuserlist} = app;
    lodashMap(serviceadminuserlist, (item) => {
        adminUsers[item._id] = item
    })
    return {
        locale: app.locale,
        extraHeight: app.statusbar + 89,
        adminuserid,
        userlogin,
        serviceadminuserlist
    }
}

export default connect(mapStateToProps)(withRouter(injectIntl(Index)))
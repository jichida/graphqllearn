import { useState, useEffect } from 'react';
// import _ from 'lodash';
// import moment from 'moment';
import {callbacksimulate,sendmessage,start,stop} from './hook';

const senddevicecmd = (cmd,hexpayload)=>{
  const json =
  {
    "cmd":cmd,
    "bodyhex":hexpayload
  };
  sendmessage(JSON.stringify(json));
}

const useHookData = ()=>{
  const [trigger,setTrigger] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [realtimedata, setRealtimedata] = useState({});

  useEffect(() => {
     if(trigger){//只初始化一次
       start();
       callbacksimulate((result)=>{
         console.log(result);
         if(result.type === 'CONNECT_SUCCESS'){
           setConnected(true);
         }
         if(result.type === 'COMMON_ERR'){
           setConnected(false);
         }
         if(result.type === 'RECVDATA_SUCCESS'){
           // debugger;
           if(result.payload.cmd === 0x1c){
             setRealtimedata({...result.payload.data});
           }
         }
       });
     }
     return ()=>{
       stop();
     }
  }, [trigger]);

  return {setTrigger,isConnected,realtimedata};
}

/*
使用方法
const {setTrigger,isConnected,realtimedata} = useHookData();
1、点击Connect按钮,执行setTrigger
2、根据‘isConnected’ 来显示状态，如果isConnected为true,执行Next Step
3、将数据直接用realtimedata显示
=================
4、发送命令执行：senddevicecmd
*/
export {useHookData,senddevicecmd};

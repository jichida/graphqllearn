import { useState, useEffect } from 'react';
import {XviewSdk} from '@xiaheng/xviewsdk';

const useStatusBarHeight = ()=>{
  //默认20
  const [statusbarheight, setStatusbarheight] = useState({});

  useEffect(() => {
    // window["statusBarHeight"] = (result)=>{
    //   if(typeof result === 'string'){
    //     result = JSON.parse(result);
    //   }
    //   try{
    //     // alert(`接受到callbackConnectedWifiSSID回调,参数:${JSON.stringify(result)}`);
    //     setStatusbarheight(result);
    //   }
    //   catch(e){
    //     alert(e);
    //   }
    //
    // };
    //
    // const data = {
    //   callback: "statusBarHeight"
    // };
    try{
      XviewSdk.getInstance()
            .ComponentApp.GetStatusBarHeight()
            .callNativeXView()
            .then((result) => {
                console.log(`setStatusbarheight===>${JSON.stringify(result)}`);
               setStatusbarheight(result);
            }).catch((e)=>{
              console.log(e);
            })
      // alert(`调用getStatusBarHeight,调用代码为:window["xview"]["getStatusBarHeight"](JSON.stringify({})),参数:${JSON.stringify({})}`);
      // callxview("getStatusBarHeight",data);
    }
    catch(e){
      alert(e);
    }
  },[]);

  return statusbarheight;

};

export {useStatusBarHeight};

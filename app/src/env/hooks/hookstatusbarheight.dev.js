import { useState, useEffect } from 'react';

const statusBarHeight = (callbackfn)=>{
  callbackfn({"data":{"statusBarHeight":24,"statusBarHeightPx":63},"code":0,"message":"获取状态栏高度,如果值为0 自己设置一个默认值"});
}

const useStatusBarHeight = ()=>{
  //默认20
  const [statusbarheight, setStatusbarheight] = useState({});

  useEffect(() => {
    setTimeout(()=>{
      statusBarHeight((result)=>{
        setStatusbarheight(result);
      });

    },0);
  },[]);

  return statusbarheight;

};

export {useStatusBarHeight};

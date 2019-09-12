import {XviewSdk} from '@xiaheng/xviewsdk';
// import {xviewfun} from './xviewfun';
export const scanbarcode=(fncallback)=>{
  let scanConfig = {
      needPhoto: false,//是否需要相册    默认true
      needExposure: false,//是否需要开灯 默认false
      title: "扫一扫"// 默认       扫一扫
    }
  alert(`开始调用扫一扫`);
  try{
    XviewSdk.getInstance()
        .ComponentQR.Scan(scanConfig)
        .callNativeXView()
        .then(_result => {
          fncallback(_result);
          // alert(JSON.stringify(_result));
        });
  }
  catch(e){
    alert(JSON.stringify(e));
  }

  // // const json = {
  // //   "callback": "callbackfn_scanbarcode"
  // // };
  // window.callbackfn_scanbarcode = fncallback;
  // // if(!!window.xview){
  // //   window.xview.xviewScanBarcode(JSON.stringify(json));
  // // }
  // const xviewData = {
  //   componentName:"ComponentScanQR",
  //   action:"scan",
  //   callback:"callbackfn_scanbarcode"
  // }
  //
  // xviewfun(JSON.stringify(xviewData));

};

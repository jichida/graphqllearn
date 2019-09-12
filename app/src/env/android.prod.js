// import store from './store';
import {XviewSdk} from '@xiaheng/xviewsdk';
// import { goBack  } from 'connected-react-router';//https://github.com/reactjs/react-router-redux
let handlerbackfn;

export const exitAndroidApp=()=>{
  console.log(`exit app`);

  window.setTimeout(()=>{
    try{
      // alert('exit app');
      // xview.exitApp();
      XviewSdk.getInstance()
                .ComponentApp.Exit()
                .callNativeXView()
                .then(_result => {});
    }
    catch(e){
      alert(JSON.stringify(e));
    }
  },0);

}

export const setbackhandler=(fn)=>{
  let oldhandlerbackfn = handlerbackfn;
  handlerbackfn = fn;
  return oldhandlerbackfn;
}


export const removebackhandler=()=>{
  handlerbackfn = undefined;
}

export const registerandroid=()=>{
  try{
    XviewSdk.getInstance().ComponentApp.OnBack(() => {
          //alert("window.webBack");
        if(!!handlerbackfn){
          handlerbackfn();
        }
        else{
          // store.dispatch(goBack());
        }

    });
  }
  catch(e){
    alert(JSON.stringify(e));
  }
}

import {XviewSdk} from '@xiaheng/xviewsdk';
export const jsCallPhone=(phonenumber)=>{
    try{
      let data = {
        tel: phonenumber
      };
      XviewSdk.getInstance()
        .ComponentMobile.CallPhone(data)
        .callNativeXView()
        .then(_result => {

        });
    }
    catch(e){
      // alert(JSON.stringify(e));
    }
}

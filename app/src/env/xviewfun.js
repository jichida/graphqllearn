
const callxview = (method,data)=>{
  window.setTimeout(()=>{
    if (!!window["xview"]) {
      if(!!window["xview"][`${method}`]){
        if(!!data){
          window["xview"][`${method}`](JSON.stringify(data));
        }
        else{
          window["xview"][`${method}`]();
        }
      }
    } else if (!!window["webkit"]) {
      if(!!window["webkit"].messageHandlers[`${method}`]){
        if(!!data){
          window["webkit"].messageHandlers[`${method}`].postMessage(JSON.stringify(data));
        }
        else{
          window["webkit"].messageHandlers[`${method}`].postMessage();
        }
      }
    }
  },0)
}


const xviewfun = (xviewdata)=>{
  window.setTimeout(()=>{
    if(!!window["xview"]){
       window["xview"].callNativeXView(xviewdata);
    }
    if(!!window["webkit"]){
       window["webkit"].messageHandlers["callNativeXView"].postMessage(xviewdata);
    }
  },0)
}

export {xviewfun,callxview};

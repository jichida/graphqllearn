const islocalhost = false;
const serverurl = islocalhost?'http://localhost:4901':'http://api.cloudclubonline.com';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    issimulate:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.0.1(build0903)',
    sendlocationinterval:20000,
    softmode:'app'
};


export default config;

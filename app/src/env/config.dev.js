const islocalhost = false;

const httplink = islocalhost?'http://localhost:4901':'http://yc.i2u.top:8000/graphql'
const wslink = islocalhost?'http://localhost:4901':'ws://yc.i2u.top:8000/graphql'

const serverurl = islocalhost?'http://localhost:4901':'http://api.cloudclubonline.com';
const serverurlrestful = islocalhost?`${serverurl}/api`:`${serverurl}/api`;
const wspath = islocalhost?'/socket.io':'/socket.io';

let config = {
    httplink,
    wslink,
    issimulate:false,
    serverurlrestful,
    serverurl:`${serverurl}`,
    wspath:`${wspath}`,
    requesttimeout:5000,
    appversion:'1.0.0(build0903)',
    sendlocationinterval:20000,
    softmode:'app'
}

export default config;

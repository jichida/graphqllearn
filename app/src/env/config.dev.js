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
    appversion:'1.0.1(build0903)',
    sendlocationinterval:20000,
    softmode:'app'
};

export const initState = {
    locale: 'zh-cn',
    maintabIndex: 0,
    statusbar: 22,
}

export const resolvers = {}

export const typeDefs = {}


export default config;

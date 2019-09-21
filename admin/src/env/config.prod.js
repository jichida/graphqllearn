let islocalhost = false;
let serverurl = islocalhost?'http://localhost:4001':'http://asm.i2u.top:4001';

export default {
    restserverurl:`${serverurl}/adminapi/v1`,
    adminauthserverurl:`${serverurl}/adminauth/v1`,
    admincustomapi:`${serverurl}/admincustomapi/v1`,
    serverurl:`${serverurl}`,
    appversion:'1.1.1(build0801)',
    shopid:'5bd12be97ed9b65f0fff9edb'
};

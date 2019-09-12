// import NodeRSA from 'node-rsa';
import config from '../env/config';
let generatersapair,rsaencrpt,rsadecrypt;

import('node-rsa')
.then(({default: NodeRSA}) => {
 generatersapair = ()=>{
    const newkey = new NodeRSA({b: 1024});
    newkey.setOptions({encryptionScheme: 'pkcs1'});	//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
    const public_key = newkey.exportKey('pkcs8-public');//公钥,
    const private_key = newkey.exportKey('pkcs8-private'); //私钥
    // console.log({a:public_key,b:private_key});
    return {public_key,private_key};
  };
  
   rsaencrpt = (rawstring,public_key)=>{
    const pubkey = new NodeRSA(public_key);
    pubkey.setOptions({encryptionScheme: 'pkcs1'});//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
    const encrypted = pubkey.encrypt(rawstring,'base64');
    return encrypted;
  }
  
    rsadecrypt = (encryptedstring,private_key)=>{
    const prikey = new NodeRSA(private_key);
    prikey.setOptions({encryptionScheme: 'pkcs1'});//因为jsencrypt自身使用的是pkcs1加密方案,只有从后台改咯
    const decrypted = prikey.decrypt(encryptedstring, 'utf8');
    return decrypted;
  }

  console.log(`version:${config.appversion}`)

  const clientpairkey = generatersapair();
  config.client_privatekey = clientpairkey.private_key;
  config.client_publickey = clientpairkey.public_key;
}).catch((e)=>{
  console.log(e);
})




export {generatersapair,rsaencrpt,rsadecrypt};

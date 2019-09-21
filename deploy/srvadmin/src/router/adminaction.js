// import DBModels from './db.js';
import pwd from '../util/pwd';


const preaction = async (actionname,collectionname,doc)=>{
  ////console.log(`preaction doc:${JSON.stringify(doc)}`);
  let retdoc = doc;
  if(actionname === 'save' && collectionname === 'user'){
    //新建用户,hashpassword
    retdoc.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    let passwordsalt = pwd.getsalt();
    const  passwordhash = await pwd.hashPasswordAsync(retdoc.password,passwordsalt);
    retdoc.passwordsalt = passwordsalt;
    retdoc.passwordhash = passwordhash;
  }
  return retdoc;
};

const postaction = async (actionname,collectionname,doc,req)=>{
  let retdoc = doc;
  return retdoc;
};

export default {preaction,postaction};

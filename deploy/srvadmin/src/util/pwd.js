import crypto  from 'crypto';
import uuid from 'uuid';
import util from 'util';
// import promisify from 'es6-promisify';

const pbkdf2 = util.promisify(crypto.pbkdf2);

const hashPasswordAsync = async (password,salt)=>{
  // We use pbkdf2 to hash and iterate 10k times by default
  const iterations = 10000;
  const keyLen = 64; // 64 bit.
  ////console.log("password is :" + password);
 // password = new Buffer(password, 'binary');
 try{
   const result = await pbkdf2(password, salt, iterations, keyLen,'sha1');
   return result.toString('hex');
 }
 catch(e){
   throw e;
 }

}

const getsalt = ()=>{
    return uuid.v4();
}

const checkPassword =async  (password,passwordsalt,checkedpassword)=>{
  ////console.log(`checkPassword:${checkedpassword},passwordsalt:${passwordsalt}`);
  const passwordHash = await hashPasswordAsync(checkedpassword, passwordsalt);
  return passwordHash == password;
}


export {hashPasswordAsync,getsalt,checkPassword};


import jwt from 'jsonwebtoken';
import config from '../config';
import pwd from '../util/pwd.js';
import DBModels from '../db/index.js';

const loginuserexptime = config.get('app:loginuserexptime');
const secretkey = `${config.get('app:secretkey')}` ;

const adminauth = async (req,res)=>{
  const actiondata =   req.body;
  console.log("actiondata=>" + JSON.stringify(actiondata));

  try{
    const userModel = DBModels.UserAdminModel;
    const user = await userModel.findOne({ username: actiondata.username }).lean();
    if(!user){
      res.status(200).json({
        loginsuccess:false,
        err:'用户找不到'
      });
      return;
    }
    const isloginsuccess = await  pwd.checkPassword(user.passwordhash,user.passwordsalt,actiondata.password);
    if(isloginsuccess){
      const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + loginuserexptime,
              _id:user._id,
              usertype:'adminuser',
          },secretkey, {});
      res.status(200).json({
        loginsuccess:true,
        token:token
      });
    }
    else{
      res.status(200).json({
        loginsuccess:false,
          err:'用户密码错误'
      });
    }
  }
  catch(e){
    console.log(e);
    res.status(200).json({
      loginsuccess:false,
        err:'服务器内部错误'
    });
  }
 

}

export default adminauth;

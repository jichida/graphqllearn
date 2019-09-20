const _ = require('lodash');
const DBModels = require('.');
const mongoose = require('mongoose');

const pwd = require('../util/pwd');


const initDB = ()=>{


  //createadmin
  const passwordsalt = pwd.getsalt();
  pwd.hashPassword('admin',passwordsalt,(err,passwordhash)=>{
    if(!err){
      adminuser = {
        username:'admin',
        passwordsalt,
        passwordhash,
      };
      const userModel = DBModels.UserAdminModel;
      userModel.findOneAndUpdate({_id:mongoose.Types.ObjectId("5bde76f8983d72329d3b530b")}, {$setOnInsert:adminuser},{new: true,upsert:true},(err,result)=>{
      });
    }
  });

}

export default initDB;

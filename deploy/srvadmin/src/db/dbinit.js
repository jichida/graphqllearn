import _ from 'lodash';
import DBModels from './index';
import mongoose from 'mongoose';
import pwd  from '../util/pwd';

const initDB = async ()=>{

  const passwordsalt = pwd.getsalt();
  const passwordhash = await pwd.hashPasswordAsync('admin',passwordsalt);
  const adminuser = {
    username:'admin',
    passwordsalt,
    passwordhash,
  };
  const userModel = DBModels.UserAdminModel;
  await userModel.findOneAndUpdate({_id:mongoose.Types.ObjectId("5bde76f8983d72329d3b530b")}, {$setOnInsert:adminuser},{new: true,upsert:true});

}

export default initDB;

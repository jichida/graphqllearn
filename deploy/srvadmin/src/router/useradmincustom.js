// import DBModels from '../db/index.js';
import mongoose from 'mongoose';
import dbs from './adminroute.js';
import middlewareauth from './middlewareauth.js';
// import pwd from '../util/pwd.js';

const startmodule = (app)=>{
  app.post('/findone/:resourcename',async (req,res)=>{
    //console.log("findone:" + req.params.resourcename);
    try{
      const schmodel = dbs[req.params.resourcename];
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      const result = await dbModel.findOne({}).lean();
      res.status(200).json(result);
    }
    catch(e){
      console.log(e);
      res.status(404).json({});
    }

  });


  app.post('/adminapi/resetuserpassword',middlewareauth,(req,res)=>{
    try{

    }
    catch(e){

    }
  });

  //   let actiondata =   req.body;
  //   if(typeof actiondata.userid === "string"){
  //      actiondata.userid = mongoose.Types.ObjectId(actiondata.userid);
  //   }
  //   let userModel = DBModels.UserModel;
  //   userModel.findOne({ _id: actiondata.userid }, (err, user)=> {
  //     if (!!err) {
  //       res.status(200).json({
  //         result:false,
  //         msg:'内部错误'
  //       });
  //       return;
  //     }
  //     if (!user) {
  //       res.status(200).json({
  //         result:false,
  //         msg:'找不到用户'
  //       });
  //       return;
  //     }
  //     let passwordsalt = pwd.getsalt();
  //     pwd.hashPassword(actiondata.password,passwordsalt,(err,passwordhash)=>{
  //       let retdoc = {
  //         passwordsalt:passwordsalt,
  //         passwordhash:passwordhash
  //       };

  //       userModel.findByIdAndUpdate(user._id,{$set:retdoc},(err,result)=>{
  //         res.status(200).json({
  //           result:true,
  //           msg:'修改密码成功'
  //         });
  //       });
  //     });
  //   });
  // });

};

export default startmodule;

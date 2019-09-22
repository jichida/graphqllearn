import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin, isAuthenticated } from './authorization';
import config from '../config';
// import moment from 'moment';
import Chance from 'chance';

const chance = new Chance();

const createToken = async (user, secret, expiresIn) => {
  const { _id, phonenumber, role } = user;
  return await jwt.sign({ _id, phonenumber, role }, secret, {
    expiresIn,
  });
};

export default  {
  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findById(me._id);
    },
  },

  Mutation: {
    signin: async (
      parent,
      { phonenumber, authcode },
      { models,secret,globalUserauth },
    ) => {
          //检查验证码
      if(!globalUserauth[phonenumber]){
        return {
          islogin:false,
          msg:'请先发送验证码'
        }
      }

      if(globalUserauth[phonenumber].authcode !== authcode){
        return {
          islogin:false,
          msg:'验证码错误'
        }
      }
      const user = await models.User.findOneAndUpdate({phonenumber},{$set:{
        lastlogin_at:new Date()
      }},{new: true,upsert:true});
      const token = createToken(user, secret, '30m');
      return {
        islogin:true, 
        token:token,
        loginuserinfo:{
          _id:user._id,
          phonenumber:user.phonenumber
        }
       };
    },

    sendauth: async (
      parent,
      { phonenumber, authtype },
      { globalUserauth },
    ) => {
      const nowDate = new Date();
      if(!!globalUserauth[phonenumber]){
          const minAgo = new Date(nowDate.getTime() - 1000 * 30);
          if(minAgo < globalUserauth[phonenumber].updated_at){
              return {
                issuc:false,
                msg:'请勿频繁发送验证码'
              };
          }

          let min2Ago = new Date(nowDate.getTime() - 1000 * config.get('app:authexptime'));
          if(min2Ago > globalUserauth[phonenumber].updated_at){
              //resend
              globalUserauth[phonenumber].authcode = chance.string({length: 4,pool: '0123456789'});
              globalUserauth[phonenumber].updated_at = nowDate;
          }
      }
      else {
          globalUserauth[phonenumber] = {};
          globalUserauth[phonenumber].authcode = chance.string({length: 4, pool: '0123456789'});
          globalUserauth[phonenumber].updated_at = nowDate;
      }
      const message = `phonenumber is :${phonenumber},验证码为:${globalUserauth[phonenumber].authcode},请在${config.get('app:authexptime')}秒内登录,过期无效!`;
      // debug(message);
      //发送邮件
      // const jobparam = {
      //   cmd:actiondata.typestring || 'register',
      //   to:userAuth.email,
      //   payload:{authcode:`${globalUserauth[userAuth.email].authcode}`}
      // };
      // await job.createmailjob(ctx,jobparam);
      return {
        issuc:true,
        msg:message
      };
    },
    signinwithtoken:async (
      parent,
      { token, tokentype },
      { models,secret,globalUserauth },
    ) => {
      return {
        _id:'aaa',
        phonenumber:'`5961125167'
      }
    },

    fillprofile: combineResolvers(
      isAuthenticated,
      async (parent, { username }, { models, me }) => {
        const user = await models.User.findByIdAndUpdate(
          me.id,
          { $set: {username}},
          { new: true },
        );
        return user;
      },
    ),
  },
};
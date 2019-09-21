import mongoose from 'mongoose';
// mongoose.Promise = global.Promise;
// const Schema       = mongoose.Schema;
// const mongoosePaginate = require('mongoose-paginate');

// //留言板
// const MessageSchema = new Schema({
//     userid:{type: Schema.Types.ObjectId,ref: 'User'},//APP用户id
//     adminuserid:{type: Schema.Types.ObjectId,ref: 'User'},//后台用户id
//     created_at: { type: Date, default: Date.now, index: true },//新建时间app不用传，后台自动生成
//     from: {type: Schema.Types.ObjectId,ref: 'User'},//发送者id
//     to: {type: Schema.Types.ObjectId,ref: 'User'},//接受者id
//     type: {type: String,enum: ['text', 'image', 'code', 'invite', 'system'],default: 'text'},//类型,默认文本
//     content: {type: String,default: ''}//内容
// });
// MessageSchema.plugin(mongoosePaginate);
// const Message = mongoose.model('Message', MessageSchema);


// module.exports =  Message;


const messageSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true,
      },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
      timestamps: true,
    },
  );
  
  const Message = mongoose.model('Message', messageSchema);
  
 export default Message;
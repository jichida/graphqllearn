import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
//==============商铺==============
//好友关系
const ChatfriendSchema = new Schema({
    bid:{ type: Schema.Types.ObjectId, ref: 'CShop' },
    cid:{ type: Schema.Types.ObjectId, ref: 'User' },
    lastmsg_at: { type: Date, default:new Date()},//最后发送消息时间
    created_at: { type: Date, default:new Date()},//建立时间
});
ChatfriendSchema.plugin(mongoosePaginate);
const ChatfriendModel  = mongoose.model('Chatfriend',  ChatfriendSchema);


export default {
    ChatfriendSchema,
    ChatfriendModel,
};
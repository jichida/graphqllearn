import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
// 回复自己帖子？
// 点赞自己帖子?
// 或者回复自己评论？
// 点赞自己评论?
//publish:自己帖子id,自己帖子评论id
const UserAlertTopicSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' }, //提醒谁看
    type:String,//topiclove,topiccomment,commentlove,commentcomment,
    topicself:{ type: Schema.Types.ObjectId, ref: 'Topic' },//针对哪条帖子
    commentself:{ type: Schema.Types.ObjectId, ref: 'Comment' },//针对那条评论
    comment:{ type: Schema.Types.ObjectId, ref: 'Comment' },//新发的评论
    userfrom:{ type: Schema.Types.ObjectId, ref: 'User' },//来自用户
    created_at: { type: Date, default:new Date()},
    isreaded:{type:Schema.Types.Boolean,default:false}//是否已读
});
UserAlertTopicSchema.plugin(mongoosePaginate);
const UserAlertTopicModel  = mongoose.model('UserAlertTopic',  UserAlertTopicSchema);

const TopicSchema = new Schema({
  creator:{ type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default:new Date()},
  product:{ type: Schema.Types.ObjectId, ref: 'Product' },//帖子必须关联产品
  order:{ type: Schema.Types.ObjectId, ref: 'Order' },//发帖者关联订单
  title:String,
  picurl:[String],
  loves:[String],
  comments:[{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  isvisiable:{ type: Boolean, default: true },//评论是否显示
});
TopicSchema.plugin(mongoosePaginate);
const TopicModel  = mongoose.model('Topic',  TopicSchema);

const CommentSchema = new Schema({
  creator:{ type: Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default:new Date()},
  product:{ type: Schema.Types.ObjectId, ref: 'Product' },//帖子必须关联产品
  order:{ type: Schema.Types.ObjectId, ref: 'Order' },//发帖者关联订单
  title:String,
  loves:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' , default: []}],
  isvisiable:{ type: Boolean, default: true },
});
CommentSchema.plugin(mongoosePaginate);
const CommentModel  = mongoose.model('Comment',  CommentSchema);



export default {
  UserAlertTopicSchema,
  TopicSchema,
  CommentSchema,


  UserAlertTopicModel,
  TopicModel,
  CommentModel,
};

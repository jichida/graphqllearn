import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
//系统设置
const SystemConfigSchema = new Schema({
    pointlimitperday:{ type: Schema.Types.Number,default: 1000 },
    expressapiurl:{ type:  Schema.Types.String,default:`http://poll.kuaidi100.com/poll/query.do`},
    expressapicustomer:{ type:  Schema.Types.String,default:`FE88C77449846749F9A80BC5D466984D`},
    expressapikey:{ type:  Schema.Types.String,default:`piOqvhjg755`},
});
SystemConfigSchema.plugin(mongoosePaginate);
const SystemConfigModel  = mongoose.model('SystemConfig',  SystemConfigSchema);
//意见反馈
const FeedbackSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    feedbacktxt:String,
    picurl:[String],
    created_at: { type: Date, default:new Date()},
});
FeedbackSchema.plugin(mongoosePaginate);
const FeedbackModel  = mongoose.model('Feedback',  FeedbackSchema);


const NotifyMessageSchema = new Schema({
    messagetype:String,//all,app
    touserid:String,
    messagetitle:String,
    messagecontent:String,
    created_at:{ type: Date, default:new Date()},
});
NotifyMessageSchema.plugin(mongoosePaginate);
const NotifyMessageModel =mongoose.model('notifymessage',  NotifyMessageSchema);


const AboutSchema = new Schema({
    keyname:String,
    title:String,
    desc:String,
  });
AboutSchema.plugin(mongoosePaginate);
const AboutModel  = mongoose.model('About',  AboutSchema);

//动态管理
const NewsSchema = new Schema({
    textname:String,
    productid:{ type: Schema.Types.ObjectId, ref: 'Product' },
    created_at: { type: Date, default:new Date()},
    isenabled:Boolean
});
NewsSchema.plugin(mongoosePaginate);
const NewsModel  = mongoose.model('News',  NewsSchema);

export default {
    SystemConfigSchema,
    FeedbackSchema,
    NotifyMessageSchema,
    AboutSchema,
    NewsSchema,
  
  
    SystemConfigModel,
    FeedbackModel,
    NotifyMessageModel,
    AboutModel,
    NewsModel,
  };

  

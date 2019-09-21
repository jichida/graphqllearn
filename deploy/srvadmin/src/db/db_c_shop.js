import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;

//==============商铺==============
//
const CShopSchema = new Schema({
    username:String,//登录名
    passwordhash: String,
    passwordsalt: String,
    rtoken:String,
    name:String,//店铺名
    picurl:String,//店铺logo
    truename:String,//真实姓名
    nickname:String,//昵称
    contact_way:String,//联系方式
    province_name:String,//省
    city_name:String,//市
    district_name:String,//区
    detail_address:String,//详细地址
    shoplocation: {//经度,纬度
        type: [Number],
        index: '2dsphere'
    },
    px:Number,//排序值
    typeofwork:{ type: Schema.Types.ObjectId, ref: 'typeofwork' },
    is_enabled:{ type: Boolean, default:true},//是否营业
    created_at: { type: Date, default:new Date()},//注册时间
    approvalrejectseason:{type:String,default:''},
    approvalstatus:{type:String,default:'未递交'},//未递交/待审核/审核中/已审核/已拒绝
});
CShopSchema.plugin(mongoosePaginate);
const CShopModel  = mongoose.model('CShop',  CShopSchema);
/*
获取硬件数据(地理位置)->tags->匹配服务
*/
const RecommendHistorySchema = new Schema({
    productids:[{ type: Schema.Types.ObjectId, ref: 'Product' , default: [] }],//推荐的产品列表
    tags:[{ type: Schema.Types.ObjectId, ref: 'Tag', default: [] }],//标签
    data:String,//测量的数据
    datarawhex:String,//测量的原始数据
    deviceid:{ type: Schema.Types.ObjectId, ref: 'Device' },//设备ID
    userid:{ type: Schema.Types.ObjectId, ref: 'User' },//用户ID
    created_at: { type: Date, default:new Date()},//推荐时间
});
RecommendHistorySchema.plugin(mongoosePaginate);
const RecommendHistoryModel  = mongoose.model('RecommendHistory',  RecommendHistorySchema);


const TypeofworkSchema = new Schema({
    name:String,//工种名
    desc:String,//工种描述
    tags:[{ type: Schema.Types.ObjectId, ref: 'Tag', default: [] }],//标签
    is_enabled:{ type: Boolean, default:true},//是否启用
});
TypeofworkSchema.plugin(mongoosePaginate);
const TypeofworkModel  = mongoose.model('Typeofwork',  TypeofworkSchema);

//==============标签==============
//
const TagSchema = new Schema({
    name:String,
    devicetypes:[{ type: Schema.Types.ObjectId, ref: 'Devicetype', default: [] }], //体脂秤、血压仪
    is_enabled:{ type: Boolean, default:true},//是否启用
});
TagSchema.plugin(mongoosePaginate);
const TagModel  = mongoose.model('Tag',  TagSchema);

//商品：商品名／图片／市场价／现价／摘要/图文详情／是否上架／所在类别／重量／库存／销量
const CProductSchema = new Schema({
    name:String,//商品名
    cshopid:{ type: Schema.Types.ObjectId, ref: 'CShop' },//店铺ID
    px:Number,//排序值
    picurl:String,//主图
    picurls:[],//图片列表
    picurldetails:[],//图文详情
    keywords:[],//搜索关键字
    price:Number,//价格
    price_original:Number,//原价
    price_activity:Number,//活动价
    brief:String,//摘要
    weight:Number,//重量
    is_free_postage:{ type: Boolean, default:true},//是否包邮
    is_recommended:{ type: Boolean, default:true},//是否推荐
    is_hot:{ type: Boolean, default:true},//是否爆品
    is_shelve:{ type: Boolean, default:true},//是否上架
    inventory:{ type: Number, default:0},//库存
    sales_volume:{ type: Number, default:0},//销量
    publishdate: { type: Date, default:new Date()},
    created_at: { type: Date, default:new Date()},
});
CProductSchema.plugin(mongoosePaginate);
const CProductModel  = mongoose.model('CProduct',  CProductSchema);
//==============数据-》设备规则-》标签==============
//
// const TagRulesSchema = new Schema({
//     value:String,//每种设备自定义一个字符串，根据结果匹配唯一
//     devicetypes:String, //体脂秤、血压仪
//
// });
// TagRulesSchema.plugin(mongoosePaginate);
// const TagRule  = mongoose.model('TagRule',  TagRulesSchema);

//提现申请
let CWithdrawcashapplySchema =  new Schema({
    shopid:{ type: Schema.Types.ObjectId, ref: 'CShop' },
    truename:String,//真实姓名
    bankaccount:String,//银行账号
    bankname:String,//银行名称
    cashmoney:Number,//提现金额
    status:String,//未验证／已验证／已支付
    created_at: Date,
});
CWithdrawcashapplySchema.plugin(mongoosePaginate);
let CWithdrawcashapplyModel  = mongoose.model('cwithdrawcashapply',  CWithdrawcashapplySchema);

export default {
    RecommendHistorySchema,
    CShopSchema,
    TypeofworkSchema,
    TagSchema,
    CWithdrawcashapplySchema,
    CProductSchema,

    RecommendHistoryModel,
    CShopModel,
    TagModel,
    TypeofworkModel,
    CWithdrawcashapplyModel,
    CProductModel,
};
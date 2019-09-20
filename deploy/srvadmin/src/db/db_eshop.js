import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
//=============运费=============
const PostageTemplateSchema =  new Schema({
    eshopid:{ type: Schema.Types.ObjectId, ref: 'EShop' },//店铺ID
    name:String,
    desc:String,
    detail:[{
      free4fee:Number,
      first:Number,
      first_money:Number,
      second:Number,
      second_money:Number,
      province_oids:[{ type: Schema.Types.ObjectId, ref: 'AddressConst' }]
    }]
});
PostageTemplateSchema.plugin(mongoosePaginate);
const PostageTemplateModel  = mongoose.model('PostageTemplate',  PostageTemplateSchema);

//==============服务供应商==============
const EShopSchema = new Schema({
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
    created_at: { type: Date, default:new Date()},//注册时间
});
EShopSchema.plugin(mongoosePaginate);
const EShopModel  = mongoose.model('EShop',  EShopSchema);

//==============商城==============
//广告图:图片／排序／类型（首页图片）／是否显示
const BannerSchema = new Schema({
    name:String,
    picurl:String,
    sortflag:Number,
    type:String,
    eproductid:{ type: Schema.Types.ObjectId, ref: 'EProduct' },
    isenabled:{ type: Boolean, default:true},
});
BannerSchema.plugin(mongoosePaginate);
const BannerModel  = mongoose.model('Banner',  BannerSchema);
//商品：商品名／图片／市场价／现价／摘要/图文详情／是否上架／所在类别／重量／库存／销量
const EProductSchema = new Schema({
    name:String,//商品名
    eshopid:{ type: Schema.Types.ObjectId, ref: 'EShop' },//店铺ID
    px:Number,//排序值
    picurl:String,//主图
    picurls:[],//图片列表
    picurldetails:[],//图文详情
    keywords:[],//搜索关键字
    price:Number,//价格
    price_original:Number,//原价
    price_activity:Number,//活动价
    brief:String,//摘要
    ecategoryid:{ type: Schema.Types.ObjectId, ref: 'ECategory' },//分类
    postagetemplateid:{ type: Schema.Types.ObjectId, ref: 'PostageTemplate' },//运费模板id
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
EProductSchema.plugin(mongoosePaginate);
const EProductModel  = mongoose.model('EProduct',  EProductSchema);
//类别：类别名／图片／显示标志／排序字段
const ECategorySchema = new Schema({
    name:String,
    picurl:String,
    eshopid:{ type: Schema.Types.ObjectId, ref: 'EShop' },//店铺ID
    eshoptype:String,//hardware/point
    showflag:Number,
    sortflag:Number,
    parent_id:{ type: Schema.Types.ObjectId, ref: 'ECategory' },
    created_at: { type: Date, default:new Date()},
    isenabled:{ type: Boolean, default:true},
});
ECategorySchema.plugin(mongoosePaginate);
const ECategoryModel  = mongoose.model('ECategory',  ECategorySchema);

//我的优惠券：优惠券id,会员id,状态（0未使用 1已使用2已失效）
const EMyCouponSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    name:String,    //优惠券名
    pricecondition:Number,//价格条件
    pricediscount:Number,//抵扣金额
    expdate: Date,// 过期时间
    usestatus:{ type: Schema.Types.String,default: '未使用'},// //未使用／已使用／已失效
    fromorder:{ type: Schema.Types.ObjectId, ref: 'Order' },
    created_at: { type: Date, default:new Date()},
    used_at:Date,
});
EMyCouponSchema.plugin(mongoosePaginate);
const EMyCouponModel  = mongoose.model('EMyCoupon',  EMyCouponSchema);

//我的钱包之明细记录
//评价：商品ID／用户id/评价内容／评价星级／关联订单
const EProductcommentSchema = new Schema({
    eproductid:{ type: Schema.Types.ObjectId, ref: 'EProduct' },
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    eorderid:{ type: Schema.Types.ObjectId, ref: 'EOrder' },
    ratenum:Number,
    commenttxt:String,
    created_at: { type: Date, default:new Date()},
    isshow:Boolean
});
EProductcommentSchema.plugin(mongoosePaginate);
const EProductcommentModel  = mongoose.model('EProductcomment',  EProductcommentSchema);


export default {
    BannerSchema,
    EProductSchema,
    ECategorySchema,
    EMyCouponSchema,
    EProductcommentSchema,
    PostageTemplateSchema,
    EShopSchema,

    BannerModel,
    EProductModel,
    ECategoryModel,
    EMyCouponModel,
    EProductcommentModel,
    PostageTemplateModel,
    EShopModel,
};




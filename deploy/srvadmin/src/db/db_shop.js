import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
//快递公司／快递单号／
const ExpressSchema = new Schema({
    expressname:String,
    expresscode:String, //快递编码
    memo:String,//备注
    isvisiable:Boolean
});
ExpressSchema.plugin(mongoosePaginate);
const ExpressModel  = mongoose.model('Express',  ExpressSchema);

//购物车：用户id,商品id,数量
const MycartSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    eshopid:{ type: Schema.Types.ObjectId, ref: 'EShop' },
    eproductid:{ type: Schema.Types.ObjectId, ref: 'EProduct' },
    cshopid:{ type: Schema.Types.ObjectId, ref: 'CShop' },
    cproductid:{ type: Schema.Types.ObjectId, ref: 'CProduct' },
    number:Number,
    created_at: { type: Date, default:new Date()},
});
MycartSchema.plugin(mongoosePaginate);
const MycartModel  = mongoose.model('Mycart',  MycartSchema);
//订单：用户id,[订单详情id],支付方式,折扣金额,金额,订单状态,送货地址id,是否删除，优惠券抵扣金额，优惠券ID／商品总价
const OrderSchema = new Schema({
    out_trade_no:String,
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    paytype:String,//支付方式
    ordertitle:String,  //订单标题（支付宝，微信用）
    body:String,//订单内容（文字）
    realprice:Number,//实付价
    orderprice:Number,//订单价=应付价
    balanceprice:Number,//余额抵扣金额
    orderstatus:String,//未支付|待发货|待收货|已完成|我的退货
    eshopid:{ type: Schema.Types.ObjectId, ref: 'EShop' },
    cshopid:{ type: Schema.Types.ObjectId, ref: 'CShop' },
    paystatus:{ type: String, default:'未支付'},
    orderaddress:{
        addressid:String,
        truename:String,
        phonenumber:String,
        seladdr: Schema.Types.Mixed,
        addressname: String,
    },
    isdeleted:{ type:Boolean, default: false },
    productsdetail:[
        {
            eproductid:{ type: Schema.Types.ObjectId, ref: 'EProduct' },
            cproductid:{ type: Schema.Types.ObjectId, ref: 'CProduct' },
            productinfo:Schema.Types.Mixed,
            number:Number,
            price:Number,
            isevaluation:Boolean
        }
    ],
    couponprice:Number,//抵扣价
    ecouponid:{ type: Schema.Types.ObjectId, ref: 'ECoupon' },
    pointprice:Number,//积分抵扣价
    point:Number,//所花积分
    productprice:Number,//产品总价
    expressid:{ type: Schema.Types.ObjectId, ref: 'Express' },
    expressbarid:String,
    expressprice:Number,//运费
    expresscode:String, //快递编码
    created_at: { type: Date, default:new Date()},
    pay_at:Date,
});
OrderSchema.plugin(mongoosePaginate);
const OrderModel  = mongoose.model('Order',  OrderSchema);

//订单详情：订单id/单价/数量／商品id/是否评价／合计
//我的收藏：用户id,商品id,
const MycollectionSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    eproductid:{ type: Schema.Types.ObjectId, ref: 'EProduct' },
    cproductid:{ type: Schema.Types.ObjectId, ref: 'CProduct' },
    created_at: { type: Date, default:new Date()},
});
MycollectionSchema.plugin(mongoosePaginate);
const MycollectionModel  = mongoose.model('Mycollection',  MycollectionSchema);


const AddressconstSchema = new Schema({
    adcode:String,
    type:String,
    level:Number,
    parent_id:{ type: Schema.Types.ObjectId, ref: 'Addressconst' },//店铺ID
    name:String,
});
AddressconstSchema.plugin(mongoosePaginate);
const AddressconstModel  = mongoose.model('Addressconst',  AddressconstSchema);



export default {
    MycartSchema,
    OrderSchema,
    ExpressSchema,
    MycollectionSchema,
    AddressconstSchema,
  
  
    MycartModel,
    OrderModel,
    ExpressModel,
    MycollectionModel,
    AddressconstModel,
  };

  


import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
/*
包括设备表、设备历史数据表、设备实时表
*/
//=======设备类型=======
//
const DevicetypeSchema = new Schema({
    name:String,//血压仪,体脂秤
});
DevicetypeSchema.plugin(mongoosePaginate);
const DevicetypeModel  = mongoose.model('Devicetype',  DevicetypeSchema);


//=======设备=======
//
const RealtimedataSchema = new Schema({
    deviceid:String,//mac->hex
    getdata:{ type: Boolean, default:false},
    name:String,
    updated_at:{ type: Date, default:new Date()},
    ipaddr:String,
    provice:String,
    city:String,
    county:String,
    rawdata:Schema.Types.Mixed,
});
RealtimedataSchema.plugin(mongoosePaginate);
const RealtimedataModel  = mongoose.model('Realtimedata',  RealtimedataSchema);

/*
流程：
*/
const DeviceSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    deviceid:String,//mac->hex
    devicetype:{ type: Schema.Types.ObjectId, ref: 'Devicetype' },
    devicename:String,
    devicebrand:String,
    devicemodel: String,
    realtimedata:{ type: Schema.Types.ObjectId, ref: 'Realtimedata' },
    created_at:{ type: Date, default:new Date()},
    userowners:[{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});
DeviceSchema.plugin(mongoosePaginate);
const DeviceModel  = mongoose.model('Device',  DeviceSchema);

//=======设备历史记录=======
const DeviceDataHistorySchema = new Schema({
    deviceid:String,//mac->hex
    ipaddr:String,
    provice:String,
    city:String,
    county:String,
    rawdata:Schema.Types.Mixed,
    created_at: { type: Date, default:new Date()},
});
DeviceDataHistorySchema.plugin(mongoosePaginate);
const DeviceDataHistoryModel  = mongoose.model('DeviceDataHistory',  DeviceDataHistorySchema);
//=======设备=======

export default {
    DevicetypeSchema,
    DeviceSchema,
    RealtimedataSchema,
    DeviceDataHistorySchema,

    DevicetypeModel,
    DeviceModel,
    RealtimedataModel,
    DeviceDataHistoryModel,
};
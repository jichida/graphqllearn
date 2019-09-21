import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
// http://mongoosejs.com/docs/populate.html
const UserSchema = new Schema({
    username:String,
    passwordhash: String,
    passwordsalt: String,
    rtoken:String,
    openidqq: String,
    openidweixin: String,
    created_at: { type: Date, default:new Date()},
    updated_at: Date,
    lasttoken:String,
    lastreadmsgtime_at: { type: Date, default:new Date()},
    profile:{ type: Schema.Types.Mixed},
    defaultaddress:{ type: Schema.Types.ObjectId, ref: 'Address' },
    isenabled:Boolean
});
UserSchema.plugin(mongoosePaginate);
const UserModel  = mongoose.model('User',  UserSchema);

const AddressSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'User' },
    truename:String,
    phonenumber:String,
    seladdr: Schema.Types.Mixed,
    addressname: String,
    created_at: { type: Date, default:new Date()},
});
AddressSchema.plugin(mongoosePaginate);
const AddressModel  = mongoose.model('Address',  AddressSchema);

const UserAdminSchema = new Schema({
  username:String,
  passwordhash: String,
  passwordsalt: String,
  created_at: { type: Date, default:new Date()},
  updated_at: Date,
});
const UserAdminModel  = mongoose.model('UserAdmin',  UserAdminSchema);


export default {
  UserSchema,
  AddressSchema,
  UserAdminSchema,


  UserModel,
  UserAdminModel,
  AddressModel,

};



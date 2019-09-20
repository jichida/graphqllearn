import mongoose  from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
mongoose.Promise = global.Promise;
const Schema       = mongoose.Schema;
//系统设置
const LinkSchema = new Schema({
    name:String,
    url:String
});
LinkSchema.plugin(mongoosePaginate);
const LinkModel  = mongoose.model('Link',  LinkSchema);

export default {
    LinkSchema,
    LinkModel
}

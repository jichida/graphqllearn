import mongoose  from 'mongoose';
import adminaction from './adminaction.js';
import _ from 'lodash';
import debugx from 'debug';
import aqp from 'api-query-params';

const debug = debugx('srv:admincurd');

//https://github.com/loris/api-query-params
const GET_LIST = 'GET_LIST';
const GET_ONE = 'GET_ONE';
const GET_MANY = 'GET_MANY';
const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const DELETE_MANY = 'DELETE_MANY';

const curd =  (schmodel)=>{
  return async (req,res)=>{
    const queryparam =   req.body;
    debug(queryparam);

    let query = {};
    let sort = {};
    let options = {};
    if(queryparam.params.hasOwnProperty('sort')){
      sort[queryparam.params.sort.field] = queryparam.params.sort.order==="DESC"?-1:1;
      options.sort = sort;
    }
    if(queryparam.params.hasOwnProperty('pagination')){
      options['page'] = queryparam.params.pagination.page;
      if (typeof options['page'] === 'string') {
        options['page'] = parseInt(options['page']);
      }
      options['limit'] = queryparam.params.pagination.perPage;
      if (typeof options['limit'] === 'string') {
        options['limit'] = parseInt(options['limit']);
      }
    }
    if(queryparam.params.hasOwnProperty('filter')){
      const querypre = queryparam.params.filter;
      if(!!querypre.querystring){
        debug(`string->${querypre.querystring}`)
        query = aqp(querypre.querystring).filter;
        debug(query);
      }
      else{
        query = {};
        _.map(querypre,(value,key)=>{
          let keysz = key.split('_');
          if(keysz.length === 2){
            if(keysz[1]=== 'q'){
              query[keysz[0]] = new RegExp(value,'ig');
            }
            else if(keysz[1]=== 'int'){//需要当成int处理
              query[keysz[0]] = parseInt(value);
            }
          }
          else{
            query[key] = value;
          }
        });
      }
    }
    debug(query);
    try{


    if(queryparam.type === GET_LIST){
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      const querynew = query;
      options.lean = true;
      const result = await dbModel.paginate(querynew, options);
      debug(result);
      res.status(200).json(result);
    }
    else if(queryparam.type === GET_ONE){
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      const result = await dbModel.findById(queryparam.params.id).lean();
      res.status(200).json(result);
    }
    else if(queryparam.type === GET_MANY){
      const idstrings = queryparam.params.ids;
      let ids = [];
      _.map(idstrings,(id)=>{
        if(typeof id === 'string'){
          if(id !== ''){
            ids.push(mongoose.Types.ObjectId(id));
          }
        }
      });
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      const result = await dbModel.find({ _id: { "$in" : ids} }).lean();
      res.status(200).json(result);
    }
    else if(queryparam.type === GET_MANY_REFERENCE){
      let query = {};
      query[queryparam.params.target] = queryparam.params.id;
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      const querynew = query;
      options.lean = true;
      const result = await dbModel.paginate(querynew,options);
      res.status(200).json(result);
     
    }
    else if(queryparam.type === CREATE){
      let dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      const createddata = queryparam.params.data;
      await adminaction.preaction('save',schmodel.collectionname,createddata);
      const entity = new dbModel(createddata);
      const result = await entity.save();
      res.status(200).json(result);
      await adminaction.postaction('save',schmodel.collectionname,result,req);

    }
    else if(queryparam.type === UPDATE){
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      let updateddata = queryparam.params.data;
      await adminaction.preaction('findByIdAndUpdate',schmodel.collectionname,updateddata);
      await dbModel.findByIdAndUpdate(queryparam.params.id,updateddata, {new: true}).lean();
      res.status(200).json(result);
      await adminaction.postaction('findByIdAndUpdate',schmodel.collectionname,result,req);
    }
    else if(queryparam.type === DELETE){
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      await dbModel.findOneAndRemove({_id: queryparam.params.id});
      await adminaction.postaction('delete',schmodel.collectionname,result,req);
      res.status(200).json(result);
    }
    else if(queryparam.type === DELETE_MANY){
      const idstrings = queryparam.params.ids;
      let ids = [];
      _.map(idstrings,(id)=>{
        if(typeof id === 'string'){
          ids.push(mongoose.Types.ObjectId(id));
        }
      });
      const dbModel = mongoose.model(schmodel.collectionname, schmodel.schema);
      await dbModel.deleteMany({ _id: { "$in" : ids} }).lean();
      debug(result);
      res.status(200)
            .json({data:ids});


    }
    else{
      debug(`不支持的命令:${queryparam.type}`);
      res.status(500).json({
        err:`${queryparam.type}`
      });

      }
    }
    catch(e){
      debug(e);
      res.status(500).json({e});
    }
  };
}

export default curd;

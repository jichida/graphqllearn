import lodashGet from 'lodash.get';
import lodashSet from 'lodash.set';

let data =  {
  "eth":{
    initPrice:0,
    initChange:0
  },
  "my-club":{
    initUsers:[]
  },
  "my-clubprofit":{
    initData:[],
    initCount:0
  },
  "my-personalclubprofit":{
     initCount:0,
     initList:[]
  },
  "my-personalprofit":{
     initCount:0
  },
  "asserts":{
    ethtotal: 0,
    todaymoney: 0,
    clubTotal: 0,
    clubusers: 0,
    myclubprofit: 0
  },
  "price-detail":{
    initData:[],
    initLastPrice:0
  },
  "price-rollin-record":{
    initData:[]
  },
  "price-rollout-record":{
    initData:[]
  },
};

const getData = (filename,fieldname)=>{
  // console.log(data);
  const ret = lodashGet(data,`${filename}.${fieldname}`,'');
  // console.log(ret);
  return ret;
}

const setData = (filename,fieldname,value)=>{
   // console.log(value);
   lodashSet(data,`${filename}.${fieldname}`,value);
   // console.log(data);
}

const clearData = ()=>{
  data =  {
    "eth":{
      initPrice:0,
      initChange:0
    },
    "my-club":{
      initUsers:[]
    },
    "my-clubprofit":{
      initData:[],
      initCount:0
    },
    "my-personalclubprofit":{
       initCount:0,
       initList:[]
    },
    "my-personalprofit":{
       initCount:0
    },
    "asserts":{
      ethtotal: 0,
      todaymoney: 0,
      clubTotal: 0,
      clubusers: 0,
      myclubprofit: 0
    },
    "price-detail":{
      initData:[],
      initLastPrice:0
    },
    "price-rollin-record":{
      initData:[]
    },
    "price-rollout-record":{
      initData:[]
    },
  };
}

export {getData,setData,clearData};

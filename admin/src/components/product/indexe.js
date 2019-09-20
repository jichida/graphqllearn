import React from 'react';
import { List } from 'react-admin';
// import { CardActions } from '@material-ui/Card';
// import FlatButton from '@material-ui/FlatButton';
//import NavigationRefresh from '@material-ui/svg-icons/navigation/refresh';
import {


  NumberInput,
  Create,
  Edit,
  Filter,
  SimpleForm,
  DisabledInput,
  TextInput,

  DateInput,

  ReferenceInput,
  Datagrid,
  TextField,

  EditButton,
  SelectInput,
  BooleanInput,

  ImageField,
  NumberField,
  ReferenceField
} from 'react-admin';

import {ImageInputUpload} from '../controls/imageupload.js';
import {ImageInputUploadArray} from '../controls/imageuploadarray.js';
// import RichTextInput from '../controls/richtoolbar.js';
import EnableButton from './setenablebtn';
import config from '../../env/config';


export const ProductFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索产品名" source="name_q" />
         <ReferenceInput source="categoryid" reference="category">
            <SelectInput source="name" />
        </ReferenceInput>
    </Filter>
);

const ProductcreateTitle = ({ record }) => {
   return <span>新建 产品</span>;
};
const ProductlistCreate = (props) => (
       <Create {...props} title={<ProductcreateTitle />}>
           <SimpleForm  defaultValue={{ shopid:config.shopid }}>
              <TextInput label="名字" source="name" />
              <ReferenceInput source="categoryid" reference="category" allowEmpty filter={{ shopid: config.shopid }}>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput label="现价"  source="pricenow" />
              <NumberInput label="市场价"  source="pricemarket" />
              <TextInput label="摘要" source="brief" />
              <NumberInput label="重量"  source="weight" />
              <NumberInput label="库存"  source="stock" />
              <NumberInput label="销量"  source="salesvolume" />
              <ImageInputUpload label="图片"  source="picurl" />
              <ImageInputUploadArray label="产品详情图片列表"  source="picurldetails" />
              <ImageInputUploadArray label="图片列表"  source="picurls" />
              <DateInput label="发布时间"  source="publishdate" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const ProductlistTitle = ({ record }) => {
   return <span>编辑 产品信息</span>;
};

const ProductlistEdit = (props) => {
      return (<Edit title={<ProductlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <TextInput label="名字" source="name" />
              <ReferenceField label="店铺" source="shopid" reference="shop" >
                 <TextField source="name" />
              </ReferenceField>
              <ReferenceInput source="categoryid" reference="category" allowEmpty filter={{ shopid: config.shopid }}>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput label="现价"  source="pricenow" />
              <NumberInput label="市场价"  source="pricemarket" />
              <TextInput label="摘要" source="brief" />
              <NumberInput label="重量"  source="weight" />
              <NumberInput label="库存"  source="stock" />
              <NumberInput label="销量"  source="salesvolume" />
              <ImageInputUpload label="产品封面图片"  source="picurl" />
              <ImageInputUploadArray label="产品详情图片列表"  source="picurldetails" />
              <ImageInputUploadArray label="产品轮播图片"  source="picurls" />
              <DateInput label="发布时间"  source="publishdate" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};





const ProductlistList = (props) => (//
     <List title="产品信息列表"  filters={<ProductFilter />}  {...props} >
        <Datagrid>
        <ImageField source="picurl" label="封面图片"/>
        <TextField label="名字" source="name" />
         <ReferenceField label="类别" source="categoryid" reference="category" addLabel={false}>
            <TextField source="name" />
         </ReferenceField>
        <NumberField label="现价" source="pricenow" locales="zh-cn" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <EnableButton />
        <EditButton />
        </Datagrid>
    </List>
);


export  {ProductlistCreate,ProductlistList,ProductlistEdit};

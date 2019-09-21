import React from 'react';
import { List } from 'react-admin';

import {
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  Show,
  SimpleShowLayout,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ReferenceInput,
  ReferenceField,
  ImageField
} from 'react-admin';


import {ImageInputUpload} from '../controls/imageupload.js';


const BannercreateTitle = ({ record }) => {
   return <span>新建 图片广告</span>;
};
const BannerlistCreate = (props) => (
       <Create {...props} title={<BannercreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" />
             <SelectInput  label="图片类型"  source="type" choices={[
               { id: '硬件商城', name: '硬件商城广告图' },
               { id: '积分商城', name: '积分商城广告图' },
               { id: '我的智能', name: '我的智能广告图' },
               { id: '圈子资讯', name: '圈子资讯广告图' },
             ]} />
             <ReferenceInput source="productid" reference="product" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);

const BannerlistTitle = ({ record }) => {
   return <span>编辑 图片广告信息</span>;
};

const BannerlistEdit = (props) => {
  console.log("BannerlistEdit==>" + JSON.stringify(props));
      return (<Edit title={<BannerlistTitle />} {...props}>
          <SimpleForm>
              <TextInput label="名字" source="name" />
              <SelectInput  label="图片类型"  source="type" choices={[
                { id: '硬件商城', name: '硬件商城广告图' },
                { id: '积分商城', name: '积分商城广告图' },
                { id: '我的智能', name: '我的智能广告图' },
                { id: '圈子资讯', name: '圈子资讯广告图' },
              ]} />
              <ReferenceInput source="productid" reference="product" allowEmpty>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <NumberInput label="排序字段"  source="sortflag" />
              <ImageInputUpload label="图片"  source="picurl" />
              <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const BannerlistShow = (props) => (
       <Show title={<BannerlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField label="类型" source="type" />
                <ImageField source="picurl" label="图片"/>
                <TextField label="名字" source="name" />
                <ReferenceField label="产品" source="productid" reference="product" addLabel={false} allowEmpty>
                   <TextField source="name" />
                </ReferenceField>
                <TextField label="排序字段" source="sortflag" />
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);



const BannerlistList = (props) => (//
     <List title="广告条列表" {...props} >
        <Datagrid>
        <TextField label="类型" source="type" />
        <ImageField source="picurl" label="图片"/>
        <TextField label="名字" source="name" />
        <ReferenceField label="产品" source="productid" reference="product" addLabel={false} allowEmpty>
           <TextField source="name" />
        </ReferenceField>
        <TextField label="排序字段" source="sortflag" />
        <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {BannerlistCreate,BannerlistList,BannerlistEdit,BannerlistShow};

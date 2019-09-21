import React from 'react';
import { List } from 'react-admin';

import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  NumberField
} from 'react-admin';


const CouponcreateTitle = ({ record }) => {
   return <span>新建 优惠券</span>;
};
const CouponCreate = (props) => (
       <Create {...props} title={<CouponcreateTitle />} >
           <SimpleForm>
               <TextInput label="名字" source="name" />
               <DateInput label="过期时间"  source="expdate" />
               <TextInput label="价格条件"  source="pricecondition" />
               <NumberInput label="最高抵扣"  source="pricediscount" />
           </SimpleForm>
       </Create>
);

const CouponTitle = ({ record }) => {
    console.log("record=>" + JSON.stringify(record));
   return <span>编辑 优惠券</span>;
};

const CouponEdit = (props) => {
      return (<Edit title={<CouponTitle />} {...props}>
          <SimpleForm>
               <TextInput label="名字" source="name" />
               <DateInput label="过期时间"  source="expdate" />
               <TextInput label="价格条件"  source="pricecondition" />
               <NumberInput label="最高抵扣"  source="pricediscount" />
          </SimpleForm>
      </Edit>);

};


const CouponShow = (props) => (
       <Show title={<CouponTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="名字" source="name" />
               <DateField label="过期时间" source="expdate"  />
               <TextField label="价格条件"  source="pricecondition" />
               <TextField label="最高抵扣"  source="pricediscount" />
           </SimpleShowLayout>
       </Show>
);



const CouponList = (props) => (//
     <List title="优惠券列表" {...props} >
        <Datagrid>
            <TextField label="名字" source="name" />
            <DateField label="过期时间" source="expdate"  />
            <NumberField label="价格条件" source="pricecondition" locales="zh-cn"  options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
            <NumberField label="最高抵扣" source="pricediscount" locales="zh-cn" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <EditButton />
        </Datagrid>
    </List>
);


export  {CouponList,CouponCreate,CouponEdit,CouponShow};

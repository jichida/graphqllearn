import React from 'react';
import { List } from 'react-admin';
// import { CardActions } from '@material-ui/Card';
// import FlatButton from '@material-ui/FlatButton';
//import NavigationRefresh from '@material-ui/svg-icons/navigation/refresh';
import {

  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,

  Datagrid,
  TextField,

  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  Filter
} from 'react-admin';

export const ExpressFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索快递名" source="expressname_q" />
        <SelectInput source="isvisiable" choices={[
            { id: true, name: '可见' },
            { id: false, name: '不可见' },
        ]} />
    </Filter>
);


const ExpresscreateTitle = ({ record }) => {
   return <span>新建 快递公司</span>;
};
const ExpresslistCreate = (props) => (
       <Create {...props} title={<ExpresscreateTitle />} >
           <SimpleForm>
              <TextInput label="公司名" source="expressname" />
              <TextInput label="快递代码"  source="expresscode" />
              <TextInput label="备注"  source="memo" />
             <BooleanInput label="是否显示" source="isvisiable" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const ExpresslistTitle = ({ record }) => {
   return <span>编辑 快递公司</span>;
};

const ExpresslistEdit = (props) => {
      return (<Edit title={<ExpresslistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="公司名" source="expressname" />
              <TextInput label="快递代码"  source="expresscode" />
              <TextInput label="备注"  source="memo" />
              <BooleanInput label="是否显示" source="isvisiable" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const ExpresslistShow = (props) => (
       <Show title={<ExpresslistTitle />} {...props}>
           <SimpleShowLayout>
            <TextField label="公司名" source="expressname" />
            <TextField label="快递代码" source="expresscode" />
            <TextField label="备注" source="memo" />
             <BooleanField label="是否显示" source="isvisiable" />
           </SimpleShowLayout>
       </Show>
);



const ExpresslistList = (props) => (//
     <List title="快递公司列表" {...props} filters={<ExpressFilter />} >
        <Datagrid>
        <TextField label="公司名" source="expressname" />
        <TextField label="快递代码" source="expresscode" />
        <TextField label="备注" source="memo" />
         <BooleanField label="是否显示" source="isvisiable" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {ExpresslistCreate,ExpresslistList,ExpresslistEdit,ExpresslistShow};

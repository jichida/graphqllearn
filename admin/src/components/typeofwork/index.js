import React from 'react';
import { List } from 'react-admin';
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  Datagrid,
  TextField,
  EditButton,
  BooleanInput,
  BooleanField,
  Filter
} from 'react-admin';


export const NewsFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索工种名" source="name_q" />
    </Filter>
);


const NewscreateTitle = ({ record }) => {
   return <span>新建 工种</span>;
};
const TypeofworkCreate = (props) => (
       <Create {...props} title={<NewscreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <BooleanInput label="是否启用" source="is_enabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const TypeofworkTitle = ({ record }) => {
   return <span>编辑 工种</span>;
};

const TypeofworkEdit = (props) => {
      return (<Edit title={<TypeofworkTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <BooleanInput label="是否启用" source="is_enabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};

//
// const TypeofworkShow = (props) => (
//        <Show title={<TypeofworkTitle />} {...props}>
//            <SimpleShowLayout>
//                <TextField label="名字" source="name" />
//                <BooleanField label="是否启用" source="isenabled" />
//            </SimpleShowLayout>
//        </Show>
// );
//


const TypeofworkList = (props) => (//
     <List title="工种信息列表" {...props} filters={<NewsFilter />} >
        <Datagrid>
          <TextField label="名字" source="name" />
          <BooleanField label="是否启用" source="is_enabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {TypeofworkCreate,TypeofworkList,TypeofworkEdit,};

import React from 'react';
import { List } from 'react-admin';
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  Show,
  SimpleShowLayout,
  Datagrid,
  TextField,
  // DateField,
  EditButton,
  // SelectInput,
  // BooleanInput,
  // BooleanField,
  // ReferenceInput,
  // ReferenceField,
  Filter
} from 'react-admin';


export const LinkFilter = props => (
    <Filter {...props}>
        <TextInput label="超链接名" source="name_q" />
    </Filter>
);


const LinkcreateTitle = ({ record }) => {
   return <span>新建 超链接</span>;
};
const LinkCreate = (props) => (
       <Create {...props} title={<LinkcreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <TextInput label="超链接" source="url" validation={{ required: true }}/>
           </SimpleForm>
       </Create>
);


const LinkTitle = ({ record }) => {
   return <span>编辑 超链接</span>;
};

const LinkEdit = (props) => {
      return (<Edit title={<LinkTitle />} {...props}>
          <SimpleForm>
            <TextInput label="名字" source="name" validation={{ required: true }}/>
            <TextInput label="超链接" source="url" validation={{ required: true }}/>
          </SimpleForm>
      </Edit>);

};


const LinkShow = (props) => (
       <Show title={<LinkTitle />} {...props}>
           <SimpleShowLayout>
             <TextField label="名字" source="name" />
             <TextField label="超链接" source="url" />
           </SimpleShowLayout>
       </Show>
);



const LinkList = (props) => (//
     <List title="超链接信息列表" {...props} filters={<LinkFilter />} >
        <Datagrid>
          <TextField label="名字" source="name" />
          <TextField label="超链接" source="url" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {LinkCreate,LinkList,LinkEdit,LinkShow};

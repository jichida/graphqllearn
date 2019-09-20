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
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ReferenceInput,
  ReferenceField,
  Filter
} from 'react-admin';


export const NewsFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索动态名" source="textname_q" />
    </Filter>
);


const NewscreateTitle = ({ record }) => {
   return <span>新建 动态信息</span>;
};
const NewslistCreate = (props) => (
       <Create {...props} title={<NewscreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="textname" validation={{ required: true }}/>
             <ReferenceInput source="productid" reference="product" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const NewslistTitle = ({ record }) => {
   return <span>编辑 动态信息</span>;
};

const NewslistEdit = (props) => {
      return (<Edit title={<NewslistTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="textname" validation={{ required: true }}/>
             <ReferenceInput source="productid" reference="product" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const NewslistShow = (props) => (
       <Show title={<NewslistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField label="名字" source="textname" />
               <ReferenceField label="产品" source="productid" reference="product" addLabel={false} allowEmpty>
                  <TextField source="name" />
               </ReferenceField>
               <BooleanField label="是否启用" source="isenabled" />
           </SimpleShowLayout>
       </Show>
);



const NewslistList = (props) => (//
     <List title="动态信息列表" {...props} filters={<NewsFilter />} >
        <Datagrid>
          <TextField label="名字" source="textname" />
          <ReferenceField label="产品" source="productid" reference="product" addLabel={false} allowEmpty>
             <TextField source="name" />
          </ReferenceField>
          <DateField label="生成时间" source="created_at" showTime />
          <BooleanField label="是否启用" source="isenabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {NewslistCreate,NewslistList,NewslistEdit,NewslistShow};

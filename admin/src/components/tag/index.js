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
  ReferenceArrayInput,
  SelectArrayInput,
  SingleFieldList,
  ReferenceArrayField,
  ChipField,
  Filter
} from 'react-admin';


export const NewsFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索标签名" source="name_q" />
    </Filter>
);


const NewscreateTitle = ({ record }) => {
   return <span>新建 标签信息</span>;
};
const TagCreate = (props) => (
       <Create {...props} title={<NewscreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceArrayInput label="设备类型" reference="devicetype" source="devicetypes">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
             <BooleanInput label="是否启用" source="is_enabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const TagTitle = ({ record }) => {
   return <span>编辑 标签信息</span>;
};

const TagEdit = (props) => {
      return (<Edit title={<TagTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceArrayInput label="设备类型" reference="devicetype" source="devicetypes">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
             <BooleanInput label="是否启用" source="is_enabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


// const TagShow = (props) => (
//        <Show title={<TagTitle />} {...props}>
//            <SimpleShowLayout>
//                <TextField label="名字" source="textname" />
//                <ReferenceField label="产品" source="productid" reference="product" addLabel={false} allowEmpty>
//                   <TextField source="name" />
//                </ReferenceField>
//                <BooleanField label="是否启用" source="isenabled" />
//            </SimpleShowLayout>
//        </Show>
// );
//


const TagList = (props) => (//
     <List title="标签列表" {...props} filters={<NewsFilter />} >
        <Datagrid>
          <TextField label="名字" source="name" />
          <ReferenceArrayField label="设备类型" reference="devicetype" source="devicetypes">
             <SingleFieldList>
                 <ChipField source="name" />
             </SingleFieldList>
         </ReferenceArrayField>
          <BooleanField label="是否启用" source="is_enabled" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {TagCreate,TagList,TagEdit};

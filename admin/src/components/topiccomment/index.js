import React from 'react';
import { List } from 'react-admin';

import {
    Edit,
    SimpleForm,
    DisabledInput,
    TextInput,
    BooleanInput,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    Filter
} from 'react-admin';


import CommentDetail from '../topiccomment/commentdetail';
import CommentItemsField from '../topiccomment/commentitemsfield';
import VisiableButton from './setvisiablebtn';

export const TopiccommentFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索评论" source="title_q" />
         <ReferenceInput label="用户" source="creator" reference="user" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);

const TopiccommentlistTitle = ({ record }) => {
   return <span>编辑 评论信息</span>;
};

const TopiccommentlistEdit = (props) => {
      return (<Edit title={<TopiccommentlistTitle />} {...props} sort={{ field: 'created_at', order: 'DESC' }}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="标题"  source="title" />
              <BooleanInput label="是否显示" source="isvisiable" defaultValue={true} />
              <CommentDetail />
          </SimpleForm>
      </Edit>);

};


/*const TopiccommentlistShow = (props) => (
       <Show title={<TopiccommentlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="标题" source="title" />
           </SimpleShowLayout>
       </Show>
);*/



const TopiccommentlistList = (props) => (//
     <List title="评论列表" {...props}  filters={<TopiccommentFilter />} >
        <Datagrid>
        <TextField label="标题" source="title" />
         <ReferenceField label="用户" source="creator" reference="user" addLabel={false}>
            <TextField source="username" />
        </ReferenceField>
        <CommentItemsField />
        <DateField label="评论时间" source="created_at" showTime />
        <VisiableButton />
        <EditButton />
        </Datagrid>
    </List>
);


export  {TopiccommentlistList,TopiccommentlistEdit};

import React from 'react';
import { List } from 'react-admin';
import {
    Edit,
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
    TabbedForm,
    FormTab,
    Filter
} from 'react-admin';

// import RichTextInput from '../controls/richtoolbar.js';
import ImageArrayField from '../controls/imagearrayfield.js';
//import RichTextInput from 'aor-rich-text-input';

import CommentDetail from '../topiccomment/commentdetail';
import LoveItemsField from './loveitemsfield';
import CommentItemsField from '../topiccomment/commentitemsfield';
import VisiableButton from './setvisiablebtn';

export const TopicFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索帖子" source="title_q" />
         <ReferenceInput label="用户" source="creator" reference="user" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);

const TopiclistTitle = ({ record }) => {
   return <span>编辑 帖子信息</span>;
};

const TopiclistEdit = (props) => {
      return (<Edit title={<TopiclistTitle />} {...props}>
          <TabbedForm>
              <FormTab label="resources.topic.tabs.basic">
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="标题"  source="title" />
              <ImageArrayField label="图片" source="picurl"  addLabel={true}/>
              <BooleanInput label="是否显示" source="isvisiable" defaultValue={true} />
              </FormTab>
              <FormTab label="resources.topic.tabs.comment">
              <CommentDetail />
              </FormTab>
          </TabbedForm>
      </Edit>);

};


/*const TopiclistShow = (props) => (
       <Show title={<TopiclistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="标题" source="title" />
           </SimpleShowLayout>
       </Show>
);*/



const TopiclistList = (props) => (//
     <List title="帖子信息列表" {...props}  filters={<TopicFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="标题" source="title" />
         <ReferenceField label="用户" source="creator" reference="user" addLabel={false}>
            <TextField source="username" />
        </ReferenceField>
        <LoveItemsField />
        <CommentItemsField />
        <DateField label="发帖时间" source="created_at" showTime />
        <VisiableButton />
        <EditButton />
        </Datagrid>
    </List>
);


export  {TopiclistList,TopiclistEdit};

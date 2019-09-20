import React from 'react';
import { List } from 'react-admin';

import {

  RichTextField,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
} from 'react-admin';

// import RichTextInput from '../controls/richtoolbar.js';

const AboutlistTitle = ({ record }) => {
   return <span>编辑 关于信息</span>;
};

const AboutlistCreate = (props) => {
      return (<Create title={<AboutlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <SelectInput source="keyname" choices={[
                { id: 'helpcenter', name: '帮助中心' },
                { id: 'aboutus', name: '关于我们' },
                { id: 'servicerule', name: '服务协议' },
            ]} />
              <TextInput label="标题"  source="title" />
              {/* <RichTextInput label="详细信息" source="desc" addLabel={false}/> */}
          </SimpleForm>
      </Create>);

};


const AboutlistEdit = (props) => {
      return (<Edit title={<AboutlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
             <SelectInput source="keyname" choices={[
                { id: 'helpcenter', name: '帮助中心' },
                { id: 'aboutus', name: '关于我们' },
                { id: 'servicerule', name: '服务协议' },
            ]} />
              <TextInput label="标题"  source="title" />
              {/* <RichTextInput label="详细信息" source="desc" addLabel={false}/> */}
          </SimpleForm>
      </Edit>);

};


const AboutlistList = (props) => (//
     <List title="关于信息列表" {...props} >
        <Datagrid>
        <TextField label="类型" source="keyname" />
        <TextField label="标题" source="title" />
        <RichTextField label="详细信息"  source="desc" stripTags={false} />
        <EditButton />
        </Datagrid>
    </List>
);


export  {AboutlistList,AboutlistEdit,AboutlistCreate};

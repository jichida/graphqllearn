import React from 'react';
import { List } from 'react-admin';
// import { CardActions } from '@material-ui/Card';
// import FlatButton from '@material-ui/FlatButton';
//import NavigationRefresh from '@material-ui/svg-icons/navigation/refresh';
import {

  NumberInput,
  Create,
  Edit,
  SimpleForm,

  TextInput,
  // Show,
  // SimpleShowLayout,

  Datagrid,
  TextField,

  EditButton,
  SelectInput,
  SelectField,
  BooleanInput,
  // BooleanField,
  // ImageField,
  // DisabledInput,
  ReferenceInput,
  ReferenceField,
  FormDataConsumer,
  Toolbar,
  DeleteButton
} from 'react-admin';

import SaveWithNoteButton from './SaveWithNoteButtonView.js';
import {ImageInputUpload} from '../controls/imageupload.js';
// import LinkToRelatedProducts from './LinkToRelatedProducts';
import config from '../../env/config';
/*
ReferenceInput/SelectInput有点问题，当选中空时，是''而不是null
SaveWithNoteButton只是备选方案，并不完美
*/
const CategorycreateTitle = ({ record }) => {
   return <span>新建 类别</span>;
};
const CategoriesCreate = (props) => {
      return (<Create {...props} title={<CategorycreateTitle />} >
           <SimpleForm defaultValue={{ eshopid:config.shopid }} redirect="list">
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <SelectInput  label="商城类型"  source="eshoptype" choices={[
                 { id: 'hardware', name: '硬件商城' },
                 { id: 'point', name: '积分商城' },
                 { id: 'other', name: '其他' },
             ]} />
             <FormDataConsumer>
                {({ formData, ...rest }) =>
                    <ReferenceInput label="父类别" source="parent_id" reference="ecategory" allowEmpty
                      filter={{ eshoptype: formData.eshoptype }}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                }
            </FormDataConsumer>

             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>);
};


const CategorylistTitle = ({ record }) => {
   return <span>编辑 类别信息</span>;
};

const CategoriesEditToolbar = props => (
    <Toolbar {...props}>
        <SaveWithNoteButton
            label="保存"
            redirect="list"
            submitOnEnter={false}
        />
        <DeleteButton resource="ecategory" {...props}/>
    </Toolbar>
);

const CategoriesEdit = (props) => {
      return (<Edit title={<CategorylistTitle />} {...props}>
          <SimpleForm toolbar={<CategoriesEditToolbar />}>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceField label="店铺" source="shopid" reference="eshop" addLabel={true}>
                <TextField source="name" />
             </ReferenceField>
             <SelectInput  label="商城类型"  source="eshoptype" choices={[
                 { id: 'hardware', name: '硬件商城' },
                 { id: 'point', name: '积分商城' },
                 { id: 'other', name: '其他' },
             ]} />
             <FormDataConsumer>
                {({ formData, ...rest }) =>
                    <ReferenceInput label="父类别" source="parent_id" reference="ecategory" allowEmpty
                      filter={{ eshoptype: formData.eshoptype }}>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                }
            </FormDataConsumer>

             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};

//
// const CategorylistShow = (props) => (
//        <Show title={<CategorylistTitle />} {...props}>
//            <SimpleShowLayout>
//                <TextField label="显示位置" source="showflag" />
//                 <ImageField source="picurl" label="图片"/>
//                 <TextField label="名字" source="name" />
//                <TextField label="排序字段" source="sortflag" />
//                <BooleanField label="是否启用" source="isenabled" />
//            </SimpleShowLayout>
//        </Show>
// );
//


const CategoriesList = (props) => (//
     <List title="类别信息列表" {...props} >
        <Datagrid>
          <ReferenceField label="店铺" source="shopid" reference="eshop" allowEmpty>
             <TextField source="name" />
          </ReferenceField>
          <SelectField source="eshoptype"  label="商城类型" choices={[
            { id: 'hardware', name: '硬件商城' },
            { id: 'point', name: '积分商城' },
            { id: 'other', name: '其他' },
          ]} />
          <ReferenceField label="父类别" source="parent_id" reference="ecategory" allowEmpty>
              <TextField source="name" />
          </ReferenceField>
          <TextField label="名字" source="name" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {CategoriesList,CategoriesCreate,CategoriesEdit};

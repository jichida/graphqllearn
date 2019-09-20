import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  Edit,
  ReferenceInput,
    List,
    TextField,
    EditButton,
    DeleteButton,
} from 'react-admin';
import {ImageInputUpload} from '../controls/imageupload.js';
import { Tree, NodeView, NodeActions } from 'ra-tree-ui-materialui';

const CategoriesActions = props => (
    <NodeActions {...props}>
        <EditButton />
        <DeleteButton />
    </NodeActions>
);

const CategorycreateTitle = ({ record }) => {
   return <span>新建 类别</span>;
};
const CategoriesCreate = (props) => {
      return (<Create {...props} title={<CategorycreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceInput label="父类别" source="parent_id" reference="category" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
           </SimpleForm>
       </Create>);
};

const CategorylistTitle = ({ record }) => {
   return <span>编辑 类别信息</span>;
};

const CategoriesEdit = (props) => {
      return (<Edit title={<CategorylistTitle />} {...props}>
          <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <ReferenceInput source="shopid" reference="shop" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <ReferenceInput label="父类别" source="parent_id" reference="category" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <NumberInput label="排序字段"  source="sortflag" />
             <ImageInputUpload label="图片"  source="picurl" />
             <BooleanInput label="是否启用" source="isenabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};




const CategoriesList = (props) => (
    <List {...props} perPage={10000}>
        <Tree>
            <NodeView actions={<CategoriesActions />}>
                <TextField source="name" />
            </NodeView>
        </Tree>
    </List>
);

export {CategoriesCreate,CategoriesEdit,CategoriesList};

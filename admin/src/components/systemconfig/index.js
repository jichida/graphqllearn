import React from "react";
import {
  required,
  FormTab,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput,
} from "react-admin";
import SingleRecordPage from "../singlerecordpage/index.js";
import {SaveButton, Toolbar } from 'react-admin';
// import ShowPageOne from '../singledocumentpage/index.js';
//
// const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
//
// const SystemconfigCreateTitle = ({ record }) => {
//   return <span>新建 系统配置</span>;
// };
//
// const SystemconfigCreate = props => (
//   <Create {...props} title={<SystemconfigCreateTitle />}>
//     <TabbedForm>
//       <FormTab label="系统设置">
//         <NumberInput
//           label="每日积分额度"
//           source="pointlimitperday"
//           validate={required()}
//           style={{ width: "100%" }}
//         />
//       <ReferenceInput source="productcategoryid_hardware" reference="category" allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       <ReferenceInput source="productcategoryid_point" reference="category"  allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       </FormTab>
//       <FormTab label="resources.systemconfig.tabs.express">
//           <TextInput  label="快递查询URL" source="expressapiurl" />
//           <TextInput  label="快递查询用户号" source="expressapicustomer" />
//           <TextInput  label="快递查询APIKEY" source="expressapikey" />
//     </FormTab>
//     </TabbedForm>
//   </Create>
// );
//
// const SystemconfigEdit = props => (
//   <EditPage {...props} title={<SystemconfigTitle />}>
//   <TabbedForm>
//       <FormTab label="系统设置">
//         <NumberInput
//           label="每日积分额度"
//           source="pointlimitperday"
//           validate={required()}
//           style={{ width: "100%" }}
//         />
//       <ReferenceInput source="productcategoryid_hardware" reference="category" allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       <ReferenceInput source="productcategoryid_point" reference="category"  allowEmpty>
//           <SelectInput optionText="name" />
//       </ReferenceInput>
//       </FormTab>
//       <FormTab label="resources.systemconfig.tabs.shop">
//         <TextInput  label="快递查询URL" source="expressapiurl" />
//         <TextInput  label="快递查询用户号" source="expressapicustomer" />
//         <TextInput  label="快递查询APIKEY" source="expressapikey" />
//     </FormTab>
//     </TabbedForm>
//   </EditPage>
// );
//
// export const SystemconfigList = props => (
//   <ShowPageOne Create={SystemconfigCreate} Edit={SystemconfigEdit} {...props} />
// );
const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

const SystemconfigTitle = ({ record }) => {
  return <span>系统配置</span>;
};

const SystemconfigList = (props) => (//
        <SingleRecordPage {...props}  title={<SystemconfigTitle />}>
          <TabbedForm toolbar={<EditToolbar />}>
              <FormTab label="系统设置">
                <NumberInput
                  label="每日积分额度"
                  source="pointlimitperday"
                  validate={required()}
                  style={{ width: "100%" }}
                />
              <ReferenceInput label='硬件商城类别' source="productcategoryid_hardware" reference="ecategory" allowEmpty
                filter={{querystring:'!parent_id'}}>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              <ReferenceInput label='积分商城类别' source="productcategoryid_point" reference="ecategory"  allowEmpty
                filter={{parent_id:{$exists:false}}}>
                  <SelectInput optionText="name" />
              </ReferenceInput>
              </FormTab>
              <FormTab label="resources.systemconfig.tabs.shop">
                <TextInput  label="快递查询URL" source="expressapiurl" style={{ width: "100%" }}/>
                <TextInput  label="快递查询用户号" source="expressapicustomer" style={{ width: "100%" }}/>
                <TextInput  label="快递查询APIKEY" source="expressapikey" style={{ width: "100%" }}/>
            </FormTab>
          </TabbedForm>
        </SingleRecordPage>
);


export  {SystemconfigList};

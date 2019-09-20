import React from 'react';
import { List } from 'react-admin';
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ReferenceInput,
  Filter
} from 'react-admin';
import ApproveButton from './btn';
import {MapDragSel} from '../controls/mapdragselloc';
import lodashget from 'lodash.get';
import config from '../../env/config';
// import Button from '@material-ui/core/Button';
// import Button from '@material-ui/core/Button';
import { SaveButton, Toolbar } from 'react-admin';
// import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
// // import Button from '@material-ui/core/Button';
// // import ContentSave from '@material-ui/icons/Save';
// import ActionBack from '@material-ui/icons/ArrowBack';

// const styles = {
//     button: {
//         margin: '10px 24px',
//         position: 'relative',
//     },
//     iconPaddingStyle: {
//         paddingRight: '0.5em',
//     },
// };
// let ReturnButton = ({className}) => {
//   // console.log(props);
//   return (
//       <Button onClick={()=>{
//
//       }} style={styles.button} color='primary' variant="raised" className={classnames(styles.button, className)}>
//           <ActionBack style={styles.iconPaddingStyle}/>
//           返回
//       </Button>
//   )
// };

const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);
//
// const CurActions = ({
//     bulkActions,
//     basePath,
//     currentSort,
//     displayedFilters,
//     exporter,
//     filters,
//     filterValues,
//     onUnselectItems,
//     resource,
//     selectedIds,
//     showFilter
// }) => (
//     <CardActions>
//
//     </CardActions>
// );

// const CurBulkActionButtons = props => (
//     <Fragment>
//         <ResetViewsButton label="Reset Views" {...props} />
//         {/* Add the default bulk delete action */}
//         <BulkDeleteButton {...props} />
//     </Fragment>
// );

export const ShopFilter = props => (
    <Filter {...props}>
        <TextInput label="搜索商铺名" source="name_q" />
    </Filter>
);


const ShopcreateTitle = ({ record }) => {
   return <span>新建 商铺信息</span>;
};
const ShopCreate = (props) => (
       <Create {...props} title={<ShopcreateTitle />} >
           <SimpleForm>
             <TextInput label="名字" source="name" validation={{ required: true }}/>
             <TextInput label="真实姓名" source="truename" validation={{ required: true }}/>
             <TextInput label="昵称" source="nickname"/>
             <TextInput label="联系方式" source="contact_way" validation={{ required: true }}/>
             <ReferenceInput label="工种"  source="typeofwork" reference="typeofwork" allowEmpty>
                 <SelectInput optionText="name" />
             </ReferenceInput>
             <BooleanInput label="是否营业" source="is_enabled" defaultValue={true} />
           </SimpleForm>
       </Create>
);


const ShopTitle = ({ record }) => {
   return <span>编辑 商铺信息</span>;
};

const ShopEdit = (props) => {
      return (<Edit title={<ShopTitle />} {...props}>
          <SimpleForm toolbar={<EditToolbar />}>
            <TextInput label="名字" source="name" validation={{ required: true }}/>
            <TextInput label="真实姓名" source="truename" validation={{ required: true }}/>
            <TextInput label="昵称" source="nickname"/>
            <TextInput label="联系方式" source="contact_way" validation={{ required: true }}/>
            <ReferenceInput label="工种"  source="typeofwork" reference="typeofwork" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <MapDragSel label="经纬度" source="shoplocation"/>
            <TextInput label="地址" source="address" />
            <DateField label="入驻时间" source="created_at" showTime />
            <TextInput label="拒绝理由" source="approvalrejectseason" />
            <SelectInput  label="审核状态"  source="approvalstatus" choices={[
                { id: '未递交', name: '未递交资料' },
                { id: '待审核', name: '待审核' },
                { id: '审核中', name: '审核中' },
                { id: '已审核', name: '已审核' },
                { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
            ]} />
            <BooleanInput label="是否上门" source="is_visitservice" defaultValue={true} />
            <BooleanInput label="是否营业" source="is_enabled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


// const EditBtnif = (props)=>{
//   const {record} = props;
//   return lodashget(record,'id','') === config.shopid?null:<EditButton {...props}/>;
// }

const ApproveButtonif= (props)=>{
  const {record} = props;
  return lodashget(record,'id','') === config.shopid?null:<ApproveButton {...props}/>;

}

const rowStyle = (record, index) => ({
    backgroundColor: lodashget(record,'id','') === config.shopid? '#efe' : 'white',
});


const ShopList = (props) => (//
     <List title="商铺信息列表" {...props} filters={<ShopFilter />} actions={null} bulkActionButtons={false}>
        <Datagrid bodyoptions={{ showRowHover: true }} rowStyle={rowStyle}>
        <TextField label="名字" source="name" />
        <DateField label="生成时间" source="created_at" showTime />
        <BooleanField label="是否营业" source="is_enabled" />
        <ApproveButtonif style={{ padding: 0 }}  label="审批" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {ShopCreate,ShopList,ShopEdit};

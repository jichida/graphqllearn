import React from 'react';
import { List } from 'react-admin';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  Show,
  SimpleShowLayout,
  DisabledInput,
  Datagrid,
  TextField,
  EditButton,
  Filter
} from 'react-admin';


export const WithdrawcashFilter = props => (
    <Filter {...props}>
         <ReferenceInput label="用户" source="creator" reference="user" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);

const WithdrawcashTitle = ({ record }) => {
   return <span>编辑 提现</span>;
};

const WithdrawcashEdit = (props) => {
      return (<Edit title={<WithdrawcashTitle />} {...props}>
          <SimpleForm>
             <ReferenceField label="提现用户" source="creator" reference="user" addLabel={true}>
                <TextField source="username" />
             </ReferenceField>
             <DisabledInput label="真实姓名" source="truename" />
             <DisabledInput label="银行卡号" source="bankaccount" />
             <DisabledInput label="银行名" source="bankname" />
             <DisabledInput label="提现金额" source="cashmoney" />
             <SelectInput  label="状态"  source="status" choices={[
                    { id: '未验证', name: '未验证' },
                    { id: '已验证', name: '已验证' },
                    { id: '已支付', name: '已支付' },
                    { id: '已拒绝', name: '已拒绝' },
                ]}/>
          </SimpleForm>
      </Edit>);

};


const WithdrawcashShow = (props) => (
       <Show title={<WithdrawcashTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
            </SimpleShowLayout>
       </Show>
);



const WithdrawcashList = (props) => (//
     <List title="提现列表" {...props}  filters={<WithdrawcashFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <ReferenceField label="提现用户" source="creator" reference="user" addLabel={true}>
           <TextField source="username" />
        </ReferenceField>
        <TextField label="真实姓名" source="truename" />
        <TextField label="银行卡号" source="bankaccount" />
        <TextField label="银行名" source="bankname" />
        <TextField label="提现金额" source="cashmoney" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {WithdrawcashList,WithdrawcashEdit,WithdrawcashShow};

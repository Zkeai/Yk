import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {deleteUser, edit, searchUser} from "@/services/ant-design-pro/api";
import {Image} from "antd";
import message from "antd/es/message";


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    editable:false,
  },
  {
    title: '用户名',
    search:false,
    dataIndex: 'username',
    ellipsis: true,
    tip: '标题过长会自动收缩',
    editable:false,
  },
  {
    title: '账号',
    search:false,
    dataIndex: 'userAccount',
    editable:false,
  },
  {
    title: 'UUID',
    search:false,
    dataIndex: 'uuid',
    copyable: true,
    editable:false,
    tip: '客户端的通信凭证,请勿外泄',
  },
  {
    title: '头像',
    editable:false,
    search:false,
    dataIndex: 'avatarUrl',
      render: (_, record) => (
      <div>
        <Image  src={record.avatarUrl} width={60} height={60}/>
      </div>
      ),
  },
  {
    title: '性别',
    search:false,
    dataIndex: 'gender',
    editable:false,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    editable:false,
    search:false,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    editable:false,
    search:false,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueEnum:{
      0:'正常',
      1:'冻结'
    }
  },
  {
    title: '角色',
    dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        0: { text: '普通用户', status: 'Default' },
        1: {
          text: '管理员',
          status: 'Success',
        },
        2:{
          text:'代理',
          status:'Error'
        }
      },
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    editable:false,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log(action)
          action?.startEditable?.(record.id);
        }}

      >
        编辑
      </a>,
    ],
  },
];



export default () => {
  const actionRef = useRef<ActionType>();


  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request = {async () => {
       const userList = await searchUser()
        return {
         data:userList.data
        }

      }}
      editable={{
        type: 'multiple',
        onSave:async (rowKey, data)=>{
          const userID = data.id;
          const userStatus = data.userStatus;
          const userRole =data.userRole;
          const res = await edit({userID,userStatus,userRole});
          if(res.data == 1){
            message.success("修改成功")
            return;
          }else{
            message.error("修改失败")
            return;
          }
        },
        onDelete:async (rowKey, data)=>{
          const userID =data.id;
          const res = await deleteUser({userID})
          console.log(res)

        }
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle=""></ProTable>
  );
};

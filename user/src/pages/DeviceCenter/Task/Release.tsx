
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ProTable,

} from '@ant-design/pro-components';
import { Space, Tag,} from 'antd';
import { useRef} from 'react';

import {searchTask} from "@/services/ant-design-pro/api";



const filtersArray: any =[{}];

let filtersNewArray: any =[];



export default () => {


  const actionRef = useRef<ActionType>();


  const columns: ProColumns<API.taskListItem>[] = [

    {
      title: '脚本名称',
      dataIndex: 'scriptName',
      ellipsis: true,
      width: "8%",
    },
    {
      disable: true,
      title: '脚本分组',
      filters:filtersArray,
      onFilter: (value: any, record: any) => record.scriptGroup.includes(value),
      dataIndex: 'scriptGroup',
      width: "10%",
      align: 'center',

    },
    {
      title: '类型',
      dataIndex: 'executionModel',
      search: false,
      width: "8%",
      align: 'center',
      hideInSearch: true,
      render: (_, record: {executionModel: string}) => (
        <Space>

          <Tag color={record.executionModel === "排队" ? "blue" : "red"} >
            {record.executionModel === "排队" ? "排队任务" :"定时任务"}
          </Tag>
        </Space>
      ),

    },

    {
      title: '设备IMEI',
      dataIndex: 'devices',
      width: "10%",
      align: 'center',
      hideInSearch: true,


    },
    {
      title: '任务备注',
      dataIndex: 'taskNote',
      hideInSearch: true,
      width: "30%",

    },


    {
      title: '任务创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      editable: false,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '定时任务发送时间',
      key: 'sendTime',
      dataIndex: 'sendTime',
      valueType: 'dateTime',
      sorter: true,
      editable: false,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '任务状态',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      render: (_, record: {status: number}) => (
        <Space>

          <Tag color={record.status === 0? "#98e1ff"
            : record.status === 1 ? "#01897b"
            : record.status === 2 ?"#8276c9"
            :record.status === 3 ?"#d21322":"#d94a38"}>

            {record.status === 0 ? "待执行"
            : record.status === 1 ? "执行中"
            : record.status === 2 ?"成功"
            :record.status === 3 ?"失败":"锁定"}
          </Tag>
        </Space>
      ),
    },


  ];



  return (
    <>
      <ProTable<API.taskListItem>
        columnEmptyText={false}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request = {async () => {
          const userList = await searchTask()
          filtersArray.length = 0
          //filter处理
          userList.data.map((m: any)=>{
            filtersNewArray.push(m.scriptGroup)
          })
          filtersNewArray = Array.from(new Set(filtersNewArray))
          filtersNewArray.forEach((item: string) =>{
            filtersArray.push(
              {
                text: <span key={item}>{item}</span>,
                value: item,
              }
            )
          })
          return {
            data:userList.data,
          }

        }}

        rowKey="id"
        search={{
          labelWidth: 'auto',
          showHiddenNum:true,
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
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="任务列表"

      />




    </>


  );
};

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ProTable,
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Space, Tag, message} from 'antd';
import  { useRef, useState  } from 'react';

import {addScript, deleteScript, editScript, searchScript} from "@/services/ant-design-pro/api";
import {decrypt} from "@/utils/aes";
import moment from "moment";


const newArray: any[] = []
const columns: ProColumns<API.ScriptsItem>[] = [

  {
    title: '脚本名称',
    dataIndex: 'scriptName',
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: "8%",
  },
  {
    disable: true,
    title: '脚本分组',
    dataIndex: 'scriptGroup',
    filters: true,
    onFilter: true,
    width: "7%",
  },
  {
    disable: true,
    title: '创建人',
    dataIndex: 'userid',
    filters: true,
    onFilter: true,
    editable:false,
    width: "6%",
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    width: "4%",
    render: (_, record: {status: number}) => (
      <Space>

        <Tag color={record.status === 0 ? "#c87531" : "#c75450"} >
          {record.status === 0 ? "正常" :"锁定"}
        </Tag>
      </Space>
    ),
  },
  {
    disable: true,
    title: '类型',
    dataIndex: 'type',
    search: false,
    width: "6%",
    render: (_, record: {type: number}) => (
      <Space>

          <Tag color={record.type === 0 ? "#009688" : record.type === 1 ? "blue" : "red"} >
            {record.type === 0 ? "共享" : record.type === 1?"管理员":"代理/管理员"}
          </Tag>
      </Space>
    ),

  },

  {
    disable: true,
    title: '最低适配版本',
    dataIndex: 'version',
    filters: true,
    onFilter: true,
    width: "7%",

  },
  {
    disable: true,
    title: '备注',
    dataIndex: 'note',
    filters: true,
    onFilter: true,
    width: "12%",
    ellipsis: true,
  },

  {
    disable: true,
    title: '脚本链接',
    dataIndex: 'url',
    filters: true,
    onFilter: true,
    ellipsis: true,
    copyable: true,

  },
  {
    disable: true,
    title: '教程链接',
    dataIndex: 'courseUrl',
    filters: true,
    onFilter: true,
    ellipsis: true,
    copyable: true,

  },
  {
    disable: true,
    title: '白名单',
    dataIndex: 'whiteList',
    filters: true,
    onFilter: true,
    ellipsis: true,

  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    editable: false,
    hideInSearch: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {

          action?.startEditable?.(record?.id);
        }}
      >
        编辑
      </a>,
      <a href={record?.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];



export default () => {
  const [drawerVisit, setDrawerVisit] = useState(false);
  const actionRef = useRef<ActionType>();
  return (
    <>
    <ProTable<API.ScriptsItem>
      columnEmptyText={false}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request = {async () => {
        const userList = await searchScript()
        const res =decrypt(userList.data).split(";")
        newArray.length=0
        if(res[0] !== ""){
          for(let i = 0 ;i < res.length;i++){
            const m = JSON.parse(res[i])

            newArray.push({
              index:i + 1,
              id:m.id,
              scriptName:m.scriptName,
              scriptGroup:m.scriptGroup,
              userid:m.userid,
              url:m.url,
              type:m.type,
              version:m.version,
              courseUrl:m.courseUrl,
              whiteList:m.whiteList,
              status:m.status,
              note:m.note,
              createTime:moment(m.createTime).format("YYYY-MM-DD HH:mm:ss")


            })
          }

        }


        return {
          data:newArray
        }

      }}
      editable={{
        type: 'multiple',

        onSave:async (rowKey, data ) => {
          const {scriptName,id,scriptGroup,note,type,version,whiteList,status,url,courseUrl} = data
          const res = await editScript({
            scriptName:scriptName,
            id: id,
            scriptGroup: scriptGroup,
            note: note,
            type: type,
            version: version,
            whiteList: whiteList,
            status: status,
            scriptUrl: url,
            courseUrl: courseUrl
          })

          if(res.code === 0 && res.data === 1){
            message.success("修改成功")
            return;
          }else{
            message.error("修改失败")
            return;
          }
        },
        onDelete: async (rowKey, data)=>{
          const{id} = data
          const res = await deleteScript({id})
          if(res.code === 0 && res.data === 1){
            message.success("删除成功")
            return;
          }else{
            message.error("删除失败")
            return;
          }
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
      headerTitle="脚本管理"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>{setDrawerVisit(true);}}>
          新建
        </Button>,
      ]}
    />


      <DrawerForm
        onVisibleChange={setDrawerVisit}
        title="添加脚本"
        visible={drawerVisit}
        onFinish={async (values: API.scriptAddParams) => {
          console.log(values)
          const {name,group,version,note,type,status,whiteList,url,courseUrl} = values
          const res =await addScript({name,group,version,note,type,status,whiteList,url,courseUrl})
          console.log(res)
          if(res.code === 0 && res.data !== ""){
            message.success("脚本添加成功",2)
            return true;
          }else{
            message.error(res.description,2)
            return false
          }


        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="脚本名称"
            tooltip="不要取重复名称"
            placeholder="请输入脚本名称"
            rules={[{ required: true, message: '' }]}
          />

          <ProFormText width="md" name="version" label="适配版本" placeholder="请输入脚本适配版本" />
        </ProForm.Group>

        <ProForm.Group>
          <Space size={150}>
          <ProFormSelect
            options={[
              {
                value: 0,
                label: '共享脚本',
              },
              {
                value: 1,
                label: '仅管理员',
              },
              {
                value: 2,
                label: '管理员/代理',
              }
            ]}
            width="xs"
            name="type"
            label="脚本类型"
            rules={[{ required: true, message: '' }]}
          />
          <ProFormSelect
            options={[
              {
                value: '抖音组',
                label: '抖音组',
              },
              {
                value: '知乎组',
                label: '知乎组',
              },
            ]}
            width="xs"
            name="group"
            label="脚本分组"
            rules={[{ required: true, message: '' }]}
          />
            <ProFormSelect
              options={[
                {
                  value: '0',
                  label: '正常',
                },
                {
                  value: '1',
                  label: '锁定',
                },
              ]}
              width="xs"
              name="status"
              label="状态"
              rules={[{ required: true, message: '' }]}
            />

          </Space>
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="lg"
            name="url"
            label="脚本链接"

            placeholder="请输入脚本链接"
          />

        </ProForm.Group>

        <ProForm.Group>
          <ProFormTextArea label="白名单"   width="xl" name="whiteList" placeholder="UUID白名单(定制的专属脚本，需要将UUID加入白名单列表中。支持单个/多个。每行1个。)"  />
        </ProForm.Group>


        <ProForm.Group>
          <ProFormText
            width="lg"
            name="courseUrl"
            label="教程链接"

            placeholder="请输入教程链接"
          />

        </ProForm.Group>

      <ProForm.Group>
        <ProFormTextArea label="备注"   width="xl" name="note"   />
      </ProForm.Group>

      </DrawerForm>



    </>


  );
};

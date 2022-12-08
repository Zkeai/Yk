
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ProTable,

} from '@ant-design/pro-components';
import {Button, Modal, Space, Tag,} from 'antd';
import {useEffect, useRef, useState} from 'react';
import { searchScript} from "@/services/ant-design-pro/api";
import {PlusOutlined} from "@ant-design/icons";

import { useModel } from 'umi';
import {ws} from '@/utils/WebSocket'
import {decrypt} from "@/utils/aes";
import moment from "moment";
import XHScs from "@/pages/DeviceCenter/Script/XHS/components/XHSsx";
import ZHyh from "@/pages/DeviceCenter/Script/ZH/components/ZHyh";
import XHSFbWz from "@/pages/DeviceCenter/Script/XHS/components/XHSFbWz";

const filtersArray: any =[{}];

let filtersNewArray: any =[];
const newArray: any[] = []

let websocket: any;
export default () => {
  useEffect(()=>{

    websocket =ws()
  },[])
  const [scriptRw, setScriptRw] = useState();
  const actionRef = useRef<ActionType>();
  const {useModalVisible,setUseModalVisible,setUseScriptInfo} =useModel("useScriptModel",(model: any)=> ({
    useModalVisible: model.useModalVisible,
    setUseModalVisible:model.setUseModalVisible,
    setUseScriptInfo:model.setUseScriptInfo
  }))


  const showModal = () => {
    setUseModalVisible(true);
  };
  const handleCancel = () => {
    setUseModalVisible(false);
  };

  const openModel =(record: any)=>{
    setUseScriptInfo({
      scriptName:record.scriptName,
      scriptGroup:record.scriptGroup,
      scriptUrl:record.url
    })
    showModal()
    setScriptRw(record.scriptName)
  }


  const columns: ProColumns<API.ScriptsItem>[] = [
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) =>
        <Space size={50}>
          <Button onClick={()=>openModel(record)}  icon={<PlusOutlined />} type="primary" >创建任务</Button>
          <a href={record?.courseUrl} target="_blank" rel="noopener noreferrer" key="view">
            查看
          </a>
        </Space>
      ,
    },
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
      filters:filtersArray,
      onFilter: (value: any, record: any) => record.scriptGroup.includes(value),
      dataIndex: 'scriptGroup',
      width: "10%",
      align: 'center',

    },
    {
      disable: true,
      title: '类型',
      dataIndex: 'type',
      search: false,
      width: "8%",
      align: 'center',
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
      width: "10%",
      align: 'center',
      sorter: (a: any, b: any,) => a.version - b.version

    },
    {
      disable: true,
      title: '备注',
      dataIndex: 'note',
      filters: true,
      onFilter: true,
      width: "30%",
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
      align: 'center',
    },


  ];



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
          filtersArray.length = 0
          newArray.length=0
          if(res[0] !== ""){
            for(let i = 0 ;i < res.length;i++){

              const m = JSON.parse(res[i])
              if(m.scriptGroup ==="小红书组"){
                //filter处理
                filtersNewArray.push(m.scriptGroup)

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

          }


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
            data:newArray,
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
        headerTitle="脚本列表"

      />

      <Modal title={scriptRw}  width={1000}  visible={useModalVisible} footer={null}  onCancel={handleCancel}>



        {
          //todo  需要判断加载的组件
          scriptRw =="XHS私信"
            ? <XHScs Ws={websocket}/>
            :scriptRw =="XHS发布文章"
              ? <XHSFbWz Ws={websocket}/>
              :<ZHyh Ws={websocket}/>

        }

      </Modal>


    </>


  );
};

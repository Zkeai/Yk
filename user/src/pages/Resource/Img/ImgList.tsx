import {useRef} from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {deleteFile,  getCosFileList} from "@/services/ant-design-pro/api";
import {Button, Image, Upload} from "antd";
import message from "antd/es/message";

import {useModel} from "@@/plugin-model/useModel";
import {PlusCircleOutlined} from "@ant-design/icons";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import {Host, PROD_Host} from "@/contants";
import type {UploadChangeParam} from "antd/es/upload";


const newArray: any[] = []




const App = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const columns: ProColumns<API.ImgReposed>[] = [

    {
      title: '图片',
      align:"center",
      editable:false,
      search:false,
      dataIndex: 'img',
      render: (_, record) => (

        <div>
          <Image  src={record.url} width={60} height={60}/>
        </div>
      ),
    },
    {
      title: '图片链接',
      align:"center",
      dataIndex: 'imgUrl',
      editable:false,
      search:false,
    },
    {
      title: '图片名',
      align:"center",
      dataIndex: 'imgName',
      editable:false,
      search:false,
    },
    {
      title: '图片大小',
      align:"center",
      dataIndex: 'size',
      editable:false,
      search:false,
    },

    {
      title: '对象链',
      align:"center",
      dataIndex: 'key',
      editable:false,
      search:false,
      hideInTable: true
    },
    {
      title: 'buketName',
      align:"center",
      dataIndex: 'buketName',
      editable:false,
      search:false,
      hideInTable: true
    },
    {
      title: 'secret_id',
      align:"center",
      dataIndex: 'secret_id',
      editable:false,
      search:false,
      hideInTable: true
    },
    {
      title: 'secret_key',
      align:"center",
      dataIndex: 'secret_key',
      editable:false,
      search:false,
      hideInTable: true
    },
    {
      title: 'region',
      align:"center",
      dataIndex: 'region',
      editable:false,
      search:false,
      hideInTable: true
    },

    {
      title: '操作',
      align:"center",
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a
          key="editable"
          onClick={async () => {
            const res = await deleteFile({
              buketName: record.buketName,
              key: record.key,
              secret_id: record.secret_id,
              secret_key: record.secret_key,
              region:record.region
            })
            if(res.code === 0 && res.data){
              actionRef.current?.reload()
              message.success('删除成功',1)

            }else{
              message.error(res.description,1)
            }

          }}

        >
          删除
        </a>,
      ],
    },
  ];
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      actionRef.current?.reload()

      message.success("上传成功",1)
    }
  };


  return (
    <div>
        <Upload
          name='file'
          showUploadList={false}
          action={ process.env.NODE_ENV === "production" ? PROD_Host + "/api/user/txCos"  : Host + "/api/user/txCos"}
          data={file=>({
            Raw:file,
            Name:file.name,
            path:'le_img'
          })}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button icon={<PlusCircleOutlined />} type="primary"   >
            添加
          </Button>
        </Upload>
      <ProTable<API.ImgReposed>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        style={{marginTop:"20px"}}
        request = {async () => {
          const buketName = initialState?.cosConfig?.tx_buket_name;
          const secret_id = initialState?.cosConfig?.tx_secret_id;
          const secret_key = initialState?.cosConfig?.tx_secret_key;
          const region = initialState?.cosConfig?.tx_region;
          const userList = await getCosFileList({
            buketName:buketName+"",
            prefix:"le_img",
            secret_id:secret_id+"",
            secret_key:secret_key+"",
            region:region+""
          })
          //todo
          const re =userList.data.objectSummaries
          newArray.length=0
          if(re[0] !== ""){
            for(let i = 0 ;i < re.length;i++){
              if(i > 0){
                newArray.push({
                  index:i + 1,
                  url:"https://"+buketName+".cos."+region+".myqcloud.com/"+re[i].key,
                  imgUrl:"https://"+buketName+".cos."+region+".myqcloud.com/"+re[i].key,
                  imgName:re[i].key.split("/")[1],
                  key:re[i].key,
                  size:(re[i].size/1024/1024).toFixed(2)+"MB",
                  buketName,
                  secret_id,
                  secret_key,
                  region,
                })
              }

            }

          }

          return {
            data: newArray
          }

        }}
        rowKey="url"
        search={false}
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
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="图片列表"></ProTable>

    </div>



  );
};
export default App;

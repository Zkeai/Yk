import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import {Host, PROD_Host} from "@/contants";
import type {RcFile} from "antd/es/upload/interface";
import {useModel} from "@@/plugin-model/useModel";

const { Dragger } = Upload;

type Props = Record<string, any>;



const beforeUpload = (file: RcFile) => {
  console.log(file.type)
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG/MP4 file!');

  }
  const isLt5M = file.size / 1024 / 1024 < 20;
  if (!isLt5M) {
    message.error('Image must smaller than 20MB!');

  }
  return isJpgOrPng && isLt5M;
};

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: process.env.NODE_ENV === "production" ? PROD_Host + "/api/file/upload"  : Host + "/api/file/upload",
};

const UpLoad: React.FC<Props> = (val: any) => {
  const {imgRef} =useModel("useXhsModel",(model: any)=> ({
    imgRef:model.imgRef,

  }))

  const handleUploadImg = (url: string) => {
    const last_url = imgRef?.current?.getFieldsValue().img_urls
    if(last_url === undefined || last_url === ""){
      imgRef?.current?.setFieldsValue({
        img_urls: url,
      });
    }else{
      imgRef?.current?.setFieldsValue({
        img_urls: last_url+'\n'+url,
      });
    }



  }


  return(
      <Dragger
        directory={true}
        beforeUpload={beforeUpload}
        {...props}
        onChange={(info)=>{
          const { status } = info.file;

          if (status === 'done') {
            const url = info.file.response.data
            handleUploadImg(process.env.NODE_ENV === "production" ?PROD_Host+url  : url)
            message.success(`${info.file.name} 文件上传成功.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
          }
        }}
        style={{display:`${val.display}`}}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">未选择文件/文件夹</p>
        <p className="ant-upload-hint">
          Chrome 和 FireFox 支持拖拽到此区域上传，支持选择多个文件
          仅支持JPG/PNG 单个文件最大支持5MB
        </p>
      </Dragger>


  )
};

export default UpLoad;

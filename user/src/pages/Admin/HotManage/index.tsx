import {Button, Form, Input, message, Space} from 'antd';
import React, {createRef, useEffect, useState} from 'react';
import { addHot, editHot, searchHot} from "@/services/ant-design-pro/api";


const App: React.FC = () => {
  const [formRef]: any=Form.useForm()
  const txtRef: any = createRef()
  const idRef: any =createRef()
  const [hotUrl,setHotUrl]=useState("")
  useEffect(()=>{
    const getHotList =async ()=>{
      const {data} = await searchHot();
      if(data !== null){
        setHotUrl(data[0]?.url)
        formRef.setFieldsValue({
          url:data[0]?.url,
          id:data[0]?.id
        })
      }


    }
    getHotList()
  },[])

const ChangeHot= async ()=>{
      const url = txtRef.current.input.value
      const id =idRef.current.input.value
      const res = await editHot({"id":id,"url":url})
      if(res.code === 0){
        message.success("热更新文件修改成功",2)
        setHotUrl(url)
      }else{
        message.error(res.description,2)
      }
}
  const onFinish = async (values: any) => {
    const url_ = values.url
    const res = await addHot(values)
    if(res.code === 0 && res.data !== ""){
      message.success("热更新文件添加成功",2)
      setHotUrl(url_)
    }else{
      message.error(res.description,2)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={formRef}
      name="basic"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="id"
        name="id"
        style={{display:"none"}}
      >
        <Input type="text" ref={idRef} style={{display:"none"}}/>
      </Form.Item>

      <Form.Item
        label="热更新主文件链接"
        name="url"
        rules={[{ required: true, message: '请输入链接!' }]}
      >
        <Input type="text" ref={txtRef}/>
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 2, span: 8 }}>
        <Space>
          <Button type="primary" htmlType="submit" disabled={hotUrl !=="" && hotUrl !==undefined}>
            增加
          </Button>

          <Button type="primary" htmlType="button" onClick={ChangeHot} disabled={hotUrl =="" || hotUrl == undefined}>
            修改
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;



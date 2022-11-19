import {Button, Form, Input, message,  Space} from "antd";
import "./index.css"
import {FireTwoTone} from "@ant-design/icons";
import {editCosConfig} from "@/services/ant-design-pro/api";
import {useEffect, useState} from "react";
import {useModel} from "@@/plugin-model/useModel";



function TxOss(){
  const { initialState } = useModel('@@initialState');
  const [key,setKey] = useState(0)
  const [form] = Form.useForm();

  useEffect(()=>{
    setKey(key+1)
  },[])


  const onFinish =async (values: any) => {
    const res = await editCosConfig(values);
    if(res.code === 0){
      message.success('配置成功',1)
      setKey(key + 1)
    }else{
      message.error('配置失败',1)
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo, 1).then()
  };


    return(

      <div>
        <div className="t-hint">
          <span className="img"><FireTwoTone /></span>
          <span className="content">腾讯云配置页，请完整填写下面的参数，如有疑问请访问 <a href="https://console.cloud.tencent.com/cos" target="_blank" rel="noreferrer">腾讯云COS</a></span>
        </div>


        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          initialValues={{
            id:initialState?.cosConfig?.id,
            tx_secret_id:initialState?.cosConfig?.tx_secret_id,
            tx_secret_key:initialState?.cosConfig?.tx_secret_key,
            tx_region:initialState?.cosConfig?.tx_region,
            tx_url:initialState?.cosConfig?.tx_url,
            tx_buket_name:initialState?.cosConfig?.tx_buket_name
          }}
        >
          <Form.Item label="id" name="id"  style={{display:'none'}}>
            <Input  placeholder="id"/>
          </Form.Item>

          <Form.Item label="密钥id(SecretId)" name="tx_secret_id" rules={[{ required: true, message: '请输入密钥id' }]}>
            <Input  placeholder="密钥id"/>
          </Form.Item>
          <span className="a-hint">密钥ID(SecretId)。</span>


          <Form.Item label="密钥(SecretKey)" name="tx_secret_key"  rules={[{ required: true, message: '请输入密钥' }]}>
            <Input placeholder="密钥" />
          </Form.Item>
          <span className="a-hint">密钥(SecretKey)。</span>


          <Form.Item label="所属地域" name="tx_region"  rules={[{ required: true, message: '请输入所属地域' }]}>
            <Input placeholder="所属地域(例如:ap-shanghai)"/>
          </Form.Item>
          <span className="a-hint">所属地域。</span>


          <Form.Item label="访问域名" name="tx_url" rules={[{ required: true, message: '请输入访问域名' }]}>
            <Input  placeholder="访问域名" />
          </Form.Item>
          <span className="a-hint">访问域名。</span>


          <Form.Item label="存储桶名称" name="tx_buket_name" rules={[{ required: true, message: '请输入存储桶名称' }]}>
            <Input placeholder="存储桶名称"/>
          </Form.Item>
          <span className="a-hint">存储桶名称。</span>

          <div className="ClassButton">
            <Space>
              <Form.Item>
                <Button type="primary" htmlType="submit">保存配置</Button>
              </Form.Item>
            </Space>
          </div>


        </Form>
      </div>
    )
}

export default TxOss;

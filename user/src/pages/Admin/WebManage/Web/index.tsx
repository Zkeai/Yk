import {Button, Form, Input, message, Space} from "antd";
import {FireTwoTone} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";
import {editWebConfig} from "@/services/ant-design-pro/api";
import {useEffect, useState} from "react";

function Index(){


  const { initialState } = useModel('@@initialState');
  const [key,setKey] = useState(0)
  useEffect(()=>{
    setKey(key+1)
  },[])

  const onFinish =async (values: any) => {
     const res = await editWebConfig(values);
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
          <div className="box-1">
            <h3 className="title">网站配置</h3>
          </div>

          <div className="t-hint">
            <span className="img"><FireTwoTone /></span>
            <span className="content">网站配置。包括欢迎页面手机安装包直链、API文档链接、工具库链接。</span>
          </div>

          <div>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                web_title:initialState?.webConfig?.web_title,
                icon_url:initialState?.webConfig?.icon_url,
                le_url:initialState?.webConfig?.le_url,
                api_url:initialState?.webConfig?.api_url,
                utils_url:initialState?.webConfig?.utils_url
              }}
            >


              <Form.Item style={{display:"none"}} label="网站标题" name="web_title" >
                <Input style={{display:"none"}}  placeholder="网站标题"/>
              </Form.Item>
              <span style={{display:"none"}} className="a-hint">网站标题。</span>

              <Form.Item style={{display:"none"}} label="icon" name="icon_url" >
                <Input style={{display:"none"}}  placeholder="网站图标"/>
              </Form.Item>
              <span style={{display:"none"}} className="a-hint">网站图标。</span>

              <Form.Item label="手机安装包" name="le_url"  >
                <Input placeholder="安卓端直链链接" />
              </Form.Item>
              <span className="a-hint">云控安卓端直链链接(建议配合蓝奏使用)。</span>


                <Form.Item label="API文档" name="api_url"  >
                <Input placeholder="API文档链接"/>
              </Form.Item>
              <span className="a-hint">API文档链接(外部接口)。</span>


              <Form.Item label="工具库" name="utils_url" >
                <Input  placeholder="工具库链接" />
              </Form.Item>
              <span className="a-hint">工具库链接，存放各种云控所需工具</span>


              <div className="ClassButton">
                <Space>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">保存配置</Button>
                  </Form.Item>

                </Space>
              </div>


            </Form>
          </div>
        </div>
    )
}

export default Index;

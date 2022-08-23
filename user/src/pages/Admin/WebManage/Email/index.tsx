import "./index.css"
import {FireTwoTone} from "@ant-design/icons";
import {Button, Form, Input, message, Select, Space} from "antd";
import {addEmail, editEmail, searchEmail, sendEmail} from "@/services/ant-design-pro/api";
import {useEffect} from "react";
import {decrypt} from "@/utils/aes";


const { Option } = Select;

function Index(){
  const [form] = Form.useForm();


  const temp: any = []

  useEffect( () => {
    const getEmailConfig = async () => {
      const {data} = await searchEmail();
      const res =decrypt(data).split(";")
      if(res[0] !== ""){
        for(let i = 0 ;i < res.length;i++){
          const m = JSON.parse(res[i])
          temp.push({
            id:m.id,
            fromEmail:m.fromEmail,
            password:m.password,
            typeEmail:m.typeEmail,
            toEmail:m.toEmail,
            title:m.title
          })
        }


      }

    }
    getEmailConfig().then(()=>{
      form.setFieldsValue({
        id:temp[0]?.id,
        typeEmail:temp[0]?.typeEmail,
        fromEmail:temp[0]?.fromEmail,
        password:temp[0]?.password,
        toEmail:temp[0]?.toEmail,
        title:temp[0]?.title
      })

    })



  }, [])


  const onFinish =async (values: any) => {
    message.warn("测试邮件会延迟20秒左右", 1).then()
   const res = await sendEmail(values);
    if(res.code === 0){
      message.success('测试发送邮件成功',1)
    }else{
      message.error('测试发送邮件失败',1)
    }

  };
  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo, 1).then()
  };
  const saveEmail = async ()=>{
    const id = form.getFieldValue("id")
    const typeEmail = form.getFieldValue("typeEmail")
    const fromEmail = form.getFieldValue("fromEmail")
    const password = form.getFieldValue("password")
    const title = form.getFieldValue("title")
    const toEmail = form.getFieldValue("toEmail")
    if(id === undefined){
      const res = await addEmail({typeEmail,fromEmail,password,title,toEmail});
      if(res.code === 0){
        message.success('增加邮箱配置成功',1)
      }else{
        message.error(res.message,1)
      }
    }else{
      const res = await editEmail({id,typeEmail,fromEmail,password,title,toEmail});
      if(res.code === 0){
        message.success('修改邮箱配置成功',1)
      }else{
        message.error(res.description,1)
      }
    }

  }


    return(
        <div>
          <div className="box-1">
            <h3 className="title">SMTP配置</h3>
          </div>


          <div className="t-hint">
              <span className="img"><FireTwoTone /></span>
              <span className="content">本系统默认内置SMTP发信功能，如果你想使用其他邮件服务，请通过安装插件来使用。</span>
          </div>

          <div>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              form={form}
            >

              <Form.Item
                name="id"
                label="用户ID"
                style={{display:"none"}}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item  label="SMTP_SERVICE"  name="typeEmail" rules={[{ required: true, message: '请选择邮箱服务商' }]}>
                <Select
                  placeholder="邮箱服务商"
                  allowClear
                >
                  <Option value="QQ">QQ</Option>
                  <Option value="163">163</Option>
                </Select>
              </Form.Item>
              <span className="a-hint">邮件通知邮箱服务商。</span>


              <Form.Item label="SMTP_USER" name="fromEmail" rules={[{ required: true, message: '请输入邮箱账号' }]}>
                  <Input  placeholder="邮件通知邮箱账号"/>
              </Form.Item>
              <span className="a-hint">邮件通知邮箱账号。</span>


              <Form.Item label="SMTP_PASS" name="password"  rules={[{ required: true, message: '请输入邮箱授权码(非登陆密码)' }]}>
                  <Input.Password placeholder="邮箱授权码" />
              </Form.Item>
              <span className="a-hint">邮件通知邮箱密码，QQ、163邮箱请填写授权码。</span>


              <Form.Item label="SENDER_Title" name="title"  rules={[{ required: true, message: '请输入邮件标题' }]}>
                  <Input placeholder="邮件通知标题"/>
              </Form.Item>
              <span className="a-hint">邮件通知标题。</span>


              <Form.Item label="SEND_EMAIL" name="toEmail" rules={[{ required: true, message: '请输入接收方邮箱账号' }]}>
                  <Input  placeholder="接收方邮箱账号" />
              </Form.Item>
              <span className="a-hint">邮件通知邮箱账号。</span>


              <Form.Item label="CONTENT" name="content">
                  <Input placeholder="邮件内容(测试专用)"/>
              </Form.Item>
              <span className="a-hint">邮件通知内容。仅发送测试邮件</span>

              <div className="ClassButton">
                <Space>
                <Form.Item>
                  <Button type="primary" htmlType="submit">发送测试邮件(Send Test Message)</Button>
                </Form.Item>

                <Form.Item >
                  <Button type="primary"  style={{backgroundColor: "green"}} onClick={saveEmail}>保存配置(Save Config)</Button>
                </Form.Item>
                </Space>
              </div>


            </Form>
          </div>

        </div>
    )
}

export default Index;

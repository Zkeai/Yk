import {
  createFromIconfontCN,

  LockOutlined,

  SafetyOutlined,
  UserOutlined,

} from '@ant-design/icons';
import {message, Space, Tabs} from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history } from 'umi';
import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {SYSTEM_LOGO,PROD_Host} from "@/contants";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');


  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword,checkPassword}  =values
    //校验
    if(userPassword !== checkPassword){
      message.error("两次输入的密码不一致");
      return;
    }

    try {

      //注册
      const res = await register({ ...values});
      if (res.code === 0 && res.data > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname:'/user/login',
          query,
        });
        return;
      }else{
        message.error(res.description);
      }

    } catch (error: any) {
      //const defaultLoginFailureMessage = '注册失败，请重试！';
      //message.error(error.message ?? defaultLoginFailureMessage);
    }
  };


  function verifyClick() {
    const verify: any =  document.getElementById("verifyImg");
    verify.src= process.env.NODE_ENV === "production" ?PROD_Host+"/api/user/getVerify?"+ Math.random() :"/api/user/getVerify?"+ Math.random();
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={
            {
              searchConfig: {
                submitText: '注册'
              }
            }
          }
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="乐云星球"
          subTitle={'【LeCloud】一体化云控系统'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码注册'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix:<IconFont   type="icon-youxiang"/>,
                }}
                placeholder={'邮箱'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                ]}
              />
              <Space>
                <ProFormText
                  name="verify"
                  fieldProps={{
                    size: 'large',
                    prefix:<SafetyOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={'验证码'}
                  rules={[
                    {
                      required: true,
                      message: '验证码是必填项！',
                    },
                  ]}
                />
                <img id="verifyImg" onClick={verifyClick} className="ant-form-item-control-input-content" style={{height:"40px",marginTop:"-29px"}} src={process.env.NODE_ENV === "production" ?PROD_Host+"/api/user/getVerify?"+ Math.random() :"/api/user/getVerify?"+ Math.random()} alt=""/>
              </Space>
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'登录密码'}
                rules={[
                  {
                    required: true,
                    message: '登录密码是必填项！',
                  },
                  {
                    min: 8,
                    type:"string",
                    message: '长度不能少于8位！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'二次密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type:"string",
                    message: '长度不能少于8位',
                  },
                ]}
              />
            </>
          )}

        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

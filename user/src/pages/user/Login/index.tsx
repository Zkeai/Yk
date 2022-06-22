import {

  LockOutlined,


  UserOutlined,

} from '@ant-design/icons';
import {  message, Tabs , Space} from 'antd';
import React, { useState } from 'react';
import {  ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
// @ts-ignore
import {history, Link, useModel} from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/contants";
//import {ws} from '@/utils/WebSocket'





const Login: React.FC = () => {
  //const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');




  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s: any) => ({ ...s, currentUser: userInfo }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({ ...values, type });
      if (user.code === 0) {

        // ws().onopen = function () {
        // }




        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }else{
        message.error(user.description)
      }



    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="乐云星球"
          subTitle={'【LeCloud】 一体化云控系统'}
          initialValues={{
            autoLogin: true,
          }}

          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码登录'} />
          </Tabs>


          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type:"string",
                    message: '长度不能少于8位！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >

            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Space style={{float:'right'}}>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
            <Link to={'/user/register'}>免费注册</Link>
            </Space>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

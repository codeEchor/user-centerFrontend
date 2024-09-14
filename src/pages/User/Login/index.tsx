import Footer from '@/components/Footer';
import { userLoginUsingPost } from '@/services/backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';


const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const handleSubmit = async (values: API.UserLoginRequest) => {

    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values,
      });

      if(res)
      {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // 保存已登录用户信息
        // @ts-ignore
        setInitialState({
          ...initialState,
           currentUser:res,
        });
        localStorage.setItem("LoginUser",JSON.stringify(res))
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }

    } catch (error: any) {
      const defaultLoginFailureMessage = `登录失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" style={{ height: '100%' ,width:'100%'}} src="https://tse2-mm.cn.bing.net/th/id/OIP-C.NRp5rqylL_HBsAPVj2QUjQHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />}
          title="桂林信科学生中心"
          subTitle={'著名高校，世界500强'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
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
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min:8,
                    type:"string",
                    message: '长度不低于8位！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
              //textAlign: 'right',
              display:"flex",
              justifyContent:"space-between"
            }}
          >
            <a href="https://space.bilibili.com/505120688?spm_id_from=333.1007.0.0" target="_blank" rel="noreferrer" >忘记密码，请联系管理员</a>
            <Link to="/user/register">新用户注册</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;

import { ProCard } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Space,
  Upload,
  UploadProps
} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {FormProps} from "antd/lib";
import {GetcurrentUser, updateUserInfo} from "@/services/backend/userController";



// @ts-ignore
const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))
const props: UploadProps = {
  name: 'file',
  action: '/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      //头像更新成功
      message.success(`${info.file.name}，头像上传成功！`);
      LoginUser.avatarUrl=info.file.response.data;
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name}，头像删除失败`);
    }
  },
};
type FieldType = {
  id?:number;
  userName?: string;
  gender?: number;
  phone?: string;
  email?:string;
};
export default () => {
  const [form] = Form.useForm();
  //const { initialState } = useModel('@@initialState');
 // let { currentUser } = initialState || {};
  // @ts-ignore
  const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetcurrentUser()
        localStorage.setItem("LoginUser",JSON.stringify(response))

      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const onFinish: FormProps<FieldType>['onFinish'] =async (values) => {
    //表单填写完成提交，执行该方法
    try {
     const res= await updateUserInfo({
          ...values
        })
      if(res)
      {
        //更新成功
        const defaultLoginSuccessMessage = '更新成功！';
        const updateUser=await GetcurrentUser()
        localStorage.setItem("LoginUser",JSON.stringify(updateUser))
        message.success(defaultLoginSuccessMessage);
        return;
      }else{
        throw new Error('update error')
      }
    }catch (error:any)
    {
      const defaultLoginFailureMessage = `更新失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [value, setValue] = useState(0);
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  function formatDate(date:Date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }



  // @ts-ignore
  return (

      <ProCard
        title="用户信息"
        extra={formatDate(new Date())}
        headerBordered
      >
        <ProCard title="基本设置" colSpan="50%">
          <div >
            <Form
              layout='vertical'
              form={form}
              initialValues={{id:LoginUser?.id, userName: LoginUser?.userName,gender:LoginUser?.gender,phone:LoginUser?.phone,email:LoginUser?.email}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: 600 }}
              size="large"
            >
              <Form.Item<FieldType >
                 name="id"
                 hidden={true}>
              </Form.Item>
              <Form.Item<FieldType>
                label="昵称" name="userName"
                rules={[{ required: true, message: '请填写用户名' }]}>
                <Input placeholder="请输入昵称" />
              </Form.Item>
              <Form.Item<FieldType> label="性别" name="gender" rules={[{ required: true, message: '请选择您的性别' }]}>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={0}>女</Radio>
                  <Radio value={1}>男</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item<FieldType> label="电话" name="phone" rules={[{ required: true, message: '请填写电话' },
                { type:"string", len:11, message: '长度为11位' }]}>
                <Input placeholder="请输入电话" />
              </Form.Item>
              <Form.Item<FieldType> label="邮箱" name="email" rules={[{ required: true, message: '请填写邮箱' }]}>
                <Input placeholder="请输入邮箱" />
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit">更新基本信息</Button>
              </Form.Item>
            </Form>

          </div>
        </ProCard>

        <ProCard title="头像" layout="default" direction="column">
          <Space direction="vertical" size="large" style={{display: 'flex'}} align='center'>
            <div><img
              width={400}
              height={400}
              style={{borderRadius:200}}
              src={LoginUser?.avatarUrl ||'https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}
             // fallback="data:image/png;base64,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"
            />
            </div>
            <div>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </div>
          </Space>
        </ProCard>

      </ProCard>


  );
};

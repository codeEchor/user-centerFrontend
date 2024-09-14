import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {Button, message, Space, Tag, Typography} from 'antd';
import {useRef, useState} from 'react';

import {deleteUserUsingPost, searchUser} from "@/services/backend/userController";
import UpdateModal from "@/pages/Admin/User/components/UpdateModal";
import CreateModal from "@/pages/Admin/User/components/CreateModal";
import {history} from "@@/exports";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

export default () => {
 // const actionRef = useRef<ActionType>();
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.LoginUserVO>();
// @ts-ignore
  const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.LoginUserVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteUserUsingPost({
        id: row.id as any,
      });
      hide();
      if(row.id===LoginUser.id)
      {
        //把自己刪除了，直接去登录页
        history.push('/user/login');
        localStorage.removeItem("LoginUser");
      }
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };
  const columns: ProColumns<API.LoginUserVO>[] = [
    {
      title: '学号',
      dataIndex: 'studentId',
      valueType: 'text',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },

    {
      title: '昵称',
      dataIndex: 'userName',
      valueType: 'text',
    },
    // {
    //   title: '头像',
    //   dataIndex: 'userAvatar',
    //   valueType: 'image',
    //   render:(_, record)=> (
    //     <div>
    //       <Image src={record.avatarUrl} width={50} height={50}></Image>
    //     </div>
    //   ),
    // fieldProps: {
    //     width: 64,
    //   },
    //   hideInSearch: true,
    //
    // },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'text',
      valueEnum:{
        0:{
          text: '女'
        },
        1:{
          text:'男'
        }
      }
    },
    {
      title: '电话',
      dataIndex: 'phone',
      valueType: 'text',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      render: (_, record) => (
        <Space>
          {<Tag color={record.status===0 ? "green" : "red"}>{record.status===0 ? "正常" : "失效"}</Tag>}
        </Space>
      ),
    },

    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: {
        0: {
          status:"Processing",
          text: '用户',
        },
        1: {
          status:"success",
          text: '管理员',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)} >
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <><ProTable<API.LoginUserVO>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            setCreateModalVisible(true);
          }}
        >
          <PlusOutlined/> 新建
        </Button>,
      ]}
      request={async (params, sort, filter) => {

        const userList = await searchUser();
        return {
          data: userList
        };

      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}/>

      <CreateModal
      visible={createModalVisible}
      columns={columns}
      onSubmit={() => {
        setCreateModalVisible(false);
        actionRef.current?.reload();
      }}
      onCancel={() => {
        setCreateModalVisible(false);
      }}/><UpdateModal
      visible={updateModalVisible}
      columns={columns}
      oldData={currentRow}
      onSubmit={() => {
        setUpdateModalVisible(false);
        setCurrentRow(undefined);
        actionRef.current?.reload();
      }}
      onCancel={() => {
        setUpdateModalVisible(false);
      }}/></>
  );
};

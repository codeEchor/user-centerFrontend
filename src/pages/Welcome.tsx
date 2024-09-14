import {
  SmileOutlined,
  SolutionOutlined, TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import {PageContainer, ProCard} from '@ant-design/pro-components';
import '@umijs/max';
import {Card, Col, Image, Statistic, Steps,} from 'antd';
import React from 'react';
import {useModel} from "@@/exports";


const Admin: React.FC = () => {

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {} ;
  const status=currentUser?.userRole===1 ? 'finish' : 'process';
  return (
    <PageContainer content={<h2>当前您的身份是：{currentUser?.userRole===1 ? '管理员' : '普通用户'}</h2>}>
      <Card size='default'>
        <div style={{height:400}}>
          <Steps
            current={2}
            status={status}
            items={[
              {
                title: 'Login',
                icon: <UserOutlined />,
              },
              {
                title: 'Verification',
                icon: <SolutionOutlined />,
              },
              {
                title: 'Become Administrator',
                 icon:<TeamOutlined />,
              },
              {
                title: 'Done',
                status:'finish',
                icon: <SmileOutlined />,
              },
            ]}
          />
          <Col span={24} style={{ marginTop: 32 }}>
            <Statistic  title="在线用户" value={5421} />
          </Col>
          <ProCard title="展开" ghost gutter={8} collapsible>
            <ProCard layout="center" bordered>
              <div style={{height:150}}>
                如果您是管理员，您有权查看所有用户的基本信息！！！
              </div>
            </ProCard>
            <ProCard layout="center" bordered>
              <Image src="https://tse2-mm.cn.bing.net/th/id/OIP-C.dqKJ6xt0seQgbaCtrnmb6AHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
            </ProCard>
            <ProCard layout="center" bordered>
              <div style={{height: 150}}>
                如果您不是管理员，您只能查看自己的基本信息！！！
                若想成为管理员，请联系<a href="https://space.bilibili.com/505120688?spm_id_from=333.1007.0.0" target="_blank"
                                        rel="noreferrer">管理员</a>
              </div>
            </ProCard>
          </ProCard>

        </div>

      </Card>

    </PageContainer>
  );
};
export default Admin;

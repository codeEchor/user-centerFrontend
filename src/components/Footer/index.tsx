import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '程序员二虎';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'schoolNav',
          title: '学校导航',
          href: 'https://guit.edu.cn/',
          blankTarget: true,
        },
        {
          key: 'educational',
          title: '教务中心',
          href: 'http://172.16.18.132/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> 二虎源码
            </>
          ),
          href: 'https://github.com/liuzheng165',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;

import { ProCard } from '@ant-design/pro-components';
import {Card, Col, Divider, Flex, Input, InputRef, Row, Space, Tag, theme, Tooltip} from 'antd';
import {Avatar, Typography} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {
  CommentOutlined,
  HomeOutlined,
  IdcardOutlined,
  PhoneOutlined,
  PlusOutlined,
  SendOutlined, TikTokOutlined,

} from "@ant-design/icons";
import {Text} from "antd-mobile-alita";
import {GetcurrentUser} from "@/services/backend/userController";


const { Title } = Typography;
const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};
const { Meta } = Card;

export default () => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>(['很有想法的', '专注设计', '辣~','大长腿','川妹子','海纳百川']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
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
  // @ts-ignore
  const LoginUser=JSON.parse(localStorage.getItem("LoginUser"))
  useEffect(   () => {
    if (inputVisible) {
      inputRef.current?.focus();
    }

  }, [inputVisible]);

// eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };
  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };
  return (
    <>
      <ProCard
        direction="column"
        ghost
        gutter={{
          xs: 8,
          sm: 8,
          md: 8,
          lg: 8,
          xl: 8,
          xxl: 8,
        }}
      >
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost >

        <ProCard bordered layout="default"  direction="column" wrap={true}>
          <Space direction="vertical" size="small" style={{display: 'flex'}} align='center' >
            <img
             width={100}
             height={100}
             style={{borderRadius:50}}
              src={LoginUser?.avatarUrl || 'https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' }
              //icon={<UserOutlined />}
            />

            <Title level={4} style={{marginBottom: -2, marginTop: 5}}>{LoginUser?.userName ?? '无名'}</Title>
            <Text>学号：<span>{LoginUser?.studentId}</span></Text>
            <div >
              <Divider orientation="left"><IdcardOutlined/><span style={{marginLeft: 5}}>基本信息</span></Divider>
              <dl>

                <dd><SendOutlined/><span style={{marginLeft: 5}}>性别：{LoginUser?.gender===null ? '暂无' :LoginUser?.gender===1 ? '男' : '女'}</span>
                </dd>
                <dd><PhoneOutlined/><span style={{marginLeft: 5}}>电话：{LoginUser?.phone===null ? '暂无' : LoginUser?.phone}</span></dd>
                <dd><CommentOutlined /><span style={{marginLeft: 5}}>邮箱：{LoginUser?.email===null ? '暂无' : LoginUser?.email}</span></dd>
              </dl>
              <dl>
                <dt><IdcardOutlined/><span style={{marginLeft: 5}}>抖音点赞专家</span></dt>
                <dd><TikTokOutlined /><span style={{marginLeft: 5}}>抖音－前端事业群－视频平台部－视频技术部－CEO</span>
                </dd>
                <dd><HomeOutlined/><span style={{marginLeft: 5}}>浙江省杭州市</span></dd>
              </dl>
            </div>
          </Space>
          <Divider orientation="left">标签</Divider>
          <Flex gap="4px 0" wrap>
            {tags.map<React.ReactNode>((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              // @ts-ignore
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable={false}
                  style={{userSelect: 'none'}}
                  onClose={() => handleClose(tag)}
                >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={tagPlusStyle} icon={<PlusOutlined/>} onClick={showInput}>

              </Tag>
            )}
          </Flex>
          <Divider/>
          <div>
            <p>社团</p>
            <Row gutter={[48, 16]} justify='end'>
              <Col span={12} >
                <a href="https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927" target='_blank' rel="noreferrer"><Avatar src="https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                                                                                                                                                                                                     size='small'></Avatar><span style={{marginLeft: 5}}>唱歌社</span></a></Col>
              <Col span={12} > <a href="https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927" target='_blank' rel="noreferrer"><Avatar src="https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                                                                                                                                                                                                                    size='small'></Avatar><span style={{marginLeft: 5}}>跳舞社</span></a></Col>
              <Col span={12} > <a href="https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927" target='_blank' rel="noreferrer"><Avatar src="https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                                                                                                                                                                                                                    size='small'></Avatar><span style={{marginLeft: 5}}>篮球社</span></a></Col>
              <Col span={12} > <a href="https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927" target='_blank' rel="noreferrer"><Avatar src="https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                                                                                                                                                                                                                    size='small'></Avatar><span style={{marginLeft: 5}}>rap社</span></a></Col>
              <Col span={12} > <a href="https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927" target='_blank' rel="noreferrer"><Avatar src="https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                                                                                                                                                                                                                    size='small'></Avatar><span style={{marginLeft: 5}}>电竞社</span></a></Col>
              <Col span={12} > <a href="https://www.bilibili.com/video/BV1ct4y1n7t9/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927" target='_blank' rel="noreferrer"><Avatar src="https://img0.baidu.com/it/u=3910541082,378875540&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                                                                                                                                                                                                                    size='small'></Avatar><span style={{marginLeft: 5}}>足球社</span></a></Col>
            </Row>
          </div>

        </ProCard>

        <ProCard colSpan="65%" bordered>
          <Divider>待学习</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <a href="https://www.bilibili.com/video/BV1ZB4y1Z7o8/?spm_id_from=333.337.search-card.all.click">

                <Card bordered={false} size='small' hoverable
                      cover={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png"/>}>
                  <Meta title="React" description="用代码和标签编写组件。"/>
                </Card>
              </a>

            </Col>
            <Col span={12}>
              <a href="https://www.bilibili.com/video/BV1HV4y1a7n4/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927">

                <Card bordered={false} size='small' hoverable
                      cover={<img  src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png" />}>
                  <Meta title="Vue" description="30天，快速入门vue3" />
                </Card>
              </a>

            </Col>
            <Col span={12}>
              <a href="https://www.bilibili.com/video/BV17F411T7Ao/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927">
                <Card  bordered={false} size='small' hoverable
                       cover={<img  src="https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png" />}>
                  <Meta title="JAVA" description="JAVA是世界最好的语言" />
                </Card>

              </a>

            </Col>
            <Col span={12}>
              <a href="https://www.bilibili.com/video/BV1n84y1i7td/?spm_id_from=333.337.search-card.all.click&vd_source=623b18feeaef3745f23a61c61c0da927">
                <Card bordered={false} size='small' hoverable
                      cover={<img  src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png" />}>
                  <Meta title="Linux" description="一周带你深入浅出Linux操作系统"/>
                </Card>
              </a>
            </Col>
          </Row>
        </ProCard>
      </ProCard>
    </>
  );
};

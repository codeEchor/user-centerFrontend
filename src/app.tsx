import Footer from '@/components/Footer';
import { GetcurrentUser} from '@/services/backend/userController';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { AvatarDropdown } from './components/RightContent/AvatarDropdown';
import { requestConfig } from './requestConfig';
import {InitialState} from "@/typings";

const isDev=process.env.NODE_ENV==='development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    currentUser: undefined,
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    try {

      initialState.currentUser=await GetcurrentUser()
      localStorage.setItem("LoginUser",JSON.stringify(initialState.currentUser))
    } catch (error: any) {
      // 如果未登录
      history.push(loginPath)
    }

    // 模拟登录用户
    // const mockUser: API.LoginUserVO = {
    //   userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    //   userName: 'yupi',
    //   userRole: 'admin',
    // };
    // initialState.currentUser = mockUser;
  }
  return initialState;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    avatarProps: {
      render: () => {
        return <AvatarDropdown />;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange:async ()=>{
     // const {location} =history
     //   const whileList=['/user/register',loginPath]
     //   if(whileList.includes(location.pathname))
     //   {
     //     return;
     //   }
     //   if(!initialState?.currentUser)
     //   {
     //     alert('gg')
     //     history.push(loginPath);
     //   }
     //
     //  console.log(initialState.currentUser)
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...defaultSettings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;

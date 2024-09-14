// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  //API.DeleteRequest
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}
/** getLoginUser GET /api/user/current */
export async function GetcurrentUser(options?: { [key: string]: any }) {
  return request<API.LoginUserVO>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}
/** getUserVOById GET /api/user/get/vo */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO_>('/api/user/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByPage POST /api/user/list/page */
export async function listUserByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUser_>('/api/user/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserVOByPage POST /api/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO_>('/api/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 条件查询用户列表 POST /api/user/search */
export async function searchUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
 // params: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.LoginUserVO[]>('/api/user/search', {
    method: 'GET',
    // params: {
    //   ...params,
    // },
    ...(options || {}),
  });
}
/** 用戶登录 POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.LoginUserVO>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLoginByWxOpen GET /api/user/login/wx_open */
export async function userLoginByWxOpenUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userLoginByWxOpenUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLoginUserVO_>('/api/user/login/wx_open', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}
/** userLogout POST /api/user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/loginOut', {
    method: 'POST',
    ...(options || {}),
  });
}
/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.registerRes>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 普通用户数据更新 POST /api/user/update */
export async function updateUserInfo(
  body: API.UserUpdateBySelf,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/updateByAdmin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateMyUser POST /api/user/update/my */
export async function updateMyUserUsingPost(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

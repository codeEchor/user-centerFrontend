export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
   { path: '/welcome', icon: 'smile', component: './Welcome', name: '欢迎页' },
  { path: '/account', icon: 'user',  name: '个人页',
    routes: [
      {path: '/account/center',component: './Account/center',name:'个人中心'},
      {path: '/account/settings',component: './Account/settings',name:'个人设置'},
    ]
  },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];


export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/Register' },

      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin/user-manage', name: '用户管理', icon: 'team', component: './Admin/UserManage' },
      { path: '/admin/script-manage',name: '脚本管理',  icon: 'smile', component: './Admin/ScriptManage'},

      { component: './404' },
    ],
  },
  {
    path: '/center',
    name: '用户中心',
    icon: 'user',
    access: '',
    routes: [
      { name: '用户管理', path: 'info', icon: 'smile', component: './user/UserCenter'},
      { component: './404' },
    ],
  },

  {
    path: '/cdk',
    name: '卡密系统',
    icon: 'creditCard',
    access: 'canKami',
    component: './Admin',
    routes: [
      { name: '卡密管理', path: 'kami', component: './kami/CdkCenter'},
      { name: '应用管理', path: 'apply', component: './kami/ApplicationManage'},
      { name: '时长管理', path: 'time', component: './kami/TimeType'},
      { component: './404' },
    ],
  },

  {
    path: '/device',
    name: '云控中心',
    icon: 'user',
    routes: [
      {
        path: 'equipment',
        name: '设备',
        routes: [
          { name: '安卓设备', path: 'phone', icon: 'smile', component: './DeviceCenter/Equipment/Phone'},
          { name: '分组管理', path: 'group', component: './DeviceCenter/Equipment/Group'},
          { component: './404' },
        ],
      },
      {
        path: 'script',
        name: '脚本',
        routes: [
          { name: 'DY系列', path: 'DY', component: './DeviceCenter/Script/DY'},

          { component: './404' },
        ],
      },
      {
        path: 'task',
        name: '任务',
        routes: [
          { name: '任务列表', path: 'release', component: './DeviceCenter/Task/Release'},

          { component: './404' },
        ],
      },

      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];

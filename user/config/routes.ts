
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
      { path: '/admin/user-manage', name: '用户管理', icon: 'RedditCircleFilled', component: './Admin/UserManage' },
      { path: '/admin/script-manage',name: '脚本管理',  icon: 'CodeSandboxSquareFilled', component: './Admin/ScriptManage'},

      { component: './404' },
    ],
  },
  {
    path: '/center',
    name: '用户中心',
    icon: 'user',
    access: '',
    routes: [
      { name: '用户管理', path: 'info', icon: 'QqCircleFilled', component: './user/UserCenter'},
      { component: './404' },
    ],
  },

  {
    path: '/cdk',
    name: '卡密系统',
    icon: 'CreditCardOutlined',
    access: 'canKami',
    component: './Admin',
    routes: [
      { name: '卡密管理', path: 'kami', icon:'PropertySafetyFilled',component: './kami/CdkCenter'},
      { name: '应用管理', path: 'apply', icon:'CloudFilled',component: './kami/ApplicationManage'},
      { name: '时长管理', path: 'time', icon:'GoogleSquareFilled',component: './kami/TimeType'},
      { component: './404' },
    ],
  },

  {
    path: '/device',
    name: '云控中心',
    icon: 'CloudUploadOutlined',
    routes: [
      {
        path: 'equipment',
        name: '设备',
        icon:'RedditCircleFilled>',
        routes: [
          { name: '安卓设备', path: 'phone', icon: 'MobileFilled', component: './DeviceCenter/Equipment/Phone'},
          { name: '分组管理', path: 'group',icon:'InstagramFilled', component: './DeviceCenter/Equipment/Group'},
          { component: './404' },
        ],
      },
      {
        path: 'script',
        name: '脚本',
        icon:'CodeFilled',
        routes: [
          { name: 'DY系列', icon:'YoutubeFilled', path: 'DY', component: './DeviceCenter/Script/DY'},

          { component: './404' },
        ],
      },
      {
        path: 'task',
        name: '任务',
        icon:'ContainerFilled',
        routes: [
          { name: '任务列表',icon:'ContainerFilled', path: 'release', component: './DeviceCenter/Task/Release'},

          { component: './404' },
        ],
      },

      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];

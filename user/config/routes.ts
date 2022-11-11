export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: '注册',
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome/Welcome',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',

    routes: [
      {
        path: '/admin/user-manage',
        name: '用户管理',
        icon: 'RedditCircleFilled',
        access: 'canAdmin',
        component: './Admin/UserManage',
      },
      {
        path: '/admin/script-manage',
        name: '脚本管理',
        access: 'canAdmin',
        icon: 'CodeSandboxSquareFilled',
        component: './Admin/ScriptManage',
      },
      {
        path: '/admin/web',
        name: '网站管理',
        icon: 'CodeSandboxSquareFilled',
        component: './Admin/WebManage',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/center',
    name: '用户中心',
    icon: 'user',
    access: '',
    routes: [
      {
        name: '用户管理',
        path: 'info',
        icon: 'QqCircleFilled',
        component: './user/UserCenter',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/cdk',
    name: '卡密系统',
    icon: 'CreditCardOutlined',
    access: 'canKami',
    component: './Admin',
    routes: [
      {
        name: '卡密管理',
        path: 'kami',
        icon: 'PropertySafetyFilled',
        component: './kami/CdkCenter',
      },
      {
        name: '应用管理',
        path: 'apply',
        icon: 'CloudFilled',
        component: './kami/ApplicationManage',
      },
      {
        name: '时长管理',
        path: 'time',
        icon: 'GoogleSquareFilled',
        component: './kami/TimeType',
      },
      {
        component: './404',
      },
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
        icon: 'RedditCircleFilled>',
        routes: [
          {
            name: '安卓设备',
            path: 'phone',
            icon: 'MobileFilled',
            component: './DeviceCenter/Equipment/Phone',
          },
          {
            name: '分组管理',
            path: 'group',
            icon: 'InstagramFilled',
            component: './DeviceCenter/Equipment/Group',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'script',
        name: '脚本',
        icon: 'CodeFilled',
        routes: [
          {
            name: 'DY系列',
            icon: 'YoutubeFilled',
            path: 'DY',
            component: './DeviceCenter/Script/DY/DY.tsx',
          },
          {
            name: 'ZH系列',
            icon: 'ZhihuSquareFilled',
            path: 'ZH',
            component: './DeviceCenter/Script/ZH',
          },
          {
            name: 'XHS系列',
            icon: 'InstagramFilled',
            path: 'XHS',
            component: './DeviceCenter/Script/XHS',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: 'task',
        name: '任务',
        icon: 'ContainerFilled',
        routes: [
          {
            name: '任务列表',
            icon: 'ContainerFilled',
            path: 'release',
            component: './DeviceCenter/Task/Release',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: 'resource',
    name: '资源管理',
    icon: 'BarsOutlined',
    routes: [
      {
        name: '词库',
        icon: 'ProfileFilled ',
        path: 'release',
        routes: [
          {
            name: '词库分组',
            icon: 'ProfileTwoTone',
            path: 'keyGroup',
            component: './Resource/Key/KeyGroup',
          },
          {
            name: '词库',
            icon: 'ProjectTwoTone',
            path: 'keyWord',
            component: './Resource/Key/KeyWord',
          }
        ]
      },
      {
        name: '话术',
        icon: 'ProfileFilled ',
        path: 'comment',
        routes: [
          {
            name: '话术分组',
            icon: 'ProfileTwoTone',
            path: 'comGroup',
            component: './Resource/Comments/ComGroup.tsx',
          },
          {
            name: '话术',
            icon: 'ProjectTwoTone',
            path: 'comments',
            component: './Resource/Comments/Comments.tsx',
          }
        ]
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/',
    redirect: './welcome',
  },
  {
    path: 'issue',
    name: '常见问题',
    icon: 'InfoCircleOutlined',
    component: './Issue/Issue'
  },
  {
    path: 'log',
    name: '访问日志',
    icon: 'CalendarOutlined',
    component: './Log/Log'
  },
  {
    component: './404',
  },
];

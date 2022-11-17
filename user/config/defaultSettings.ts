import { Settings as LayoutSettings } from '@ant-design/pro-layout';




const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '云控管理',
  pwa: false,
  logo: "https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/userCenterAvatar/4.png",
  iconfontUrl: '',
};

export default Settings;

import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading, SettingDrawer} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history, Link, RequestConfig} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser, currentWebConfig} from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import {decrypt} from "@/utils/aes";
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';
/**
 * 无需用户登录态的页面
 */
const NO_NEED_LOGIN_WHITE_LIST =[registerPath,loginPath];
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 *运行时配置
 */
export const request: RequestConfig = {
  timeout: 10000000,
};


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  emailConfig?: API.searchEmail;
  webConfig?: API.searchWebConfig;
  loading?: boolean;
  fetchEmailConfig?: () => Promise<API.searchEmail | undefined>;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchWebConfig?: () => Promise<API.searchWebConfig | undefined>
}> {
  //获取webConfig
  const fetchWebConfig = async () => {
    try {
      const result = await currentWebConfig();
      return JSON.parse(decrypt(result.data));
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  //获取userinfo
  const fetchUserInfo = async () => {
    try {
      const result = await queryCurrentUser();
      return JSON.parse(decrypt(result.data));
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // const fetchEmailConfig = async () => {
  //   try {
  //     const result = await searchEmail();
  //     return JSON.parse(decrypt(result.data));
  //   } catch (error) {
  //     history.push(loginPath);
  //   }
  //   return undefined;
  // };


  // 如果是无需登录态的页面，不执行
  if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname)) {

    return {
      fetchUserInfo,
      fetchWebConfig,
      settings: defaultSettings,
    };

  }
  const currentUser = await fetchUserInfo();
  //const emailConfig = await fetchEmailConfig();
  const webConfig = await fetchWebConfig();
  return {
    fetchUserInfo,
    fetchWebConfig,
    webConfig,
    currentUser,
    settings: defaultSettings,
  };
}



export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {

// 南极客 修补：二级图标正常显示2021.7.8

    menuItemRender: (menuItemProps, defaultDom) => {

      if (

        menuItemProps.isUrl || !menuItemProps.path) {

        return defaultDom;

      }

// 支持二级菜单显示icon

      return (

        <Link to={menuItemProps.path}>

          {menuItemProps.pro_layout_parentKeys

            && menuItemProps.pro_layout_parentKeys.length > 0 &&

            menuItemProps.icon}{defaultDom}

        </Link>

      );

    },

    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username || initialState?.currentUser?.userAccount,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      //设置登录页 注册页白名单

      if(NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)){
        return ;
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          // <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          //   <LinkOutlined />
          //   <span>OpenAPI 文档</span>
          // </Link>,
          // </Link>,
        ]
      : [

      ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                })).then(() => {});
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,

  };
};

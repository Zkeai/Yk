/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {notification} from 'antd';

import {PROD_Host} from "@/contants"
/**
 * 配置request请求时的默认参数
 */
const request = extend({

  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === "production" ? PROD_Host : undefined //环境配置
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options,
      headers: {

      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {

  const {url, status} = response;
  if (url.indexOf('/system/oauth/token') !== -1) {
    return response;
  }
  // 返回下载流的问题,可以在url添加标识
  if (url.indexOf('/download/') !== -1) {
    if (status !== 200) {
      notification.error({
        message: `下载出错 : ${url}`,
      });
    } else {
      return await response.clone().blob();
    }
    return null;
  }

  const res = await response.clone().json();



  return res;
});

export default request;

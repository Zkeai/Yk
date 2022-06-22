package com.lemon.usercenter.contant;

/**
 * 用户常量
 */
public interface UserConstant {
    /**
     * 用户登录态键
     */
    String USER_LOGIN_STATE = "userLoginState";


    /**
     * 权限
     * 0-普通用户   1-管理员  2-代理
     */
    int DEFAULT_ROLE =0;
    int ADMIN_ROLE =1;
    int AGENCY_ROLE =2;
    /**
     * 随机验证码 session key
     */
    String RANDOM_CODE_KEY ="RANDOM_VALIDATE_CODE_KEY";

    /**
     * 用户默认头像
     */
    String AVATAR_IMG ="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/352/avatar.png";
}

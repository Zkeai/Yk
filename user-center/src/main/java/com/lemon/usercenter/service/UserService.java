package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;
import com.sun.net.httpserver.HttpServer;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.Date;

/**
 * 用户服务
 *
 * @author lemon
 */
public interface UserService extends IService<User> {


    /**
     *用户注册
     * @param userAccount   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @param verify 验证码
     * @param email   邮箱
     * @param request session
     * @return
     */
    long userRegister(String userAccount, String userPassword, String checkPassword, String verify,String email,HttpServletRequest request);

    /**
     *用户登录
     * @param userAccount 用户账户
     * @param userPassword 用户密码
     * @param request session
     * @return 脱敏后的用户信息
     */

    User userLogin(String userAccount, String userPassword,HttpServletRequest request);

    /**
     *用户脱敏
     * @param originUser 原user对象
     * @return User
     */
    User getSafetyUser(User originUser);

    /**
     * 用户注销
     * @param request request
     * @return 注销结果
     */
    int userLogout(HttpServletRequest request);

    /**
     * 管理员修改
     * @param userID userID
     * @param userStatus userStatus
     * @param userRole userRole
     * @param request request
     * @return 0、1
     */
    int userEdit(long userID, int userStatus, int userRole, String superior, String validTime, HttpServletRequest request);

    /**
     * 用户修改信息
     * @param id id
     * @param nickName nickName
     * @param email email
     * @param phone phone
     * @param image image
     * @param password password
     * @return 0 1
     */
    int userInfoEdit(long id,String nickName, String email, String phone, String image,String password,String superior);
}

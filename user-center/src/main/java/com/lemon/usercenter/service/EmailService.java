package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Email;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【email(邮件配置)】的数据库操作Service
* @createDate 2022-08-23 14:53:13
*/
public interface EmailService extends IService<Email> {
    String addEmail(String typeEmail,String fromEmail, String password, String title, String toEmail,HttpServletRequest request);

    int editEmail(int id,String typeEmail,String fromEmail,String password,String toEmail,String title, HttpServletRequest request);
}

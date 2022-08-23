package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.TypeMapper;
import com.lemon.usercenter.model.domain.Email;
import com.lemon.usercenter.model.domain.Scripts;
import com.lemon.usercenter.model.domain.Type;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.EmailService;
import com.lemon.usercenter.mapper.EmailMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.*;

/**
* @author saoren
* @description 针对表【email(邮件配置)】的数据库操作Service实现
* @createDate 2022-08-23 14:53:13
*/
@Service
public class EmailServiceImpl extends ServiceImpl<EmailMapper, Email>
    implements EmailService{
    @Resource
    private EmailMapper emailMapper;
    @Override
    public String addEmail(String typeEmail, String fromEmail, String password, String title, String toEmail, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        String userid = user.getUserAccount();

        QueryWrapper<Email> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid", userid);
        long count = emailMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户已配置");
        }

        Email newEmail = new Email();
        newEmail.setUserid(userid);
        newEmail.setFromEmail(fromEmail);
        newEmail.setTypeEmail(typeEmail);
        newEmail.setPassword(password);
        newEmail.setTitle(title);
        newEmail.setToEmail(toEmail);
        int rows = emailMapper.insert(newEmail);
        if(rows <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"插入失败");
        }

        return userid;
    }

    @Override
    public int editEmail(int id, String typeEmail, String fromEmail, String password, String toEmail, String title, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        String userid = user.getUserAccount();

        Email newEmail =new Email();
        newEmail.setId(id);
        newEmail.setToEmail(toEmail);
        newEmail.setFromEmail(fromEmail);
        newEmail.setTypeEmail(typeEmail);
        newEmail.setPassword(password);
        newEmail.setTitle(title);
        newEmail.setUserid(userid);

        return emailMapper.updateById(newEmail);
    }
}





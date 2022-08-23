package com.lemon.usercenter.model.domain.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.Email;

import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.email.EmailAddRequest;
import com.lemon.usercenter.model.domain.request.email.EmailEditRequest;
import com.lemon.usercenter.model.domain.request.email.EmailSendRequest;
import com.lemon.usercenter.service.EmailService;
import com.lemon.usercenter.utils.Encrypt;
import io.github.biezhi.ome.OhMyEmail;
import io.github.biezhi.ome.SendMailException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Objects;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;
import static io.github.biezhi.ome.OhMyEmail.SMTP_163;
import static io.github.biezhi.ome.OhMyEmail.SMTP_QQ;


@RestController
@RequestMapping("/email")
public class EmailController {

    @Resource
    private EmailService emailService;



    @PostMapping("/send")
    public BaseResponse<String> sendEmail(@RequestBody EmailSendRequest emailSendRequest, HttpServletRequest request) throws SendMailException {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        if(Objects.equals(emailSendRequest.getTypeEmail(), "QQ")){
            OhMyEmail.config(SMTP_QQ(false), emailSendRequest.getFromEmail(), emailSendRequest.getPassword());
        } else if (Objects.equals(emailSendRequest.getTypeEmail(), "163")) {
            OhMyEmail.config(SMTP_163(false), emailSendRequest.getFromEmail(), emailSendRequest.getPassword());
        }

        OhMyEmail.subject(emailSendRequest.getTitle())
                .from(emailSendRequest.getFromEmail())
                .to(emailSendRequest.getToEmail())
                .text(emailSendRequest.getContent())
                .send();

        return ResultUtils.success("发送成功");
    }

    @PostMapping("/add")
    public BaseResponse<String> addEmail(@RequestBody EmailAddRequest emailAddRequest, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        if(emailAddRequest == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String typeEmail = emailAddRequest.getTypeEmail();
        String password = emailAddRequest.getPassword();
        String fromEmail = emailAddRequest.getFromEmail();
        String title = emailAddRequest.getTitle();
        String toEmail = emailAddRequest.getToEmail();

        if(StringUtils.isAnyBlank(typeEmail,password,fromEmail,title,toEmail)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }


        String result = emailService.addEmail(typeEmail,fromEmail,password,title,toEmail,request);

        return ResultUtils.success(result);
    }

    @PostMapping("/edit")
    public BaseResponse<Integer> editEmail(@RequestBody EmailEditRequest emailEditRequest, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        if(emailEditRequest == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        int id =emailEditRequest.getId();
        String typeEmail = emailEditRequest.getTypeEmail();
        String password = emailEditRequest.getPassword();
        String fromEmail = emailEditRequest.getFromEmail();
        String title = emailEditRequest.getTitle();
        String toEmail = emailEditRequest.getToEmail();

        if(StringUtils.isAnyBlank(typeEmail,password,fromEmail,title,toEmail)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }


        int result = emailService.editEmail(id,typeEmail,fromEmail,password,toEmail,title,request);

        return ResultUtils.success(result);
    }

    @GetMapping("/search")
    public BaseResponse<String> searchEmail(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;

        QueryWrapper<Email> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Email> typeList = emailService.list(queryWrapper);


        for (Email email : typeList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", email.getId());
            newObject.put("typeEmail", email.getTypeEmail());
            newObject.put("fromEmail", email.getFromEmail());
            newObject.put("password", email.getPassword());
            newObject.put("title", email.getTitle());
            newObject.put("toEmail", email.getToEmail());

            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);

        return ResultUtils.success(res);
    }

}

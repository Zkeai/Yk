package com.lemon.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户注册请求体
 * @author lemon
 */
@Data
public class UserRegisterRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private String userAccount;
    private String userPassword;
    private String checkPassword;
    private String verify;
    private String email;

}

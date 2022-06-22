package com.lemon.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户登录请求体
 * @author lemon
 */
@Data
public class UserLoginRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private String userAccount;
    private String userPassword;

}

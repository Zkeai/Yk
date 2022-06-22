package com.lemon.usercenter.model.domain.request;


import lombok.Data;
import java.io.Serializable;

@Data
public class UserInfoEditRequest implements Serializable{
    public static final long serialVersionUID = 3191241716373120793L;

    private long id;
    private String nickName;
    private String email;
    private String image;
    private String phone;
    private String password;
}

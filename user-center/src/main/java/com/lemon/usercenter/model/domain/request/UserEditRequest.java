package com.lemon.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;
@Data
public class UserEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private long userID;
    private int userRole;
    private int userStatus;
}




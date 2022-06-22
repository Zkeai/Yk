package com.lemon.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;


@Data
public class UserDeleteRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private long userID;
}

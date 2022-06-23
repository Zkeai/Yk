package com.lemon.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;


@Data
public class UserSearchUseridRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private int uuid;
}

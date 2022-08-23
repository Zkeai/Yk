package com.lemon.usercenter.model.domain.request.email;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmailSearchRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private String userid;
    private String fromEmail;


}

package com.lemon.usercenter.model.domain.request.kami;

import lombok.Data;

import java.io.Serializable;

@Data
public class SoftwareInitialRequest implements Serializable{
    public static final long serialVersionUID = 3191241716373120793L;
    private String secret;
    private String userid;
}


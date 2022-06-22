package com.lemon.usercenter.model.domain.request.kami;

import lombok.Data;

import java.io.Serializable;

@Data
public class uploadVerRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private String version;
    private String secret;
    private String updateUrl;



}

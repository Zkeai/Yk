package com.lemon.usercenter.model.domain.request.kami;

import lombok.Data;

import java.io.Serializable;

@Data
public class SoftwareEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private String name;
    private String secret;
    private String notice;
    private String version;
    private int machine;
    private int status;


}

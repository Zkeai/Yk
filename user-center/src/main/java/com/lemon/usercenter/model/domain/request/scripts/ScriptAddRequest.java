package com.lemon.usercenter.model.domain.request.scripts;

import lombok.Data;

import java.io.Serializable;

@Data
public class ScriptAddRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private String name;
    private String group;
    private String version;
    private String note;
    private String url;
    private String whiteList;
    private int status;
    private String courseUrl;
    private int type;

}

package com.lemon.usercenter.model.domain.request.scripts;

import lombok.Data;

import java.io.Serializable;

@Data
public class ScriptEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private String scriptName;
    private String scriptGroup;
    private String version;
    private String note;
    private String scriptUrl;
    private String whiteList;
    private int status;
    private String courseUrl;
    private int type;

}

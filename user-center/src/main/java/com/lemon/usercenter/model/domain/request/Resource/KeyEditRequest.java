package com.lemon.usercenter.model.domain.request.Resource;

import lombok.Data;

import java.io.Serializable;

@Data
public class KeyEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private int status;
    private String content;
    private String keyGroup;
    private String note;
}

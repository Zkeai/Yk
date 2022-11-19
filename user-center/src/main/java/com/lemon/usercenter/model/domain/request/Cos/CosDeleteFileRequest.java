package com.lemon.usercenter.model.domain.request.Cos;

import lombok.Data;

import java.io.Serializable;


/**
 * 卡类型删除
 */
@Data
public class CosDeleteFileRequest implements Serializable{
    public static final long serialVersionUID = 3191241716373120793L;
    private String buketName;
    private String key;
    private String secret_id;
    private String secret_key;
    private String region;
}


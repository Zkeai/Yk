package com.lemon.usercenter.model.domain.request.HotUpdate;

import lombok.Data;

import java.io.Serializable;

@Data
public class HotEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private String url;



}

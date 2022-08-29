package com.lemon.usercenter.model.domain.request.HistoryLog;

import lombok.Data;

import java.io.Serializable;

@Data
public class HisAddRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private String ip;
    private String address;
}





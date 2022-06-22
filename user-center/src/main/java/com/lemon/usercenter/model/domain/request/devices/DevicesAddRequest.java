package com.lemon.usercenter.model.domain.request.devices;

import lombok.Data;

import java.io.Serializable;

@Data
public class DevicesAddRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private String deviceName;
    private String deviceModel;
    private String remark;


}

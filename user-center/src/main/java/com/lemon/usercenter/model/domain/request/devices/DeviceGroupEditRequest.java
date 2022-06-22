package com.lemon.usercenter.model.domain.request.devices;

import lombok.Data;

import java.io.Serializable;

@Data
public class DeviceGroupEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private int status;
    private String groupName;
    private String note;
}

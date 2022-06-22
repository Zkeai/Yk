package com.lemon.usercenter.model.domain.request.devices;

import lombok.Data;

import java.io.Serializable;


/**
 * 卡类型删除
 */
@Data
public class DeviceDeleteRequest implements Serializable{
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
}


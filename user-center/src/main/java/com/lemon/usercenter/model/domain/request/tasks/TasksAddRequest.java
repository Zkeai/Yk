package com.lemon.usercenter.model.domain.request.tasks;

import lombok.Data;

import java.io.Serializable;

@Data
public class TasksAddRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private String scriptName;
    private String scriptGroup;
    private String devices;
    private String taskNote;
    private String executionModel;
    private String sendTime;
    private Integer uuid;
    private String msg;
    private String createTime;
}

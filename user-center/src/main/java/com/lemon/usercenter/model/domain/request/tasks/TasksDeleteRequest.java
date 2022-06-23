package com.lemon.usercenter.model.domain.request.tasks;

import lombok.Data;

import java.io.Serializable;

@Data
public class TasksDeleteRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;

}

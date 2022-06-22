package com.lemon.usercenter.model.domain.request.scripts;

import lombok.Data;

import java.io.Serializable;

@Data
public class ScriptDeleteRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
}

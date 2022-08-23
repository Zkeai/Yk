package com.lemon.usercenter.model.domain.request.Comments;

import lombok.Data;

import java.io.Serializable;

@Data
public class searchOneCommentsRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private String keyGroup;
}

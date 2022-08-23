package com.lemon.usercenter.model.domain.request.email;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmailEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
    private String typeEmail;
    private String fromEmail;
    private String password;
    private String title;
    private String toEmail;


}

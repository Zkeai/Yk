package com.lemon.usercenter.model.domain.request.email;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmailSendRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private String typeEmail;
    private String fromEmail;
    private String password;
    private String title;
    private String content;
    private String toEmail;


}

package com.lemon.usercenter.model.domain.request.webConfig;

import lombok.Data;

import java.io.Serializable;

@Data
public class WebConfigEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;

    private String web_title;
    private String icon_url;
    private String le_url;
    private String utils_url;
    private String api_url;


}

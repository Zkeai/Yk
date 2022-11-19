package com.lemon.usercenter.model.domain.request.Storage;

import lombok.Data;

import java.io.Serializable;

@Data
public class COSConfigEditRequest implements Serializable {
    public static final long serialVersionUID = 3191241716373120793L;
    private Long id;
    private String tx_secret_id;
    private String tx_secret_key;
    private String tx_region;
    private String tx_url;
    private String tx_buket_name;


}

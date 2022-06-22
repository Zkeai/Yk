package com.lemon.usercenter.model.domain.request.kami;

import lombok.Data;

import java.io.Serializable;


/**
 * 卡密删除
 */
@Data
public class CardDeleteRequest implements Serializable{
    public static final long serialVersionUID = 3191241716373120793L;
    private int id;
}


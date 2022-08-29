package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 登录历史
 * @TableName historylog
 */
@TableName(value ="historylog")
@Data
public class Historylog implements Serializable {
    /**
     * 用户
     */
    private String userid;

    /**
     * 登录ip
     */
    private String ip;

    /**
     * 登录地址
     */
    private String address;

    /**
     * 登陆时间
     */
    private Date loginTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
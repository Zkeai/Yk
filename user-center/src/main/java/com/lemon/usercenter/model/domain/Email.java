package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 邮件配置
 * @TableName email
 */
@TableName(value ="email")
@Data
public class Email implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 所属用户
     */
    private String userid;

    /**
     * 邮箱服务商
     */
    private String typeEmail;

    /**
     * 发送的邮箱账号
     */
    private String fromEmail;

    /**
     * 授权码
     */
    private String password;

    /**
     * 邮件标题
     */
    private String title;

    /**
     * 接收邮箱
     */
    private String toEmail;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 腾讯云cos
 * @TableName tx_cos
 */
@TableName(value ="tx_cos")
@Data
public class TxCos implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 密钥id
     */
    private String tx_secret_id;

    /**
     * 密钥
     */
    private String tx_secret_key;

    /**
     * 所属地域
     */
    private String tx_region;

    /**
     * 地址
     */
    private String tx_url;

    /**
     * 储存桶名称
     */
    private String tx_buket_name;

    /**
     * 所属用户
     */
    private String userid;
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
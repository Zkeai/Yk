package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName card
 */
@TableName(value ="card")
@Data
public class Card implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 卡密
     */
    private String kami;

    /**
     * 用户ID
     */
    private String userid;

    /**
     * 软件ID
     */
    private String software;

    /**
     * 有效期
     */
    private String type;

    /**
     * 状态
     */
    private Integer status;

    /**
     * ip地址
     */
    private String ip;

    /**
     * 设备码
     */
    private String machine;

    /**
     * 是否在线
     */
    private Integer online;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 有效期
     */
    private Date validTime;

    /**
     * 删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
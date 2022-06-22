package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName type
 */
@TableName(value ="type")
@Data
public class Type implements Serializable {
    /**
     * 时长天数
     */
    @TableId
    private Integer type;

    /**
     * 
     */
    private Integer id;

    /**
     * 时长名称
     */
    private String name;

    /**
     * 时长id 
     */
    private String userid;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除 0-未删除 1-删除
     */
    @TableLogic
    private int isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
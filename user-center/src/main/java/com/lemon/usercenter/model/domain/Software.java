package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName software
 */
@TableName(value ="software")
@Data
public class Software implements Serializable {
    /**
     * 软件秘钥
     */
    @TableId
    private String secret;

    /**
     * 
     */
    private Integer id;

    /**
     * 软件名
     */
    private String name;

    /**
     * 用户账号
     */
    private String userid;

    /**
     * 版本号
     */
    private String version;

    /**
     * 机器码
     */
    private Integer machine;

    /**
     * 状态 0正常 1冻结
     */
    private Integer status;

    /**
     * 公告
     */
    private String notice;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 更新链接
     */
    private String updateUrl;

    /**
     * 是否被删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
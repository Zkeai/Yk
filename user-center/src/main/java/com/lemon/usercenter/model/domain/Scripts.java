package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName scripts
 */
@TableName(value ="scripts")
@Data
public class Scripts implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Integer id;


    /**
     * 脚本名字
     */
    private String scriptName;
    /**
     * 所属管理员
     */
    private String scriptGroup;

    /**
     * 脚本分组
     */
    private String userid;
    /**
     * 脚本url
     */
    private String url;

    /**
     * 脚本类型 0共享 1管理员 2管理员和代理
     */
    private Integer type;

    /**
     * 适配版本
     */
    private String version;

    /**
     * 白名单
     */
    private String whiteList;


    /**
     * 教程地址
     */
    private String courseUrl;


    /**
     * 状态
     */
    private Integer status;

    /**
     * 备注
     */
    private String note;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 0正常 1删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
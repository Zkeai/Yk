package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName tasks
 */
@TableName(value ="tasks")
@Data
public class Tasks implements Serializable {
    /**
     * 任务ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 执行模式
     */
    private String executionModel;

    /**
     * 脚本分组
     */
    private String scriptGroup;

    /**
     * 脚本名称
     */
    private String scriptName;

    /**
     * 任务设备数组
     */
    private String devices;

    /**
     * 任务备注
     */
    private String taskNote;

    /**
     * 返回给设备的参数
     */
    private String msg;

    /**
     * uuid
     */
    private Integer uuid;

    /**
     * status
     */
    private Integer status;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 下发时间
     */
    private String sendTime;


    /**
     * 是否完成/删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
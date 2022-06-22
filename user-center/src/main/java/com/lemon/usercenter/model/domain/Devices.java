package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName devices
 */
@TableName(value ="devices")
@Data
public class Devices implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 所属用户
     */
    private String userid;

    /**
     * uuid
     */
    private Integer uuid;

    /**
     * 编号
     */
    private String remark;

    /**
     * 设备昵称
     */
    private String deviceName;

    /**
     * 设备型号
     */
    private String deviceModel;

    /**
     * 设备分组
     */
    private String deviceGroup;

    /**
     * 设备状态
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 是否删除 0正常 1删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
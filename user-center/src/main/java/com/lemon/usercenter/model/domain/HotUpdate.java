package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 热更新
 * @TableName hot_update
 */
@TableName(value ="hot_update")
@Data
public class HotUpdate implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 
     */
    private String url;

    /**
     * 
     */
    private String version;

    /**
     * 
     */
    private String content;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
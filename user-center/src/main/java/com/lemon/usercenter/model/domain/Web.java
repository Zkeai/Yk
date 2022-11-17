package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 网站管理
 * @TableName web
 */
@TableName(value ="web")
@Data
public class Web implements Serializable {
    /**
     * 
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 网站标题
     */
    private String web_title;

    /**
     * 网站icon
     */
    private String icon_url;

    /**
     * 安卓端直链
     */
    private String le_url;

    /**
     * api链接
     */
    private String api_url;

    /**
     * 工具夹链接
     */
    private String utils_url;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
package com.lemon.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName keyword
 */
@TableName(value ="keyword")
@Data
public class Keyword implements Serializable {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 关键词
     */
    private String keyWord;

    /**
     * 回答内容
     */
    private String content;

    /**
     * 分组
     */
    private String keyGroup;

    /**
     * 0 正常 1 冻结
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
     * 更新时间
     */
    private Date updateTime;

    /**
     * 所属用户
     */
    private String userid;

    /**
     * 0 正常 1删除
     */
    @TableLogic
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
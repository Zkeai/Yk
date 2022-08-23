package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.ComGroup;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【com_group(话术分组)】的数据库操作Service
* @createDate 2022-08-12 09:36:01
*/
public interface ComGroupService extends IService<ComGroup> {
    String addComGroup(String groupName,String note,  HttpServletRequest request);
    int ComGroupEdit(int id,String groupName, String note, int status, HttpServletRequest request);
}

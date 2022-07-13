package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.KewGroup;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【kew_group】的数据库操作Service
* @createDate 2022-07-08 13:59:25
*/
public interface KewGroupService extends IService<KewGroup> {
    String addKewGroup(String groupName,String note,  HttpServletRequest request);
    int KewGroupEdit(int id,String groupName, String note, int status, HttpServletRequest request);
}

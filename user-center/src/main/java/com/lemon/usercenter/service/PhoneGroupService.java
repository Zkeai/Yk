package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.PhoneGroup;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【phone_group】的数据库操作Service
* @createDate 2022-06-10 09:27:43
*/
public interface PhoneGroupService extends IService<PhoneGroup> {
    String addPhoneGroup(String groupName,String note, int status,  HttpServletRequest request);

    int phoneGroupEdit(int id,String groupName,String note, int status, HttpServletRequest request);
}

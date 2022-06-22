package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Devices;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【devices】的数据库操作Service
* @createDate 2022-06-08 19:34:10
*/
public interface DevicesService extends IService<Devices> {
    String addDevices(String deviceName,String deviceModel, String remark,  HttpServletRequest request);
}

package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Software;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【software】的数据库操作Service
* @createDate 2022-06-01 21:23:24
*/
public interface SoftwareService extends IService<Software> {


    String createSoftware(String name, String version,String notice,int machine,HttpServletRequest request);
    int softwareEdit(int id ,String name,String secret,String notice,String version, int machine, int status,HttpServletRequest request);

    int uploadVersion(int id, String secret, String version, String url,HttpServletRequest request);
}

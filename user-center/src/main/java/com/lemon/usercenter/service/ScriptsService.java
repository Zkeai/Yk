package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Scripts;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【scripts】的数据库操作Service
* @createDate 2022-06-12 12:29:22
*/
public interface ScriptsService extends IService<Scripts> {
    String createScript(String name, String group,String url, int type, String version,String note,String whiteList,String courseUrl,int status,  HttpServletRequest request);

    int editScript(int id,String name,String group,String url,int type, String version, String note,String whiteList,String courseUrl,int status, HttpServletRequest request);
}

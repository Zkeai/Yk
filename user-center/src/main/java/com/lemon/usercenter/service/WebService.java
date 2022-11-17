package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.Web;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【web(网站管理)】的数据库操作Service
* @createDate 2022-11-17 19:04:05
*/
public interface WebService extends IService<Web> {
    int webEdit(String web_title, String icon_url,String le_url, String api_url,String utils_url, HttpServletRequest request);
}

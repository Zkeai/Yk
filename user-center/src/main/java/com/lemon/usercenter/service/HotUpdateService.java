package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.HotUpdate;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【hot_update(热更新)】的数据库操作Service
* @createDate 2022-11-13 11:30:33
*/
public interface HotUpdateService extends IService<HotUpdate> {
    String addHot(String url,HttpServletRequest request);
    int editHot(int id ,String url,HttpServletRequest request);
}

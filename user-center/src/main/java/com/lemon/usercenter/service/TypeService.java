package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Type;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【type】的数据库操作Service
* @createDate 2022-06-01 08:43:47
*/
public interface TypeService extends IService<Type> {

    String createType(String name, int type, HttpServletRequest request);
}

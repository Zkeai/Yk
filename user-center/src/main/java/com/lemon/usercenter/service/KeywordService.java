package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Keyword;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【keyword】的数据库操作Service
* @createDate 2022-07-08 14:00:59
*/
public interface KeywordService extends IService<Keyword> {
    String addKewWord(String keyWord,String content,String keyGroup, int status,String note,  HttpServletRequest request);

    int KewEdit(int id,String content,String keyGroup,int status, String note, HttpServletRequest request);
}

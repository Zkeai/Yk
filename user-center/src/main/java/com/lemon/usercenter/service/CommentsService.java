package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Comments;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【comments(话术)】的数据库操作Service
* @createDate 2022-08-12 09:37:50
*/
public interface CommentsService extends IService<Comments> {
    String addComment(String keyWord,String content,String keyGroup, int status,String note,  HttpServletRequest request);

    int CommentEdit(int id,String content,String keyGroup,int status, String note, HttpServletRequest request);
}

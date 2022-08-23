package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.ComGroupMapper;
import com.lemon.usercenter.mapper.CommentsMapper;
import com.lemon.usercenter.model.domain.*;
import com.lemon.usercenter.service.CommentsService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author saoren
* @description 针对表【comments(话术)】的数据库操作Service实现
* @createDate 2022-08-12 09:37:50
*/
@Service
public class CommentsServiceImpl extends ServiceImpl<CommentsMapper, Comments>
    implements CommentsService{

    @Resource
    private CommentsMapper commentsMapper;
    @Resource
    private ComGroupMapper comGroupMapper;

    @Override
    public String addComment(String keyWord,String content, String comGroup, int status, String note, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(content,comGroup)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"部分参数不能为空");
        }
        //检测登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        //检查关键词是否存在
        QueryWrapper<Comments> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("keyWord", keyWord);
        long count1 = commentsMapper.selectCount(queryWrapper1);
        if (count1 > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"关键词已存在");
        }
        //检查分组是否存在
        QueryWrapper<ComGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("groupName", comGroup);
        ComGroup comGroups = comGroupMapper.selectOne(queryWrapper);
        if (comGroups == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }

        //插入数据
        String userid = user.getUserAccount();

        Comments comments = new Comments();
        comments.setKeyWord(keyWord);
        comments.setContent(content);
        comments.setComGroup(comGroup);
        comments.setUserid(userid);
        comments.setNote(note);
        comments.setStatus(status);
        int row = commentsMapper.insert(comments);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加词库失败");
        }


        return keyWord;
    }

    @Override
    public int CommentEdit(int id, String content, String comGroup, int status, String note, HttpServletRequest request) {
        //检测登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        //检测消息是否存在
        QueryWrapper<Comments> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("id", id);
        long count1 = commentsMapper.selectCount(queryWrapper1);
        if (count1 < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"话术不存在");
        }

        //检测分组是否存在
        QueryWrapper<ComGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("groupName", comGroup);
        ComGroup comGroups = comGroupMapper.selectOne(queryWrapper);
        if (comGroups == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间

        Date date;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        Comments newComments= new Comments();

        newComments.setId(id);
        newComments.setComGroup(comGroup);
        newComments.setStatus(status);
        newComments.setNote(note);
        newComments.setContent(content);
        newComments.setUpdateTime(date);

        return commentsMapper.updateById(newComments);
    }


}





package com.lemon.usercenter.model.domain.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.ComGroupMapper;
import com.lemon.usercenter.mapper.CommentsMapper;


import com.lemon.usercenter.model.domain.ComGroup;
import com.lemon.usercenter.model.domain.Comments;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.Comments.*;
import com.lemon.usercenter.service.ComGroupService;
import com.lemon.usercenter.service.CommentsService;
import com.lemon.usercenter.utils.Encrypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/comments")
public class CommentsController {

    @Resource
    private ComGroupService comGroupService;
    @Resource
    private ComGroupMapper comGroupMapper;

    @Resource
    private CommentsMapper commentsMapper;
    @Resource
    private CommentsService commentsService;

    /**
     * 增加话术分组
     * @param comGroupAddRequest comGroupAddRequest
     * @param request  request
     * @return return
     */
    @PostMapping("/addComGroup")
    public BaseResponse<String> comGroupAdd(@RequestBody ComGroupAddRequest comGroupAddRequest, HttpServletRequest request){
        if(comGroupAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String groupName = comGroupAddRequest.getGroupName();
        String note = comGroupAddRequest.getNote();


        String result = comGroupService.addComGroup(groupName,note,request);

        return ResultUtils.success(result);
    }

    /**
     * 修改话术分组
     * @param comGroupEditRequest comGroupEditRequest
     * @param request request
     * @return return
     */
    @PostMapping("/editComGroup")
    public BaseResponse<Integer> comGroupEdit(@RequestBody ComGroupEditRequest comGroupEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = comGroupEditRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String groupName = comGroupEditRequest.getGroupName();
        int status = comGroupEditRequest.getStatus();
        String note = comGroupEditRequest.getNote();

        int result = comGroupService.ComGroupEdit(id,groupName,note,status,request);

        return ResultUtils.success(result);

    }

    /**
     * 删除话术分组
     * @param comGroupDeleteRequest comGroupDeleteRequest
     * @param request request
     * @return return
     */
    @PostMapping("/deleteComGroup")
    public BaseResponse<Integer> deleteKeyGroup(@RequestBody ComGroupDeleteRequest comGroupDeleteRequest, HttpServletRequest request){
        if(comGroupDeleteRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user == null){
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        int id = comGroupDeleteRequest.getId();
        String groupName = comGroupDeleteRequest.getGroupName();

        QueryWrapper<ComGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("groupName", groupName).eq("id",id);
        ComGroup comGroup = comGroupMapper.selectOne(queryWrapper);
        if (comGroup == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }


        int result= comGroupMapper.deleteById(id);

        return ResultUtils.success(result);
    }

    /**
     * 话术分组列表
     * @param request request
     * @return return
     */
    @GetMapping("/searchComGroup")
    public BaseResponse<String> searchComGroup(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }



        QueryWrapper<ComGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<ComGroup> comGroupList = comGroupService.list(queryWrapper);

        for (ComGroup comGroup : comGroupList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", comGroup.getId());
            newObject.put("groupName", comGroup.getGroupName());
            newObject.put("userid", comGroup.getUserid());
            newObject.put("status", comGroup.getStatus());
            newObject.put("note", comGroup.getNote());
            newObject.put("createTime", comGroup.getCreateTime());
            newObject.put("updateTime", comGroup.getUpdateTime());
            newObject.put("isDelete", comGroup.getIsDelete());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }


    /**
     * 增加话术
     * @param commentsAddRequest commentsAddRequest
     * @param request request
     * @return  return
     */
    @PostMapping("/addComments")
    public BaseResponse<String> addComments(@RequestBody CommentsAddRequest commentsAddRequest, HttpServletRequest request){
        if(commentsAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        String keyWord = commentsAddRequest.getKeyWord();
        String content = commentsAddRequest.getContent();
        String keyGroup = commentsAddRequest.getKeyGroup();
        int status = commentsAddRequest.getStatus();
        String note = commentsAddRequest.getNote();


        String result = commentsService.addComment(keyWord,content,keyGroup,status,note,request);

        return ResultUtils.success(result);
    }

    /**
     * 修改话术
     * @param commentsEditRequest commentsEditRequest
     * @param request request
     * @return  return
     */
    @PostMapping("/editComments")
    public BaseResponse<Integer> editComments(@RequestBody CommentsEditRequest commentsEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = commentsEditRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String content = commentsEditRequest.getContent();
        int status = commentsEditRequest.getStatus();
        String note = commentsEditRequest.getNote();
        String keyGroup = commentsEditRequest.getKeyGroup();
        int result = commentsService.CommentEdit(id,content,keyGroup,status,note,request);

        return ResultUtils.success(result);

    }

    /**
     * 搜索话术
     * @param request request
     * @return  return
     */
    @GetMapping("/searchComments")
    public BaseResponse<String> searchComments(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }



        QueryWrapper<Comments> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Comments> commentsList = commentsService.list(queryWrapper);


        for (Comments comments : commentsList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", comments.getId());
            newObject.put("content", comments.getContent());
            newObject.put("comGroup", comments.getComGroup());
            newObject.put("status", comments.getStatus());
            newObject.put("note", comments.getNote());
            newObject.put("userid", comments.getUserid());
            newObject.put("keyWord", comments.getKeyWord());
            newObject.put("createTime", comments.getCreateTime());
            newObject.put("updateTime", comments.getUpdateTime());
            newObject.put("isDelete", comments.getIsDelete());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }

    /**
     * 删除话术
     * @param commentsDeleteRequest commentsDeleteRequest
     * @param request request
     * @return return
     */
    @PostMapping("/deleteComments")
    public BaseResponse<Integer> deleteComments(@RequestBody CommentsDeleteRequest commentsDeleteRequest, HttpServletRequest request){
        if(commentsDeleteRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user == null){
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        int id = commentsDeleteRequest.getId();
        String keyWord = commentsDeleteRequest.getKeyWord();

        QueryWrapper<Comments> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("keyWord", keyWord).eq("id",id);
        Comments comments = commentsMapper.selectOne(queryWrapper);
        if (comments == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"关键词不存在");
        }



        int result= commentsMapper.deleteById(id);
        return ResultUtils.success(result);
    }

    @PostMapping("/searchGroupComments")
    public BaseResponse<List<Comments>> searchGroupComments(@RequestBody searchOneCommentsRequest searchOneCommentsRequest, HttpServletRequest request){
        if(searchOneCommentsRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user == null){
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid = user.getUserAccount();

        String keyGroup = searchOneCommentsRequest.getKeyGroup();
        QueryWrapper<Comments> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("comGroup", keyGroup).eq("userid",userid);
        List<Comments> commentsList = commentsService.list(queryWrapper);

        if (commentsList == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }



        return ResultUtils.success(commentsList);
    }
}

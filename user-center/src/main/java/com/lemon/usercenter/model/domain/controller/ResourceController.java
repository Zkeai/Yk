package com.lemon.usercenter.model.domain.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.KewGroupMapper;
import com.lemon.usercenter.mapper.KeywordMapper;

import com.lemon.usercenter.model.domain.KewGroup;
import com.lemon.usercenter.model.domain.Keyword;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.Resource.*;

import com.lemon.usercenter.service.KewGroupService;
import com.lemon.usercenter.service.KeywordService;
import com.lemon.usercenter.utils.Encrypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Resource
    private KewGroupService kewGroupService;
    @Resource
    private KewGroupMapper kewGroupMapper;
    @Resource
    private KeywordService keywordService;
    @Resource
    private KeywordMapper keywordMapper;
    /**
     * 增加关键词分组
     * @param kewGroupAddRequest key
     * @param request re
     * @return groupName
     */
    @PostMapping("/addKeyGroup")
    public BaseResponse<String> kewGroupAdd(@RequestBody KewGroupAddRequest kewGroupAddRequest, HttpServletRequest request){
        if(kewGroupAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String groupName = kewGroupAddRequest.getGroupName();
        String note = kewGroupAddRequest.getNote();


        String result = kewGroupService.addKewGroup(groupName,note,request);

        return ResultUtils.success(result);
    }

    /**
     *修改关键词分组
     * @param keyGroupEditRequest keyGroupEditRequest
     * @param request request
     * @return 1
     */
    @PostMapping("/editKeyGroup")
    public BaseResponse<Integer> keyGroupEdit(@RequestBody KeyGroupEditRequest keyGroupEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = keyGroupEditRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String groupName = keyGroupEditRequest.getGroupName();
        int status = keyGroupEditRequest.getStatus();
        String note = keyGroupEditRequest.getNote();

        int result = kewGroupService.KewGroupEdit(id,groupName,note,status,request);

        return ResultUtils.success(result);

    }

    /**
     * 删除关键词分组
     * @param keyGroupDeleteRequest keyGroupDeleteRequest
     * @param request request
     * @return 1
     */
    @PostMapping("/deleteKeyGroup")
    public BaseResponse<Integer> deleteKeyGroup(@RequestBody KeyGroupDeleteRequest keyGroupDeleteRequest, HttpServletRequest request){
        if(keyGroupDeleteRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user == null){
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        int id = keyGroupDeleteRequest.getId();
        String groupName = keyGroupDeleteRequest.getGroupName();

        QueryWrapper<KewGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("groupName", groupName).eq("id",id);
        KewGroup kewGroup = kewGroupMapper.selectOne(queryWrapper);
        if (kewGroup == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }


        int result= kewGroupMapper.deleteById(id);

        return ResultUtils.success(result);
    }


    /**
     * 关键词列表
     * @param request request
     * @return KewGroup  List
     */
    @GetMapping("/searchKeyGroup")
    public BaseResponse<String> searchKeyGroup(HttpServletRequest request) throws Exception {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }



        QueryWrapper<KewGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<KewGroup> keyGroupList = kewGroupService.list(queryWrapper);

        JSONArray newArray = new JSONArray();
        for (KewGroup kewGroup : keyGroupList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", kewGroup.getId());
            newObject.put("groupName", kewGroup.getGroupName());
            newObject.put("userid", kewGroup.getUserid());
            newObject.put("num", kewGroup.getNum());
            newObject.put("status", kewGroup.getStatus());
            newObject.put("note", kewGroup.getNote());
            newObject.put("createTime", kewGroup.getCreateTime());
            newObject.put("updateTime", kewGroup.getUpdateTime());
            newObject.put("isDelete", kewGroup.getIsDelete());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);

        return ResultUtils.success(res);
    }

    /**
     * 增加关键词
     * @param keyAddRequest keyAddRequest
     * @param request request
     * @return keyWord
     */
    @PostMapping("/addKey")
    public BaseResponse<String> kewAdd(@RequestBody KeyAddRequest keyAddRequest, HttpServletRequest request){
        if(keyAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String keyWord = keyAddRequest.getKeyWord();
        String content = keyAddRequest.getContent();
        String keyGroup = keyAddRequest.getKeyGroup();
        int status = keyAddRequest.getStatus();
        String note = keyAddRequest.getNote();


        String result = keywordService.addKewWord(keyWord,content,keyGroup,status,note,request);

        return ResultUtils.success(result);
    }

    /**
     *  修改关键词
     * @param keyEditRequest keyEditRequest
     * @param request request
     * @return 1
     */
    @PostMapping("/editKey")
    public BaseResponse<Integer> keyEdit(@RequestBody KeyEditRequest keyEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = keyEditRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String content = keyEditRequest.getContent();
        int status = keyEditRequest.getStatus();
        String note = keyEditRequest.getNote();
        String keyGroup = keyEditRequest.getKeyGroup();
        int result = keywordService.KewEdit(id,content,keyGroup,status,note,request);

        return ResultUtils.success(result);

    }

    /**
     * 搜索关键词
     * @param request request
     * @return  Keyword List
     */
    @GetMapping("/searchKey")
    public BaseResponse<String> searchKey(HttpServletRequest request) throws Exception {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }



        QueryWrapper<Keyword> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Keyword> keyList = keywordService.list(queryWrapper);
        JSONArray newArray = new JSONArray();
        for (Keyword keyword : keyList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", keyword.getId());
            newObject.put("keyWord", keyword.getKeyWord());
            newObject.put("content", keyword.getContent());
            newObject.put("keyGroup", keyword.getKeyGroup());
            newObject.put("userid", keyword.getUserid());
            newObject.put("status", keyword.getStatus());
            newObject.put("note", keyword.getNote());
            newObject.put("createTime", keyword.getCreateTime());
            newObject.put("updateTime", keyword.getUpdateTime());
            newObject.put("isDelete", keyword.getIsDelete());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }

    /**
     * 删除关键词
     * @param keyDeleteRequest keyDeleteRequest
     * @param request request
     * @return 1
     */
    @PostMapping("/deleteKey")
    public BaseResponse<Integer> deleteKey(@RequestBody KeyDeleteRequest keyDeleteRequest, HttpServletRequest request){
        if(keyDeleteRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user == null){
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        int id = keyDeleteRequest.getId();
        String keyWord = keyDeleteRequest.getKeyWord();

        QueryWrapper<Keyword> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("keyWord", keyWord).eq("id",id);
        Keyword keyword = keywordMapper.selectOne(queryWrapper);
        if (keyword == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"关键词不存在");
        }
        String group =keyword.getKeyGroup();

        QueryWrapper<KewGroup> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("groupName", group);
        KewGroup keyGroup = kewGroupMapper.selectOne(queryWrapper1);
        //修改分组数量
        int group_id =keyGroup.getId();
        int num =keyGroup.getNum();
        KewGroup newKeyGroup = new KewGroup();
        newKeyGroup.setId(group_id);
        newKeyGroup.setNum(num - 1);
        kewGroupMapper.updateById(newKeyGroup);

        int result= keywordMapper.deleteById(id);
        return ResultUtils.success(result);
    }
}



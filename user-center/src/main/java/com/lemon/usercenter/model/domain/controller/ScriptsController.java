package com.lemon.usercenter.model.domain.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.ScriptsMapper;
import com.lemon.usercenter.mapper.UserMapper;
import com.lemon.usercenter.model.domain.Scripts;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.scripts.ScriptAddRequest;
import com.lemon.usercenter.model.domain.request.scripts.ScriptDeleteRequest;
import com.lemon.usercenter.model.domain.request.scripts.ScriptEditRequest;
import com.lemon.usercenter.service.ScriptsService;
import com.lemon.usercenter.utils.Encrypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.*;

@RestController
@RequestMapping("/script")
public class ScriptsController {

    @Resource
    private ScriptsService scriptsService;
    @Resource
    private ScriptsMapper scriptsMapper;
    @Resource
    private UserMapper userMapper;

    /**
     *创建脚本任务
     * @param scriptAddRequest scriptAddRequest
     * @param request request
     * @return 脚本名
     */
    @PostMapping("/add")
    public BaseResponse<String> scriptAdd(@RequestBody ScriptAddRequest scriptAddRequest, HttpServletRequest request){
        if(scriptAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }


        String name =scriptAddRequest.getName();
        String group = scriptAddRequest.getGroup();
        String version = scriptAddRequest.getVersion();
        String note = scriptAddRequest.getNote();
        String whiteList=scriptAddRequest.getWhiteList();
        String courseUrl = scriptAddRequest.getCourseUrl();
        String url = scriptAddRequest.getUrl();
        int status = scriptAddRequest.getStatus();
        int type = scriptAddRequest.getType();

        if(StringUtils.isAnyBlank(name,group,version,note)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"部分参数为空");
        }

        String result = scriptsService.createScript(name,group,url,type,version,note,whiteList,courseUrl,status,request);

        return ResultUtils.success(result);
    }

    /**
     * 获取脚本列表
     * @param request request
     * @return list
     */
    @GetMapping("/getList")
    public BaseResponse<String> scriptList(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();
        List<Scripts> scriptsList = new ArrayList<>();
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }


        if(user.getUserRole() == 0){
            //普通用户   获取user对象
            QueryWrapper<User> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("userAccount", user.getUserAccount());
            User newUser = userMapper.selectOne(queryWrapper1);
            //获取上级的脚本任务
            QueryWrapper<Scripts> queryWrapper = new QueryWrapper<>();
            String superior = newUser.getSuperior();
            queryWrapper.eq("userid",superior).eq("status",0).eq("type",0);
            scriptsList = scriptsService.list(queryWrapper);

        }

        if(user.getUserRole() == 1){
            //管理员获取所有
            QueryWrapper<Scripts> queryWrapper = new QueryWrapper<>();
            scriptsList = scriptsService.list(queryWrapper);
        }

        if(user.getUserRole() == 2){
            //代理 获取自己的脚本
            QueryWrapper<Scripts> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("userid",user.getUserAccount());
            scriptsList = scriptsService.list(queryWrapper);
        }

        for (Scripts scripts : scriptsList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", scripts.getId());
            newObject.put("scriptName", scripts.getScriptName());
            newObject.put("scriptGroup", scripts.getScriptGroup());
            newObject.put("userid", scripts.getUserid());
            newObject.put("url", scripts.getUrl());
            newObject.put("type", scripts.getType());
            newObject.put("version", scripts.getVersion());
            newObject.put("courseUrl", scripts.getCourseUrl());
            newObject.put("whiteList", scripts.getWhiteList());
            newObject.put("status", scripts.getStatus());
            newObject.put("note", scripts.getNote());
            newObject.put("createTime", scripts.getCreateTime());

            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }

    /**
     * 修改脚本
     * @param scriptEditRequest scriptEditRequest
     * @param request request
     * @return 0、1
     */
    @PostMapping("/edit")
    public BaseResponse<Integer> scriptEdit(@RequestBody ScriptEditRequest scriptEditRequest, HttpServletRequest request){
        if(scriptEditRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }


        String name =scriptEditRequest.getScriptName();
        String group = scriptEditRequest.getScriptGroup();
        String version = scriptEditRequest.getVersion();
        String note = scriptEditRequest.getNote();
        String whiteList=scriptEditRequest.getWhiteList();
        String courseUrl = scriptEditRequest.getCourseUrl();
        String url = scriptEditRequest.getScriptUrl();
        int status = scriptEditRequest.getStatus();
        int type = scriptEditRequest.getType();
        int id =scriptEditRequest.getId();


        QueryWrapper<Scripts> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        Scripts newScript = scriptsMapper.selectOne(queryWrapper);
        if(newScript == null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"脚本不存在");
        }

        if(StringUtils.isAnyBlank(name,group,version,note)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"部分参数为空");
        }

        int result = scriptsService.editScript(id,name,group,url,type,version,note,whiteList,courseUrl,status,request);

        return ResultUtils.success(result);
    }

    /**
     * 删除脚本
     * @param scriptDeleteRequest scriptDeleteRequest
     * @param request request
     * @return 0、1
     */
    @PostMapping("/delete")
    public BaseResponse<Integer> scriptDelete(@RequestBody ScriptDeleteRequest scriptDeleteRequest, HttpServletRequest request){
        if(scriptDeleteRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }


        int id =scriptDeleteRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        QueryWrapper<Scripts> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        Scripts newScript = scriptsMapper.selectOne(queryWrapper);
        if(newScript == null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"脚本不存在");
        }

        UpdateWrapper<Scripts> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id);
        updateWrapper.set("isDelete", 1);
        int result = scriptsMapper.update(null, updateWrapper);


        return ResultUtils.success(result);
    }


    /**
     * 是否为管理员或代理
     * @param request request
     * @return boolean
     */
    private boolean hasPower(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        return user != null && (user.getUserRole() == ADMIN_ROLE ||user.getUserRole() == AGENCY_ROLE);
    }

}

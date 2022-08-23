package com.lemon.usercenter.model.domain.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.CardMapper;
import com.lemon.usercenter.mapper.SoftwareMapper;
import com.lemon.usercenter.mapper.TypeMapper;
import com.lemon.usercenter.model.domain.Card;
import com.lemon.usercenter.model.domain.Software;
import com.lemon.usercenter.model.domain.Type;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.kami.*;
import com.lemon.usercenter.service.CardService;
import com.lemon.usercenter.service.SoftwareService;
import com.lemon.usercenter.service.TypeService;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;


import static com.lemon.usercenter.contant.UserConstant.*;


/**
 * 卡密接口
 */
@RestController
@RequestMapping("/kami")
public class KamiController {

    @Resource
    private TypeService typeService;

    @Resource
    private TypeMapper typeMapper;

    @Resource
    private SoftwareService softwareService;

    @Resource
    private SoftwareMapper softwareMapper;

    @Resource
    private CardService cardService;

    @Resource
    private CardMapper cardMapper;

    /**
     * 创建卡类型
     * @param kaCreateRequest kamiCreateRequest
     * @return userid
     */
    @PostMapping("/create")
    public BaseResponse<String> kamiCreate(@RequestBody KaCreateRequest kaCreateRequest, HttpServletRequest request){
        if(kaCreateRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        String name = kaCreateRequest.getName();
        int type = kaCreateRequest.getType();
        if(StringUtils.isAnyBlank(name)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        String result = typeService.createType(name, type,request);

        return ResultUtils.success(result);
    }

    /**
     * 查询所有卡类型
     * @param request request
     * @return List<Type>
     */
    @GetMapping("/search")
    public BaseResponse<List<Type>> searchType(HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;

        QueryWrapper<Type> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Type> typeList = typeService.list(queryWrapper);
        return ResultUtils.success(typeList);
    }

    /**
     * 删除卡类型
     * @param kamiDeleteRequest kamiDeleteRequest
     * @param request request
     * @return true/false
     */
    @PostMapping("/delete")
    public BaseResponse<Integer> deleteUsers(@RequestBody KamiDeleteRequest kamiDeleteRequest, HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        int id = kamiDeleteRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        UpdateWrapper<Type> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id);
        updateWrapper.set("isDelete", 1);
        int result = typeMapper.update(null, updateWrapper);
        return ResultUtils.success(result);

    }


    /**
     * 创建软件
     * @param softwareCreateRequest name/version/notice/machine
     * @param request session
     * @return secret 密钥
     */
    @PostMapping("/createSoftware")
    public BaseResponse<String> createSoftware(@RequestBody SoftwareCreateRequest softwareCreateRequest, HttpServletRequest request){
        if(softwareCreateRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        String name = softwareCreateRequest.getName();
        String notice = softwareCreateRequest.getNotice();
        String version = softwareCreateRequest.getVersion();
        int machine = softwareCreateRequest.getMachine();

        if(StringUtils.isAnyBlank(name,notice,version)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        String result = softwareService.createSoftware(name, version, notice, machine, request);

        return ResultUtils.success(result);
    }

    /**
     * 查询名下所有软件列表
     * @param request request
     * @return  List
     */
    @GetMapping("/searchSoftware")
    public BaseResponse<List<Software>> searchSoftware(HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;

        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Software> typeList = softwareService.list(queryWrapper);

        return ResultUtils.success(typeList);
    }

    @PostMapping("/initial")
    public BaseResponse<Software> initial(@RequestBody SoftwareInitialRequest softwareInitialRequest) {


        String userid = softwareInitialRequest.getUserid();
        String secret = softwareInitialRequest.getSecret();

        if(StringUtils.isAnyBlank(userid,secret)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"缺少参数");
        }

        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",userid).eq("secret",secret);

        Software newSoftware = softwareMapper.selectOne(queryWrapper);
        Software safetySoftware = getSafetySoftware(newSoftware);
        return ResultUtils.success(safetySoftware);

    }

    /**
     * 删除软件
     * @param softwareDeleteRequest softwareDeleteRequest
     * @param request request
     * @return int
     */
    @PostMapping("/deleteSoftware")
    public BaseResponse<Integer> deleteSoftware(@RequestBody SoftwareDeleteRequest softwareDeleteRequest, HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        int id = softwareDeleteRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        UpdateWrapper<Software> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id);
        updateWrapper.set("isDelete", 1);
        int result = softwareMapper.update(null, updateWrapper);
        return ResultUtils.success(result);

    }

    /**
     * 修改软件
     * @param softwareEditRequest softwareEditRequest
     * @param request session
     * @return int
     */
    @PostMapping("/editSoftware")
    public BaseResponse<Integer> editSoftware(@RequestBody SoftwareEditRequest softwareEditRequest, HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        int id = softwareEditRequest.getId();
        String name = softwareEditRequest.getName();
        String secret = softwareEditRequest.getSecret();
        String notice = softwareEditRequest.getNotice();
        String version = softwareEditRequest.getVersion();
        int machine = softwareEditRequest.getMachine();
        int status = softwareEditRequest.getStatus();

        int result =softwareService.softwareEdit(id,name,secret,notice,version,machine,status,request);

        return ResultUtils.success(result);

    }

    /**
     * 修改软件版本
     * @param uploadVerRequest uploadVerRequest
     * @param request request
     * @return int
     */
    @PostMapping("/uploadVer")
    public BaseResponse<Integer> uploadVer(@RequestBody uploadVerRequest uploadVerRequest, HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        int id = uploadVerRequest.getId();
        String url = uploadVerRequest.getUpdateUrl();
        String version = uploadVerRequest.getVersion();
        String secret = uploadVerRequest.getSecret();


        int result =softwareService.uploadVersion(id,secret,version,url,request);

        return ResultUtils.success(result);

    }

    /**
     * 创建卡密
     * @param kamiCreateRequest kamiCreateRequest
     * @param request request
     * @return 1
     */
    @PostMapping("/createKami")
    public BaseResponse<Integer> createKami(@RequestBody KamiCreateRequest kamiCreateRequest, HttpServletRequest request){
        if(request == null){
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        if(kamiCreateRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        String software = kamiCreateRequest.getSoftware();
        String type = kamiCreateRequest.getType();
        String prefix = kamiCreateRequest.getPrefix();
        int num = kamiCreateRequest.getNum();

        if(StringUtils.isAnyBlank(software,type)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"部分参数为空");
        }
        int result = cardService.createKami(software,type,num,prefix,request);

        return ResultUtils.success(result);
    }

    /**
     * 使用卡密
     * @param kamiUseRequest kamiUseRequest
     * @return 有效期
     */
    @PostMapping("/useKami")
    public BaseResponse<String> useKami(@RequestBody KamiUseRequest kamiUseRequest){


        if(kamiUseRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

         String kami = kamiUseRequest.getKami();
         String userid = kamiUseRequest.getUserid();
         String software = kamiUseRequest.getSoftware();
         String machine = kamiUseRequest.getMachine();
         String ip = kamiUseRequest.getIp();



        if(StringUtils.isAnyBlank(software,kami,userid,machine,ip)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"部分参数为空");
        }
        String result = cardService.useKami(kami,userid,software,machine,ip);

        return ResultUtils.success(result);
    }

    /**
     * 查询名下卡密
     * @param request request
     * @return list
     */
    @GetMapping("/searchKami")
    public BaseResponse<List<Card>> searchKami(HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;

        QueryWrapper<Card> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Card> typeList = cardService.list(queryWrapper);

        return ResultUtils.success(typeList);
    }


    /**
     * 删除卡密
     * @param cardDeleteRequest cardDeleteRequest
     * @param request request
     * @return  int
     */
    @PostMapping("/deleteKami")
    public BaseResponse<Integer> deleteKami(@RequestBody CardDeleteRequest cardDeleteRequest, HttpServletRequest request) {

        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        int id = cardDeleteRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        UpdateWrapper<Card> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id);
        updateWrapper.set("isDelete", 1);
        int result = cardMapper.update(null, updateWrapper);

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


    /**
     * 软件脱敏
     * @param originSoftware originSoftware
     * @return Software
     */
    private Software getSafetySoftware(Software originSoftware){
        if(originSoftware == null){
            return null;
        }

        Software safetySoftware =new Software();
        safetySoftware.setVersion(originSoftware.getVersion());
        safetySoftware.setMachine(originSoftware.getMachine());
        safetySoftware.setStatus(originSoftware.getStatus());
        safetySoftware.setNotice(originSoftware.getNotice());
        safetySoftware.setUpdateUrl(originSoftware.getUpdateUrl());
        safetySoftware.setSecret(originSoftware.getSecret());
        safetySoftware.setUserid(originSoftware.getUserid());

        return safetySoftware;
    }
}

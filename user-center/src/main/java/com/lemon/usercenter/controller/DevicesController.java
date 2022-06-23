package com.lemon.usercenter.controller;
import java.util.Date;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.DevicesMapper;
import com.lemon.usercenter.mapper.PhoneGroupMapper;
import com.lemon.usercenter.model.domain.Devices;
import com.lemon.usercenter.model.domain.PhoneGroup;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.devices.*;
import com.lemon.usercenter.service.DevicesService;
import com.lemon.usercenter.service.PhoneGroupService;
import com.lemon.usercenter.utils.Encrypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/device")
public class DevicesController {

    @Resource
    private DevicesService devicesService;
    @Resource
    private PhoneGroupService phoneGroupService;
    @Resource
    private DevicesMapper devicesMapper;
    @Resource
    private PhoneGroupMapper phoneGroupMapper;

    /**
     * 添加设备
     * @param devicesAddRequest devicesAddRequest
     * @param request request
     * @return 设备名
     */
    @PostMapping("/add")
    public BaseResponse<String> deviceAdd(@RequestBody DevicesAddRequest devicesAddRequest,HttpServletRequest request){
        if(devicesAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String deviceName = devicesAddRequest.getDeviceName();
        String deviceModel = devicesAddRequest.getDeviceModel();
        String remark =devicesAddRequest.getRemark();
        String result = devicesService.addDevices( deviceName,deviceModel,remark,request);

        return ResultUtils.success(result);
    }

    /**
     * 获取设备列表
     * @param request request
     * @return 设备列表
     */
    @GetMapping("/getList")
    public BaseResponse<String> devicesList(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        QueryWrapper<Devices> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<Devices> DevicesList = devicesService.list(queryWrapper);
        for (Devices devices : DevicesList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", devices.getId());
            newObject.put("userid", devices.getUserid());
            newObject.put("uuid", devices.getUuid());
            newObject.put("remark", devices.getRemark());
            newObject.put("deviceName", devices.getDeviceName());
            newObject.put("deviceModel", devices.getDeviceModel());
            newObject.put("deviceGroup", devices.getDeviceGroup());
            newObject.put("status", devices.getStatus());
            newObject.put("createTime", devices.getCreateTime());
            newArray.add(newObject);
        }


        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }

    /**
     * 删除设备
     * @param deviceDeleteRequest  deviceDeleteRequest
     * @param request request
     * @return 0失败 1 成功
     */
    @PostMapping("/delete")
    public BaseResponse<Integer> deleteDevice(@RequestBody DeviceDeleteRequest deviceDeleteRequest, HttpServletRequest request) {


        int id = deviceDeleteRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        UpdateWrapper<Devices> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id);
        updateWrapper.set("isDelete", 1);
        int result = devicesMapper.update(null,updateWrapper);
        return ResultUtils.success(result);

    }

    /**
     * 修改设备分组
     * @param devicesEditRequest  devicesEditRequest
     * @param request request
     * @return 0、1
     */
    @PostMapping("/editPhone")
    public BaseResponse<Integer> editPhone(@RequestBody DevicesEditRequest devicesEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = devicesEditRequest.getId();
        String groupName = devicesEditRequest.getGroupName();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Devices devices =new Devices();
        devices.setId(id);
        devices.setDeviceGroup(groupName);

        int result = devicesMapper.updateById(devices);

        return ResultUtils.success(result);

    }

    /**
     * 添加设备分组
     * @param devicesGroupAddRequest devicesGroupAddRequest
     * @param request request
     * @return 1
     */
    @PostMapping("/addGroup")
    public BaseResponse<String> deviceGroupAdd(@RequestBody DevicesGroupAddRequest devicesGroupAddRequest, HttpServletRequest request){
        if(devicesGroupAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String groupName = devicesGroupAddRequest.getGroupName();
        String note = devicesGroupAddRequest.getNote();
        boolean state = devicesGroupAddRequest.isStatus();
        int status;
        if(state){
            status = 0;
        }else{
            status = 1;
        }

        String result = phoneGroupService.addPhoneGroup(groupName,note,status,request);

        return ResultUtils.success(result);
    }

    /**
     * 获取设备分组列表
     * @param request session
     * @return 设备分组列表
     */
    @GetMapping("/getGroupList")
    public BaseResponse<String> deviceGroupList(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        QueryWrapper<PhoneGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",user.getUserAccount());

        List<PhoneGroup> DevicesGroupList = phoneGroupService.list(queryWrapper);
        for (PhoneGroup phoneGroup : DevicesGroupList) {
            JSONObject newObject = new JSONObject();

            newObject.put("id", phoneGroup.getId());
            newObject.put("name", phoneGroup.getName());
            newObject.put("userid", phoneGroup.getUserid());
            newObject.put("status", phoneGroup.getStatus());
            newObject.put("note", phoneGroup.getNote());
            newObject.put("createTime", phoneGroup.getCreateTime());
            newObject.put("updateTime", phoneGroup.getUpdateTime());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }

    /**
     * 删除设备分组
     * @param deviceGroupDeleteRequest deviceGroupDeleteRequest
     * @param request session
     * @return  int
     */
    @PostMapping("/deleteGroup")
    public BaseResponse<Integer> deleteGroupDevice(@RequestBody DeviceGroupDeleteRequest deviceGroupDeleteRequest, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = deviceGroupDeleteRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        UpdateWrapper<PhoneGroup> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("id", id);
        updateWrapper.set("isDelete", 1);
        int result = phoneGroupMapper.update(null,updateWrapper);
        return ResultUtils.success(result);

    }

    /**
     * 修改设备分组
     * @param deviceGroupEditRequest deviceGroupEditRequest
     * @param request request
     * @return 0、1
     */
    @PostMapping("/editPhoneGroup")
    public BaseResponse<Integer> editPhoneGroup(@RequestBody DeviceGroupEditRequest deviceGroupEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        int id = deviceGroupEditRequest.getId();
        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        String groupName= deviceGroupEditRequest.getGroupName();
        String note =deviceGroupEditRequest.getNote();
        int status = deviceGroupEditRequest.getStatus();
        int result =phoneGroupService.phoneGroupEdit(id,groupName,note,status,request);
        return ResultUtils.success(result);

    }

}

package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.Devices;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.DevicesService;
import com.lemon.usercenter.mapper.DevicesMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author saoren
* @description 针对表【devices】的数据库操作Service实现
* @createDate 2022-06-08 19:34:10
*/
@Service
public class DevicesServiceImpl extends ServiceImpl<DevicesMapper, Devices>
    implements DevicesService{

    @Resource
    private DevicesMapper devicesMapper;


    @Override
    public String addDevices(String deviceName, String deviceModel,String remark, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(deviceName, deviceModel)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }


        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid = user.getUserAccount();


        Devices devices = new Devices();
        devices.setUserid(userid);
        devices.setDeviceModel(deviceModel);
        devices.setDeviceName(deviceName);
        devices.setRemark(remark);

        int row = devicesMapper.insert(devices);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加设备失败");
        }
        return deviceName;
    }
}





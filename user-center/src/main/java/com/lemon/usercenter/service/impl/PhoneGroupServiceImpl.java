package com.lemon.usercenter.service.impl;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.Devices;
import com.lemon.usercenter.model.domain.PhoneGroup;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.PhoneGroupService;
import com.lemon.usercenter.mapper.PhoneGroupMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.ADMIN_ROLE;
import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author saoren
* @description 针对表【phone_group】的数据库操作Service实现
* @createDate 2022-06-10 09:27:43
*/
@Service
public class PhoneGroupServiceImpl extends ServiceImpl<PhoneGroupMapper, PhoneGroup>
    implements PhoneGroupService{


    @Resource
    private PhoneGroupMapper phoneGroupMapper;

    @Override
    public String addPhoneGroup(String groupName, String note, int status, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(groupName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组名不能为空");
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid = user.getUserAccount();

        PhoneGroup phoneGroup = new PhoneGroup();
        phoneGroup.setName(groupName);
        phoneGroup.setUserid(userid);
        phoneGroup.setNote(note);

        int row = phoneGroupMapper.insert(phoneGroup);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加设备分组失败");
        }
        return groupName;

    }

    @Override
    public int phoneGroupEdit(int id,String groupName, String note, int status, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid =user.getUserAccount();


        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间

        Date date;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }


        PhoneGroup newPhoneGroup =new PhoneGroup();
        newPhoneGroup.setId(id);
        newPhoneGroup.setName(groupName);
        newPhoneGroup.setUserid(userid);
        newPhoneGroup.setStatus(status);
        newPhoneGroup.setNote(note);
        newPhoneGroup.setUpdateTime(date);

        return phoneGroupMapper.updateById(newPhoneGroup);

    }
}





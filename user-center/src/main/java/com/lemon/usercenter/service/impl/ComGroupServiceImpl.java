package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;

import com.lemon.usercenter.model.domain.ComGroup;

import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.ComGroupService;
import com.lemon.usercenter.mapper.ComGroupMapper;
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
* @description 针对表【com_group(话术分组)】的数据库操作Service实现
* @createDate 2022-08-12 09:36:01
*/
@Service
public class ComGroupServiceImpl extends ServiceImpl<ComGroupMapper, ComGroup>
    implements ComGroupService{
    @Resource
    private ComGroupMapper comGroupMapper;


    @Override
    public String addComGroup(String groupName, String note, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(groupName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组名不能为空");
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        String userid = user.getUserAccount();

        ComGroup comgroup = new ComGroup();
        comgroup.setGroupName(groupName);
        comgroup.setUserid(userid);
        comgroup.setNote(note);

        int row = comGroupMapper.insert(comgroup);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加关键词分组失败");
        }
        return groupName;
    }

    @Override
    public int ComGroupEdit(int id, String groupName, String note, int status, HttpServletRequest request) {
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


       ComGroup newComGroup =new ComGroup();
        newComGroup.setId(id);
        newComGroup.setGroupName(groupName);
        newComGroup.setUserid(userid);
        newComGroup.setStatus(status);
        newComGroup.setNote(note);
        newComGroup.setUpdateTime(date);

        return comGroupMapper.updateById(newComGroup);
    }
}





package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.PhoneGroupMapper;
import com.lemon.usercenter.model.domain.KewGroup;
import com.lemon.usercenter.model.domain.PhoneGroup;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.KewGroupService;
import com.lemon.usercenter.mapper.KewGroupMapper;
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
* @description 针对表【kew_group】的数据库操作Service实现
* @createDate 2022-07-08 13:59:25
*/
@Service
public class KewGroupServiceImpl extends ServiceImpl<KewGroupMapper, KewGroup>
    implements KewGroupService{
    @Resource
    private KewGroupMapper kewGroupMapper;

    @Override
    public String addKewGroup(String groupName, String note, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(groupName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组名不能为空");
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        String userid = user.getUserAccount();

        KewGroup kewgroup = new KewGroup();
        kewgroup.setGroupName(groupName);
        kewgroup.setUserid(userid);
        kewgroup.setNote(note);

        int row = kewGroupMapper.insert(kewgroup);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加关键词分组失败");
        }
        return groupName;
    }

    @Override
    public int KewGroupEdit(int id, String groupName, String note, int status, HttpServletRequest request) {

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


        KewGroup newKeyGroup =new KewGroup();
        newKeyGroup.setId(id);
        newKeyGroup.setGroupName(groupName);
        newKeyGroup.setUserid(userid);
        newKeyGroup.setStatus(status);
        newKeyGroup.setNote(note);
        newKeyGroup.setUpdateTime(date);

        return kewGroupMapper.updateById(newKeyGroup);
    }
}





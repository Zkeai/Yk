package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;

import com.lemon.usercenter.mapper.TypeMapper;
import com.lemon.usercenter.model.domain.Type;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.TypeService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.*;

/**
* @author saoren
* @description 针对表【type】的数据库操作Service实现
* @createDate 2022-06-01 08:43:47
*/




@Service
public class TypeServiceImpl extends ServiceImpl<TypeMapper, Type>
    implements TypeService{

    @Resource
    private TypeMapper typeMapper;


    @Override
    public String createType(String name, int type, HttpServletRequest request) {

        if(StringUtils.isAnyBlank(name)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        //类型不能重复
        QueryWrapper<Type> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", name);
        long count = typeMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"类型已存在");
        }

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user.getUserRole() != ADMIN_ROLE && user.getUserRole() != AGENCY_ROLE){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        String userId = user.getUserAccount();
        Type timeType = new Type();
        timeType.setName(name);
        timeType.setType(type);
        timeType.setUserid(userId);

        int rows = typeMapper.insert(timeType);
        if(rows <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"插入失败");
        }
        return userId;
    }
}





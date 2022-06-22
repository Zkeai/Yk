package com.lemon.usercenter.service.impl;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.Software;
import com.lemon.usercenter.model.domain.Type;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.SoftwareService;
import com.lemon.usercenter.mapper.SoftwareMapper;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.omg.CORBA.PRIVATE_MEMBER;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.*;

/**
* @author saoren
* @description 针对表【software】的数据库操作Service实现
* @createDate 2022-06-01 21:23:24
*/
@Service
public class SoftwareServiceImpl extends ServiceImpl<SoftwareMapper, Software>
    implements SoftwareService{



    @Resource
    private SoftwareMapper softwareMapper;
    /**
     * 创建软件
     * @param name 软件名
     * @param version 版本号
     * @param notice 公告
     * @param machine 开启机器码
     * @param request session
     * @return secret
     */
    @Override
    public String createSoftware(String name, String version, String notice, int machine, HttpServletRequest request) {
        if(StringUtils.isAnyBlank(name, version, notice)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        //软件名不能重复
        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", name);
        long count = softwareMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"软件已存在");
        }

        //密钥不能重复
        String secret="LM"+ RandomStringUtils.randomAlphabetic(35);
        queryWrapper.eq("secret", secret);
        long rows = softwareMapper.selectCount(queryWrapper);
        if (rows > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密钥已经存在");
        }

        //验证权限
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user.getUserRole() != ADMIN_ROLE && user.getUserRole() != AGENCY_ROLE){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        //插入数据
        String userId = user.getUserAccount();
        Software software = new Software();
        software.setUserid(userId);
        software.setName(name);
        software.setVersion(version);
        software.setNotice(notice);
        software.setMachine(machine);
        software.setSecret(secret);
        int row = softwareMapper.insert(software);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"生成失败");
        }
        return secret;
    }

    @Override
    public int softwareEdit(int id,String name, String secret, String notice, String version, int machine, int status, HttpServletRequest request) {

        if(StringUtils.isAnyBlank(name, version, notice,secret)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }


        //查询密钥和软件是否都存在
        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("secret", secret);
        Software software = softwareMapper.selectOne(queryWrapper);
        if (software == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"软件密钥不存在");
        }


        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间
        Date date = null;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        Software newSoftware = new Software();
        newSoftware.setId(id);
        newSoftware.setSecret(secret);
        newSoftware.setName(name);
        newSoftware.setVersion(version);
        newSoftware.setMachine(machine);
        newSoftware.setStatus(status);
        newSoftware.setNotice(notice);
        newSoftware.setUpdateTime(date);
        return softwareMapper.updateById(newSoftware);

    }

    @Override
    public int uploadVersion(int id,String secret, String version, String url, HttpServletRequest request) {
        if(StringUtils.isAnyBlank(url, version)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"版本或新文件不存在");
        }

        //查询密钥是否存在
        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("secret", secret);
        Software software = softwareMapper.selectOne(queryWrapper);
        if (software == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"软件密钥不存在");
        }

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间
        Date date = null;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        Software newSoftware = new Software();
        newSoftware.setId(id);
        newSoftware.setSecret(secret);
        newSoftware.setUpdateUrl(url);
        newSoftware.setVersion(version);
        newSoftware.setUpdateTime(date);
        int row = softwareMapper.updateById(newSoftware);
        return row;


    }
}





package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.KewGroupMapper;
import com.lemon.usercenter.model.domain.KewGroup;
import com.lemon.usercenter.model.domain.Keyword;
import com.lemon.usercenter.model.domain.Software;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.KeywordService;
import com.lemon.usercenter.mapper.KeywordMapper;
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
* @description 针对表【keyword】的数据库操作Service实现
* @createDate 2022-07-08 14:00:59
*/
@Service
public class KeywordServiceImpl extends ServiceImpl<KeywordMapper, Keyword>
    implements KeywordService{
    @Resource
    private KeywordMapper keywordMapper;
    @Resource
    private KewGroupMapper kewGroupMapper;
    @Override
    public String addKewWord(String keyWord, String content, String keyGroup, int status, String note, HttpServletRequest request) {
        if (StringUtils.isAnyBlank(keyWord,content,keyGroup)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"部分参数不能为空");
        }
        //检测登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        //检查关键词是否存在
        QueryWrapper<Keyword> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("keyWord", keyWord);
        long count1 = keywordMapper.selectCount(queryWrapper1);
        if (count1 > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"关键词已存在");
        }
        //检查分组是否存在
        QueryWrapper<KewGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("groupName", keyGroup);
        KewGroup kewGroup = kewGroupMapper.selectOne(queryWrapper);
        if (kewGroup == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }

        //插入数据
        String userid = user.getUserAccount();

        Keyword keyword = new Keyword();
        keyword.setKeyWord(keyWord);
        keyword.setContent(content);
        keyword.setKeyGroup(keyGroup);
        keyword.setUserid(userid);
        keyword.setNote(note);
        keyword.setStatus(status);
        int row = keywordMapper.insert(keyword);
        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加关键词回答失败");
        }

        //修改分组数量
        int id =kewGroup.getId();
        int num =kewGroup.getNum();
        KewGroup newKeyGroup = new KewGroup();
        newKeyGroup.setId(id);
        newKeyGroup.setNum(num + 1);
        kewGroupMapper.updateById(newKeyGroup);

        return keyWord;
    }

    @Override
    public int KewEdit(int id, String content, String keyGroup, int status, String note, HttpServletRequest request) {
        //检测登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        //检测消息是否存在
        QueryWrapper<Keyword> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("id", id);
        long count1 = keywordMapper.selectCount(queryWrapper1);
        if (count1 < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"关键词内容不存在");
        }

        //检测分组是否存在
        QueryWrapper<KewGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("groupName", keyGroup);
        KewGroup kewGroup = kewGroupMapper.selectOne(queryWrapper);
        if (kewGroup == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"分组不存在");
        }

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间

        Date date;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        Keyword newKeyWord = new Keyword();

        newKeyWord.setId(id);
        newKeyWord.setKeyGroup(keyGroup);
        newKeyWord.setStatus(status);
        newKeyWord.setNote(note);
        newKeyWord.setContent(content);
        newKeyWord.setUpdateTime(date);

        return keywordMapper.updateById(newKeyWord);
    }
}





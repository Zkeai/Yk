package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.ComGroup;
import com.lemon.usercenter.model.domain.HotUpdate;
import com.lemon.usercenter.model.domain.Keyword;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.HotUpdateService;
import com.lemon.usercenter.mapper.HotUpdateMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author saoren
* @description 针对表【hot_update(热更新)】的数据库操作Service实现
* @createDate 2022-11-13 11:30:33
*/
@Service
public class HotUpdateServiceImpl extends ServiceImpl<HotUpdateMapper, HotUpdate>
    implements HotUpdateService{

    @Resource
    private HotUpdateMapper hotUpdateMapper;

    @Override
    public String addHot(String url, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        //检测热更新文件是否存在
        QueryWrapper<HotUpdate> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("id", 1);
        long count1 = hotUpdateMapper.selectCount(queryWrapper1);
        if (count1 >= 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"热更新文件已经存在");
        }


        HotUpdate hotUpdate = new HotUpdate();
        hotUpdate.setUrl(url);
        int row = hotUpdateMapper.insert(hotUpdate);

        if(row <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"添加热更新主文件失败");
        }
        return url;
    }

    @Override
    public int editHot(int id, String url, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        //检测热更新文件是否存在
        QueryWrapper<HotUpdate> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("id", id);
        long count1 = hotUpdateMapper.selectCount(queryWrapper1);
        if (count1 < 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"热更新文件不存在");
        }

        HotUpdate hotUpdate = new HotUpdate();

        hotUpdate.setId(id);
        hotUpdate.setUrl(url);

        return hotUpdateMapper.updateById(hotUpdate);

    }
}





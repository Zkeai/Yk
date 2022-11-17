package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.Web;
import com.lemon.usercenter.service.WebService;
import com.lemon.usercenter.mapper.WebMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author saoren
* @description 针对表【web(网站管理)】的数据库操作Service实现
* @createDate 2022-11-17 19:04:05
*/
@Service
public class WebServiceImpl extends ServiceImpl<WebMapper, Web>
    implements WebService{
    @Resource
    private WebMapper webMapper;
    @Override
    public int webEdit(String web_title, String icon_url, String le_url, String api_url, String utils_url, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }

        //检测是否是第一次
        QueryWrapper<Web> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("id", 1);
        long count1 = webMapper.selectCount(queryWrapper1);
        Web web = new Web();
        if (count1 == 1) {
            //不是第一次,更新
            web.setId(1);
            web.setWeb_title(web_title);
            web.setApi_url(api_url);
            web.setIcon_url(icon_url);
            web.setLe_url(le_url);
            web.setUtils_url(utils_url);
            int row = webMapper.updateById(web);
            if(row <= 0){
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"网站配置更换失败");
            }

        }else{
            //第一次,添加

            web.setWeb_title(web_title);
            web.setApi_url(api_url);
            web.setIcon_url(icon_url);
            web.setLe_url(le_url);
            web.setUtils_url(utils_url);
            int row = webMapper.insert(web);

            if(row <= 0){
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"网站配置增加失败");
            }

        }

        return 1;
    }
}





package com.lemon.usercenter.service.impl;
import java.util.Date;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.Scripts;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.ScriptsService;
import com.lemon.usercenter.mapper.ScriptsMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.*;

/**
* @author saoren
* @description 针对表【scripts】的数据库操作Service实现
* @createDate 2022-06-12 12:29:22
*/
@Service
public class ScriptsServiceImpl extends ServiceImpl<ScriptsMapper, Scripts>
    implements ScriptsService{

    @Resource
    private ScriptsMapper scriptsMapper;

    /**
     * 创建脚本
     * @param name name
     * @param group group
     * @param url url
     * @param type  type
     * @param version version
     * @param note note
     * @param whiteList whiteList
     * @param courseUrl courseUrl
     * @param status status
     * @param request request
     * @return  name
     */
    @Override
    public String createScript(String name, String group,String url, int type, String version, String note,String whiteList,String courseUrl, int status, HttpServletRequest request) {

        String userid =authentication(request).getUserAccount();

        //1.校验请求参数是否合法
        if(StringUtils.isAnyBlank(name,group)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if( type < 0 || type > 2 ){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"type error");
        }

        //2.判断脚本名是否重复
        QueryWrapper<Scripts> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("scriptName", name);
        Scripts newScripts = scriptsMapper.selectOne(queryWrapper);
        if(newScripts != null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"脚本已存在");
        }

        Scripts newScript =new Scripts();
        newScript.setScriptName(name);
        newScript.setScriptGroup(group);
        newScript.setUserid(userid);
        newScript.setUrl(url);
        newScript.setType(type);
        newScript.setVersion(version);
        newScript.setNote(note);
        newScript.setCourseUrl(courseUrl);
        newScript.setStatus(status);
        newScript.setWhiteList(whiteList);



        int tempRows = scriptsMapper.insert(newScript);

        if(tempRows != 1){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"脚本创建失败");
        }

        return name;
    }

    /**
     * 修改脚本
     * @param id id
     * @param name name
     * @param group group
     * @param url url
     * @param type type
     * @param version version
     * @param note note
     * @param whiteList whiteList
     * @param courseUrl courseUrl
     * @param status status
     * @param request request
     * @return 0/1
     */
    @Override
    public int editScript(int id, String name, String group, String url, int type, String version, String note, String whiteList, String courseUrl, int status, HttpServletRequest request) {


        Scripts newScript =new Scripts();
        newScript.setId(id);
        newScript.setScriptName(name);
        newScript.setScriptGroup(group);
        newScript.setUrl(url);
        newScript.setType(type);
        newScript.setVersion(version);
        newScript.setWhiteList(whiteList);
        newScript.setCourseUrl(courseUrl);
        newScript.setStatus(status);
        newScript.setNote(note);

        return scriptsMapper.updateById(newScript);

    }

    /**
     * 封装鉴权
     * @param request request
     * @return userid
     */

    private User authentication (HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user.getUserRole() != ADMIN_ROLE && user.getUserRole() != AGENCY_ROLE){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        return user;
    }
}





package com.lemon.usercenter.model.domain.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;

import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.Web;

import com.lemon.usercenter.model.domain.request.webConfig.WebConfigEditRequest;
import com.lemon.usercenter.service.WebService;
import com.lemon.usercenter.utils.Encrypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.ADMIN_ROLE;
import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/webConfig")
public class WebController {

    @Resource
    private WebService webService;

    @PostMapping("/edit")
    public BaseResponse<Integer> editWebConfig(@RequestBody WebConfigEditRequest webConfigEditRequest, HttpServletRequest request) {

        //检测是不是管理员
        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        String web_title = webConfigEditRequest.getWeb_title();
        String icon_url = webConfigEditRequest.getIcon_url();
        String le_url = webConfigEditRequest.getLe_url();
        String utils_url = webConfigEditRequest.getUtils_url();
        String api_url = webConfigEditRequest.getApi_url();
        int result =webService.webEdit(web_title,icon_url,le_url,api_url,utils_url,request);

        return ResultUtils.success(result);

    }


    @GetMapping("/search")
    public BaseResponse<String> searchHot(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }


        QueryWrapper<Web> queryWrapper = new QueryWrapper<>();
        queryWrapper.gt("id",0);

        List<Web> WebList = webService.list(queryWrapper);

        for (Web web : WebList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", web.getId());
            newObject.put("web_title", web.getWeb_title());
            newObject.put("icon_url", web.getIcon_url());
            newObject.put("le_url", web.getLe_url());
            newObject.put("utils_url", web.getUtils_url());
            newObject.put("api_url", web.getApi_url());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);

    }

    /**
     * 是否为管理员
     * @param request request
     * @return boolean
     */
    private boolean hasPower(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        return user != null && (user.getUserRole() == ADMIN_ROLE);
    }
}

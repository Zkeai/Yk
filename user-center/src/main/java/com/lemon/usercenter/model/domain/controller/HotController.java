package com.lemon.usercenter.model.domain.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.HotUpdateMapper;
import com.lemon.usercenter.model.domain.Card;
import com.lemon.usercenter.model.domain.HotUpdate;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.HotUpdate.HotAddRequest;

import com.lemon.usercenter.model.domain.request.HotUpdate.HotEditRequest;
import com.lemon.usercenter.model.domain.request.kami.SoftwareEditRequest;
import com.lemon.usercenter.service.HotUpdateService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.*;

@RestController
@RequestMapping("/hot")
public class HotController {
    @Resource
    private HotUpdateMapper hotUpdateMapper;

    @Resource
    private HotUpdateService hotUpdateService;

    @PostMapping("/add")
    public BaseResponse<String> addHot(@RequestBody HotAddRequest hotAddRequest, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;

        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }


        if(hotAddRequest == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String updateUrl = hotAddRequest.getUrl();

        String result = hotUpdateService.addHot(updateUrl,request);

        return ResultUtils.success(result);
    }


    @PostMapping("/edit")
    public BaseResponse<Integer> editSoftware(@RequestBody HotEditRequest hotEditRequest, HttpServletRequest request) {

        //检测是不是管理员
        if(!hasPower(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }

        int id = hotEditRequest.getId();
        String hotUrl = hotEditRequest.getUrl();


        int result =hotUpdateService.editHot(id,hotUrl,request);

        return ResultUtils.success(result);

    }


    @GetMapping("/search")
    public BaseResponse<List<HotUpdate>> searchHot() {

        QueryWrapper<HotUpdate> queryWrapper = new QueryWrapper<>();
        queryWrapper.gt("id",0);

        List<HotUpdate> typeList = hotUpdateService.list(queryWrapper);

        return ResultUtils.success(typeList);
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

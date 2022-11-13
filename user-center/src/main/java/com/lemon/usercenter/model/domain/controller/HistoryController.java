package com.lemon.usercenter.model.domain.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.HistorylogMapper;
import com.lemon.usercenter.model.domain.Historylog;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.HistoryLog.HisAddRequest;
import com.lemon.usercenter.service.HistorylogService;
import com.lemon.usercenter.utils.Encrypt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
 * 历史记录
 */
@RestController
@RequestMapping("/history")
public class HistoryController {


    @Resource
    private HistorylogService historylogService;

    @Resource
    private HistorylogMapper historylogMapper;

    @GetMapping("/search")
    public BaseResponse<String> searchType(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        String userid = user.getUserAccount();

        QueryWrapper<Historylog> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",userid).orderByDesc("loginTime").last("limit 20");

        List<Historylog> historyLogsList = historylogService.list(queryWrapper);

        for (Historylog historylog : historyLogsList) {
            JSONObject newObject = new JSONObject();
            newObject.put("userid", historylog.getUserid());
            newObject.put("ip", historylog.getIp());
            newObject.put("address", historylog.getAddress());
            newObject.put("loginTime", historylog.getLoginTime());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);
    }

    @PostMapping("/add")
    public BaseResponse<String> addHis(@RequestBody HisAddRequest hisAddRequest, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;

        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid = user.getUserAccount();

        if(hisAddRequest == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }


        String ip = hisAddRequest.getIp();
        String address = hisAddRequest.getAddress();

        if(StringUtils.isAnyBlank(ip,address)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        Historylog historylog = new Historylog();
        historylog.setIp(ip);
        historylog.setAddress(address);
        historylog.setUserid(userid);

        int rows = historylogMapper.insert(historylog);
        if(rows <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"插入失败");
        }
        return ResultUtils.success(userid);
    }
}

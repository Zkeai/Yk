package com.lemon.usercenter.model.domain.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.TxCos;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.Cos.CosDeleteFileRequest;
import com.lemon.usercenter.model.domain.request.Cos.CosGetFileListRequest;
import com.lemon.usercenter.model.domain.request.Storage.COSConfigEditRequest;
import com.lemon.usercenter.service.TxCosService;
import com.lemon.usercenter.utils.Encrypt;
import com.lemon.usercenter.utils.TXunCos;
import com.qcloud.cos.model.ObjectListing;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.ADMIN_ROLE;
import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;


@RestController
@RequestMapping("/cos")
public class CosController {

    @Resource
    private TxCosService txCosService;


    /**
     * 配置COS参数 修改or增加
     * @param cosConfigEditRequest cosConfigEditRequest
     * @param request request
     * @return result
     */
    @PostMapping("/edit")
    public BaseResponse<Integer> editCosConfig(@RequestBody COSConfigEditRequest cosConfigEditRequest, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        long id;
        if(cosConfigEditRequest.getId() == null){
            id = 0;
        }else{
            id = cosConfigEditRequest.getId();
        }


        String tx_buket_name = cosConfigEditRequest.getTx_buket_name();
        String tx_region = cosConfigEditRequest.getTx_region();
        String tx_secret_id = cosConfigEditRequest.getTx_secret_id();
        String tx_secret_key = cosConfigEditRequest.getTx_secret_key();
        String tx_url = cosConfigEditRequest.getTx_url();
        int result =txCosService.cosEdit(id,tx_secret_id,tx_secret_key,tx_region,tx_url,tx_buket_name,request);

        return ResultUtils.success(result);

    }

    /**
     * 搜索腾讯云COS参数
     * @param request request
     * @return CosList
     * @throws Exception Exception
     */
    @GetMapping("/search")
    public BaseResponse<String> searchCos(HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid = user.getUserAccount();

        QueryWrapper<TxCos> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid",userid);

        List<TxCos> CosList = txCosService.list(queryWrapper);

        for (TxCos txCos : CosList) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", txCos.getId());
            newObject.put("userid", txCos.getUserid());
            newObject.put("tx_secret_id", txCos.getTx_secret_id());
            newObject.put("tx_secret_key", txCos.getTx_secret_key());
            newObject.put("tx_region", txCos.getTx_region());
            newObject.put("tx_url", txCos.getTx_url());
            newObject.put("tx_buket_name", txCos.getTx_buket_name());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);
        return ResultUtils.success(res);

    }


    /**
     * 用户获取储存桶目录文件
     * @param cosGetFileListRequest cosGetFileListRequest
     * @return return
     */
    @PostMapping("/fileList")
    public BaseResponse<ObjectListing> FileList(@RequestBody CosGetFileListRequest cosGetFileListRequest){
        String TX_SECRET_ID =cosGetFileListRequest.getSecret_id();
        String TX_SECRET_KEY = cosGetFileListRequest.getSecret_key();
        String TX_REGION = cosGetFileListRequest.getRegion();
        String buketName = cosGetFileListRequest.getBuketName();
        String prefix = cosGetFileListRequest.getPrefix();
        return ResultUtils.success(TXunCos.FileList(TX_SECRET_ID,TX_SECRET_KEY,TX_REGION,buketName,prefix));

    }

    @PostMapping("/deleteFile")
    public BaseResponse<Boolean> deleteFile(@RequestBody CosDeleteFileRequest cosDeleteFileRequest){
        String TX_SECRET_ID =cosDeleteFileRequest.getSecret_id();
        String TX_SECRET_KEY = cosDeleteFileRequest.getSecret_key();
        String TX_REGION = cosDeleteFileRequest.getRegion();
        String buketName = cosDeleteFileRequest.getBuketName();
        String key = cosDeleteFileRequest.getKey();
        return ResultUtils.success(TXunCos.deleteFile(TX_SECRET_ID,TX_SECRET_KEY,TX_REGION,buketName,key));

    }





}

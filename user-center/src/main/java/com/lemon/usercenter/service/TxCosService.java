package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.TxCos;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【tx_cos(腾讯云cos)】的数据库操作Service
* @createDate 2022-11-18 17:04:38
*/
public interface TxCosService extends IService<TxCos> {
    int cosEdit(Long id, String TX_SECRET_ID, String TX_SECRET_KEY,String TX_REGION, String TX_URL,String TX_BUKET_NAME, HttpServletRequest request);
}

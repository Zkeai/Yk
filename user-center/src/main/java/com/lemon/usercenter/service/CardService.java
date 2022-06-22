package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Card;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lemon.usercenter.model.domain.User;

import javax.servlet.http.HttpServletRequest;

/**
* @author saoren
* @description 针对表【card】的数据库操作Service
* @createDate 2022-06-03 18:22:38
*/
public interface CardService extends IService<Card> {
    int createKami(String software, String type, int num, String prefix, HttpServletRequest request);

    String useKami(String kami, String userid, String software, String machine, String ip);


}

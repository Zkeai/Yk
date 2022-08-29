package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.model.domain.Historylog;
import com.lemon.usercenter.service.HistorylogService;
import com.lemon.usercenter.mapper.HistorylogMapper;
import org.springframework.stereotype.Service;

/**
* @author saoren
* @description 针对表【historylog(登录历史)】的数据库操作Service实现
* @createDate 2022-08-29 12:07:05
*/
@Service
public class HistorylogServiceImpl extends ServiceImpl<HistorylogMapper, Historylog>
    implements HistorylogService{

}





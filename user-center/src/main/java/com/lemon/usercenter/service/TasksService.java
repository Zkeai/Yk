package com.lemon.usercenter.service;

import com.lemon.usercenter.model.domain.Tasks;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author saoren
* @description 针对表【tasks】的数据库操作Service
* @createDate 2022-06-14 22:40:11
*/
public interface TasksService extends IService<Tasks> {
    String addTask(String scriptName, String scriptGroup, String devices, String taskNote, String executionModel ,String sendTime, Integer uuid,String msg,String createTime);

    int editStatus(String createTime,int status,String device);

    Tasks searchTask(String device,int uuid);
}

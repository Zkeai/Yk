package com.lemon.usercenter.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;

import com.lemon.usercenter.model.domain.Tasks;

import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.TasksService;
import com.lemon.usercenter.mapper.TasksMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author saoren
* @description 针对表【tasks】的数据库操作Service实现
* @createDate 2022-06-14 22:40:11
*/
@Service
public class TasksServiceImpl extends ServiceImpl<TasksMapper, Tasks>
    implements TasksService{

    @Resource
    private TasksMapper tasksMapper;

    @Resource
    @Lazy
    private TasksService tasksService;

    /**
     * 增加任务
     * @param scriptName scriptName
     * @param scriptGroup scriptGroup
     * @param devices devices array
     * @param taskNote taskNote
     * @param executionModel executionModel
     * @return 1
     */
    @Override
    public String addTask(String scriptName, String scriptGroup, String devices, String taskNote, String executionModel,String sendTime, Integer uuid,String msg,String createTime) {




         String[] array = devices.split(",");

        for (String device : array) {
            Tasks newTasks = new Tasks();
            newTasks.setExecutionModel(executionModel);
            newTasks.setScriptGroup(scriptGroup);
            newTasks.setScriptName(scriptName);
            newTasks.setDevices(device);
            newTasks.setTaskNote(taskNote);
            newTasks.setSendTime(sendTime);
            newTasks.setUuid(uuid);
            newTasks.setCreateTime(createTime);
            newTasks.setMsg(msg);
            try {
                int tempRows = tasksMapper.insert(newTasks);
                if (tempRows <= 0) {
                    throw new BusinessException(ErrorCode.SYSTEM_ERROR, "任务插入异常");
                }
            } catch (Exception err) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "");
            }
        }

        return createTime;

    }

    /**
     * 修改任务状态
     * @param createTime createTime
     * @param status status
     * @param device device
     * @return 0、1
     */
    @Override
    public int editStatus(String createTime, int status, String device) {

        if(StringUtils.isAnyBlank(createTime)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"时间必不可少");
        }

        //根据时间找id
        QueryWrapper<Tasks> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("createTime", createTime).eq("devices",device);
        Tasks newTask = tasksMapper.selectOne(queryWrapper);
        if (newTask == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"任务不存在");
        }
        int id = newTask.getId();

        Tasks newTasks = new Tasks();
        newTasks.setId(id);
        newTasks.setStatus(status);
        int row = tasksMapper.updateById(newTasks);
        if(row < 1){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"任务状态修改失败");
        }


        return id;
    }

    /**
     * 空闲任务
     * @param device device
     * @param uuid uuid
     * @return Tasks
     */
    @Override
    public Tasks searchTask(String device, int uuid) {
        Tasks task = null;
        if(StringUtils.isAnyBlank(device)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"缺少必要参数");
        }
        QueryWrapper<Tasks> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uuid", uuid).eq("devices",device);
        List<Tasks> tasksList = tasksService.list(queryWrapper);
        //判断有没有正在执行的任务
        for(int i = 0; i<tasksList.size();i++){
            task = tasksList.get(i);
            int status =task.getStatus();
            if(status == 1){
                throw new BusinessException(ErrorCode.TASK_ERROR);
            }
        }

        for(int i = 0; i<tasksList.size();i++){
             task = tasksList.get(i);

            String executionModel =task.getExecutionModel();
            int status =task.getStatus();
            if(Objects.equals(executionModel, "定时") && status == 0){
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
                String Time=df.format(new Date());// new Date()为获取当前系统时间
                Date date = null;
                Date date2 = null;
                String sendTime = task.getSendTime();
                try {
                    date = df.parse(Time);
                    date2 =df.parse(sendTime);
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }

                if (date.before(date2)) {
                    task =null;
                    break;

                }

            }else if(Objects.equals(executionModel, "排队")){
                if(status == 0){
                    break;
                }else if(status == 1){
                    task =null;
                    break;
                }
            }

            if(i == tasksList.size()-1){
                if(task.getStatus() != 0){
                    task =null;
                }
            }
        }

        if(task != null){
           task= getSafetyTask(task);
        }





        return task;
    }

    private Tasks getSafetyTask(Tasks originTask){
        if(originTask == null){
            return null;
        }
        Tasks newTask = new Tasks();
        newTask.setMsg(originTask.getMsg());
        return newTask;
    }

}





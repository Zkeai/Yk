package com.lemon.usercenter.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.Tasks;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.tasks.TasksAddRequest;
import com.lemon.usercenter.model.domain.request.tasks.TasksEditStatusRequest;
import com.lemon.usercenter.model.domain.request.tasks.TasksSearchRequest;
import com.lemon.usercenter.service.TasksService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/task")
public class TasksController {

    @Resource
    private TasksService tasksService;

    @PostMapping("/add")
    public BaseResponse<String> taskAdd(@RequestBody TasksAddRequest tasksAddRequest){
        if(tasksAddRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        String scriptName =tasksAddRequest.getScriptName();
        String scriptGroup = tasksAddRequest.getScriptGroup();
        String devices = tasksAddRequest.getDevices();
        String taskNote = tasksAddRequest.getTaskNote();
        String executionModel = tasksAddRequest.getExecutionModel();
        String sendTime =tasksAddRequest.getSendTime();
        Integer uuid = tasksAddRequest.getUuid();
        String msg = tasksAddRequest.getMsg();
        String time =tasksAddRequest.getCreateTime();
        if(StringUtils.isAnyBlank(scriptName,scriptGroup,devices)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"主要参数为空");
        }

        String result = tasksService.addTask(scriptName,scriptGroup,devices,taskNote,executionModel,sendTime,uuid,msg,time);

        return ResultUtils.success(result);
    }

    @GetMapping("/getTask")
    public BaseResponse<List<Tasks>> getTask(HttpServletRequest request) {
        List<Tasks> safetyList =new ArrayList<>();
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }


            //普通用户
            QueryWrapper<Tasks> queryWrapper = new QueryWrapper<>();

            queryWrapper.eq("uuid",user.getUuid());
            List<Tasks> TasksList = tasksService.list(queryWrapper);
            for (Tasks tasks : TasksList) {
            Tasks newTask = getSafetyTask(tasks);
            safetyList.add(newTask);


        }

        return ResultUtils.success(safetyList);
    }

    @PostMapping("/editStatus")
    public BaseResponse<Integer> editStatus(@RequestBody TasksEditStatusRequest tasksEditStatusRequest){
        if(tasksEditStatusRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        String createTime =tasksEditStatusRequest.getCreateTime();
        String device =tasksEditStatusRequest.getDevice();
        Integer status = tasksEditStatusRequest.getStatus();

        if(StringUtils.isAnyBlank(createTime)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"主要参数为空");
        }

        int result = tasksService.editStatus(createTime,status,device);

        return ResultUtils.success(result);
    }

    @PostMapping("/search")
    public BaseResponse<Tasks> search(@RequestBody TasksSearchRequest tasksSearchRequest){
        if(tasksSearchRequest == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        int uuid =tasksSearchRequest.getUuid();
        String device =tasksSearchRequest.getDevice();

        if(StringUtils.isAnyBlank(device)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"主要参数为空");
        }

        Tasks result = tasksService.searchTask(device,uuid);

        return ResultUtils.success(result);
    }

    private Tasks getSafetyTask(Tasks originTask){
        if(originTask == null){
            return null;
        }
        Tasks newTask = new Tasks();
        newTask.setExecutionModel(originTask.getExecutionModel());
        newTask.setSendTime(originTask.getSendTime());
        newTask.setTaskNote(originTask.getTaskNote());
        newTask.setDevices(originTask.getDevices());
        newTask.setId(originTask.getId());
        newTask.setCreateTime(originTask.getCreateTime());
        newTask.setScriptName(originTask.getScriptName());
        newTask.setScriptGroup(originTask.getScriptGroup());
        newTask.setStatus(originTask.getStatus());
        return newTask;
    }
}

package com.lemon.usercenter.listener;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.model.domain.controller.WsController;
import com.lemon.usercenter.mapper.DevicesMapper;
import com.lemon.usercenter.mapper.TasksMapper;
import com.lemon.usercenter.model.domain.Devices;
import com.lemon.usercenter.model.domain.Tasks;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Objects;

@Component
@RabbitListener(queues = "my-dlx-queue")
public class MessageListener {

    @Resource
    private WsController wsController;

    @Resource
    private TasksMapper tasksMapper;

    @Resource
    private DevicesMapper devicesMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RabbitHandler
    public void receive (Map<String,Object> map){
            JSONObject msg = (JSONObject) map.get("msg");
            if(Objects.equals(msg.getString("type"), "定时")){
                String device = map.get("device").toString();
                //1.判断设备是否在线
                QueryWrapper<Devices> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("deviceModel", device);
                Devices device_ = devicesMapper.selectOne(queryWrapper);
                int deviceStatus = device_.getStatus();

                //2.判断是不是离线设备任务
                boolean isOfflineTask = map.containsKey("offline");
                //3.设备在线  判断有没有正在执行的任务-
                if(deviceStatus == 0){
                    //有没有执行任务
                    QueryWrapper<Tasks> queryWrapper1 = new QueryWrapper<>();
                    queryWrapper1.eq("devices",device).eq("status",1);
                    Long newTask = tasksMapper.selectCount(queryWrapper1);
                    if(newTask == 0){ //没有执行任务 直接下发任务
                        wsController.sendOneMessage(device,msg.toString());
                    }
                    if(newTask > 0){ //执行任务 设备延迟任务10分钟
                        rabbitTemplate.convertAndSend("delayQueue", map, new MessagePostProcessor() {
                            @Override
                            public Message postProcessMessage(Message message) throws AmqpException {
                                //设置消息的过期时间
                                message.getMessageProperties().setExpiration("600000");
                                return message;
                            }
                        });
                    }
                }


                //4. 设备离线
                    if(deviceStatus == 1){

                        //离线任务 脚本任务置失败
                        if(isOfflineTask){
                            String createTime = msg.getString("createTime");
                            QueryWrapper<Tasks> queryWrapper1 = new QueryWrapper<>();
                            queryWrapper1.eq("createTime",createTime).eq("devices",device);
                            Tasks task = tasksMapper.selectOne(queryWrapper1);
                            int id =task.getId();
                            Tasks newTask = new Tasks();
                            newTask.setId(id);
                            newTask.setStatus(5);
                            tasksMapper.updateById(newTask);
                        }
                        //置6小时延迟
                        if(!isOfflineTask){

                            map.put("offline",0);
                            rabbitTemplate.convertAndSend("delayQueue", map, new MessagePostProcessor() {
                                @Override
                                public Message postProcessMessage(Message message) throws AmqpException {
                                    //设置消息的过期时间
                                    message.getMessageProperties().setExpiration("60000"); //21600000
                                    return message;
                                }
                            });
                        }
                    }
            }
    }
}

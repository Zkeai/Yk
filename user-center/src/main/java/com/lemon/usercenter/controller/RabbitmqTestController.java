package com.lemon.usercenter.controller;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("test")
public class RabbitmqTestController {
    @Autowired
    private RabbitTemplate rabbitTemplate;


    @GetMapping
    public String sendMsg(String msg,String time){
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("msg",msg);

        /**
         * 参数一 队列名称
         * 参数二 消息
         * 参数三 消息处理器
         */
        rabbitTemplate.convertAndSend("delayQueue", map, new MessagePostProcessor() {
            @Override
            public Message postProcessMessage(Message message) throws AmqpException {
                //设置消息的过期时间
                message.getMessageProperties().setExpiration(time);
                return message;
            }
        });
        return "success";
    }
}

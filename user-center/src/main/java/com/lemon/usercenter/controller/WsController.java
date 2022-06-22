package com.lemon.usercenter.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.lemon.usercenter.mapper.DevicesMapper;
import com.lemon.usercenter.mapper.TasksMapper;
import com.lemon.usercenter.mapper.UserMapper;
import com.lemon.usercenter.model.domain.Devices;


import com.lemon.usercenter.model.domain.Tasks;
import com.lemon.usercenter.model.domain.User;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;


@ServerEndpoint("/ws/{uid}")
@Component
public class WsController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Resource
    private DevicesMapper devicesMapper;

    @Resource
    private UserMapper userMapper;

    @Resource
    private TasksMapper tasksMapper;
    private static WsController WsController;

    @PostConstruct  //关键点3
    public void init(){
        WsController = this;
    }

    private static int onlineCount = 0;
    private static final CopyOnWriteArraySet<WsController> webSocketMap= new CopyOnWriteArraySet<>();



    private static final Map<String, Session> sessionPool = new HashMap<>();

    private Session session;

    private String uid = "";

    @OnOpen
    public void onOpen(Session session, @PathParam("uid") String uid){

        //System.out.println(getOnlineCount());


        this.session=session;
        this.uid = uid;

        webSocketMap.add(this);
        sessionPool.put(uid,session);
        addOnlineCount();
        try{
            sendMsg();
        }catch (IOException e){
            e.printStackTrace();
        }


    }

    @OnClose
    public void onClose(){

        QueryWrapper<Devices> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("deviceModel",uid);
        Devices device = WsController.devicesMapper.selectOne(queryWrapper);
        if(device != null){
            int newDeviceId = device.getId();
            Devices newDevice = new Devices();
            newDevice.setId(newDeviceId);
            newDevice.setDeviceModel(uid);
            newDevice.setStatus(1);
            int row = WsController.devicesMapper.updateById(newDevice);
            if (row > 0){
                sendOneMessage("super","设备下线");
            }

        }
            webSocketMap.remove(this);
            subOnlineCount();

    }


    /**
     * 接收客户端的消息
     * @param message message
     */
    @OnMessage
    public void onMessage(String message){
        JSONObject jsonObject = JSONObject.parseObject(message);
        //1.收到的不是super的消息
        if(!Objects.equals(uid, "super")){
            switch (jsonObject.getString("type")){
                case "online":
                    QueryWrapper<Devices> queryWrapper = new QueryWrapper<>();
                    String deviceModel = jsonObject.getJSONObject("msg").getString("deviceModel");
                    queryWrapper.eq("deviceModel",deviceModel);
                    Devices device = WsController.devicesMapper.selectOne(queryWrapper);
                    if(device != null){
                        //设备存在 更新设备状态
                        int newDeviceId = device.getId();
                        Devices newDevice = new Devices();
                        newDevice.setId(newDeviceId);
                        newDevice.setDeviceModel(deviceModel);
                        newDevice.setStatus(0);
                        int row = WsController.devicesMapper.updateById(newDevice);
                        if (row > 0){

                            JSONObject msg = new JSONObject();
                            msg.put("type","设备上线成功");
                            sendOneMessage(uid,msg.toString());
                            sendOneMessage("super","设备上线");

                        }

                    }else{
                        JSONObject msg = new JSONObject();
                        msg.put("type","addDevice");
                        //设备不存在 返回设备addDevice指令
                        sendOneMessage(uid,msg.toString());
                    }

                   break;
                case "addDevice":
                    String devName = jsonObject.getJSONObject("msg").getString("deviceName");
                    String devModel = jsonObject.getJSONObject("msg").getString("deviceModel");
                    String uuid = jsonObject.getJSONObject("msg").getString("uuid");
                    String remark = jsonObject.getJSONObject("msg").getString("remark");

                    QueryWrapper<User> queryWrapper1 = new QueryWrapper<>();
                    queryWrapper1.eq("uuid", uuid);
                    User user = WsController.userMapper.selectOne(queryWrapper1);
                    if(user == null){
                        JSONObject msg = new JSONObject();
                        msg.put("type","uuid不存在");
                        sendOneMessage(uid,msg.toString());
                    }
                    assert user != null;
                    String userid = user.getUserAccount();
                    Devices newDevices = new Devices();
                    newDevices.setUuid(Integer.parseInt(uuid));
                    newDevices.setDeviceName(devName);
                    newDevices.setDeviceModel(devModel);
                    newDevices.setUserid(userid);
                    newDevices.setRemark(remark);
                    int row = WsController.devicesMapper.insert(newDevices);
                    if(row > 0){
                        JSONObject msg = new JSONObject();
                        msg.put("type","设备添加成功");
                        sendOneMessage(uid,msg.toString());
                        sendOneMessage("super","设备上线");

                    }

                    break;

            }
        }else{


            switch(jsonObject.getString("type")){
                case "排队":
                    sendQueueMessage(jsonObject);
                    break;

                case "定时":
                    String createTime =jsonObject.getJSONObject("msg").getString("createTime");
                    String sendTime =jsonObject.getJSONObject("msg").getString("sendTime");
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date d1;
                    Date d2;
                    try {
                        d1 = format.parse(createTime);
                        d2 = format.parse(sendTime);
                        long diff = d2.getTime() - d1.getTime();
                        long diffSeconds = diff / 1000 % 60;
                        JSONArray array =jsonObject.getJSONArray("array");
                        sendTimeMessage(jsonObject.getJSONObject("msg"),array,Long.toString(diffSeconds*1000));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    break;
            }

        }




    }



    /**
     * 排队任务 socket消息
     * @param jsonObject jsonObject
     */
    public void sendQueueMessage(JSONObject jsonObject) {
        JSONArray array =jsonObject.getJSONArray("array");
        String msg = jsonObject.getString("msg");
        for(int i = 0; i < array.toArray().length; i++){
            String device = array.toArray()[i].toString();
            //通过设备码查询是否有未完成的任务
            QueryWrapper<Tasks> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("devices",device).eq("status",0).or().eq("status",1);
            Long newTask = WsController.tasksMapper.selectCount(queryWrapper1);
            if(newTask == 1){
                sendOneMessage(device,msg);
            }


        }
    }

    /**
     * 定时任务
     * @param jsonObject jsonObject
     */
    public void sendTimeMessage(JSONObject jsonObject,JSONArray array,String sendTime) {
        //1.挂起任务 计算需要延迟的时间 放入队列

        for(int i = 0; i < array.toArray().length; i++){
            String device = array.toArray()[i].toString();

            JSONObject object =  new JSONObject();
            object.put("device",device);
            object.put("msg",jsonObject);
            String message = JSON.toJSONString(object);
            sendMsg(message,sendTime);


        }




    }


    public void sendMsg(String msg,String time){
        Map<String, Object> map = new HashMap<>();
        JSONObject msg_ = JSONObject.parseObject(msg).getJSONObject("msg");
        String device = JSONObject.parseObject(msg).getString("device");
        map.put("device",device);
        map.put("msg",msg_);

        WsController.rabbitTemplate.convertAndSend("delayQueue", map, new MessagePostProcessor() {
            @Override
            public Message postProcessMessage(Message message) throws AmqpException {
                //设置消息的过期时间
                message.getMessageProperties().setExpiration(time);
                return message;
            }
        });

    }

    /**
     * 群发消息
     * @param message message
     */
    public void sendAllMessage(String message) {
        for (WsController webSocket : webSocketMap) {
            try {
                webSocket.session.getAsyncRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 点对点发消息
     *
     * @param uid     IMEI
     * @param message message
     *
     */
    public void sendOneMessage(String uid, String message) {
        Session session = sessionPool.get(uid);
        if (session != null) {
            try {
                session.getAsyncRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @OnError
    public void onError(Throwable throwable){
        throwable.printStackTrace();
    }
    //   下面是自定义的一些方法
    private void sendMsg() throws IOException {
        JSONObject msg = new JSONObject();
        msg.put("type","ws连接成功");
        this.session.getBasicRemote().sendText(msg.toString());
    }
    public static synchronized int getOnlineCount(){
        return onlineCount;
    }
    public static synchronized void addOnlineCount(){
        onlineCount++;
    }
    public static synchronized void subOnlineCount(){
        onlineCount--;
    }





}

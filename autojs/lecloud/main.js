/*
 * @Author: L.柠
 * @Date: 2022-06-10 21:25:52
 */

"ui";
var 版本 ="V1.0.0611"

var utils =require('utils.js')

//var url ="http://121.5.147.22/api/"
//var ws_url ="backend.lemox.club:8080"

var url ="https://backend.lemox.club/api/"
var ws_url ="backend.lemox.club"

var notice ="仅用于自动化测试,不得用于其他用途。"


var 版本标题 ="LeCloud "+版本
var Root =""
var SBXH = device.model
var brand = device.brand
var broad = device.broad
var serial = device.serial
var IMEI = device.getIMEI()
var Androidid = device.getAndroidId()
var x = device.width
var y = device.height
var SB = x+" x "+y
var SBXT = device.release
var uuid;
var remark;
var secret;
var Ws;

//检测root
function isSuEnable() {
    var file = null;
    var paths = ["/system/bin/", "/system/xbin/", "/system/sbin/", "/sbin/", "/vendor/bin/", "/su/bin/"];
    try {
        for (let path in paths) {
            let file = new java.io.File(paths[path] + "su");
            if (file.exists() && file.canExecute()) return true;
        }
    } catch (x) {
        toast("错误" + x)
    }
    return false;
}
if (isSuEnable() != true) {
    Root = "设备未root"
} else {
    Root = "设备已root"
}
//构造自己得按钮
var ColoredButton = (function () {
    //继承ui.Widget
    util.extend(ColoredButton, ui.Widget);

    function ColoredButton() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义按钮颜色
        this.defineAttr("color", (view, name, defaultGetter) => {
            return this._color;
        }, (view, name, value, defaultSetter) => {
            this._color = value;
            view.attr("backgroundTint", value);
        });
        //自定义属性onClick，定义被点击时执行的代码
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            this._onClick = value;
        });
    }
    ColoredButton.prototype.render = function () {
        return (
            <button textSize="11sp" style="Widget.AppCompat.Button.Colored" w="auto" />
        );
    }
    ColoredButton.prototype.onViewCreated = function (view) {
        view.on("click", () => {
            if (this._onClick) {
                eval(this._onClick);
            }
        });
    }
    ui.registerWidget("colored-button", ColoredButton);
    return ColoredButton;
})();

ui.layout(
    <drawer id="drawer">
    <vertical>
        <appbar>
            <toolbar id="toolbar" bg="#ff4fb3ff" title={版本标题} h="40sp" />
            <tabs id="tabs" bg="#ff4fb3ff" />
        </appbar>
        <viewpager id="viewpager">
            <frame>
                <vertical>
                    {/* 卡片一 */}
                    <card w="*" h={notice.length<=49 ? "40vh" : "100vh"} margin="10 5"  cardCornerRadius="2dp" bg="#fff7a7"
                        cardElevation="1dp" gravity="center_vertical">
                        <vertical>
                        <horizontal padding="10 0">
                            <img src="https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/blog/公告.png" width="20sp"/>
                            <text text={notice} margin={notice.length > 25 ? "5vh" : "10vh"}  textColor="#ff5722" textSize="12sp" />
                        </horizontal>
                        </vertical>
                        
                    </card>

                    {/* 卡片二 */}
                    <card w="*" h="40vh" margin="10 5"  cardCornerRadius="2dp"
                        cardElevation="1dp" gravity="center_vertical">
                       <vertical>
                            <horizontal padding="10 0" h="auto">

                            <Switch text="无障碍服务" id="autoService" checked="{{auto.service != null}}" margin="10 5 0 0" />

                            <Switch text="悬浮窗服务" id="悬浮窗服务" checked="{{floaty.checkPermission() != false}}" margin="70 5 0 0" />
                            </horizontal>
                        </vertical>

                        <View bg="#f44336" h="*" w="10" />
                    </card>
                    {/* 卡片三 */}
                    <card id="card3" w="*" h="200vh" margin="10 5" cardCornerRadius="2dp"
                        cardElevation="1dp" gravity="center_vertical">
                                    <vertical>
                                        <horizontal padding="10 0" h="auto">
                                            <text id="UUID" text="UUID:" textColor="#222222" textSize="12sp" margin="10 0 0 0" />
                                            <input id="input_uuid"  readonly="readonly" hint="请输入UUID(后台获取)" width="280sp"  textSizeHint="10sp" textSize="11sp" />
                                        </horizontal>

                                        <horizontal padding="10 0" h="auto">

                                        <text id="remark" text="编号:" textColor="#222222" textSize="12sp" margin="10 0 0 0" />
                                        <input id="input_remark"  readonly="readonly" hint="请输入设备编号" width="280sp"  textSizeHint="10sp" textSize="11sp" />
                                        </horizontal>

                                        <horizontal padding="10 0" h="auto">
                                        <text id="software" text="密钥:" textColor="#222222" textSize="12sp" margin="10 0 0 0" />
                                        <input id="input_software"  readonly="readonly" hint="仅卡密用户需要,联系上级获取" width="280sp"  textSizeHint="10sp" textSize="11sp" />
                                        </horizontal>
                                        
                                        <horizontal padding="10 0" h="auto">
                                        <text id="secret" text="卡密:" textColor="#222222" textSize="12sp" margin="10 0 0 0" />
                                        <input id="input_secret"  readonly="readonly" hint="仅卡密用户需要" width="280sp"  textSizeHint="10sp" textSize="11sp" />
                                        </horizontal>


                                        <colored-button   id="保存" text="保存" color="#1BD0D0" margin="10 5 0 0" w="320sp" />
                                    </vertical>

                        <View bg="#0b84f4" h="*" w="10" />
                    </card>




                </vertical>
            </frame>

            <frame>
            <card w="*" h="300" margin="10 20" cardCornerRadius="2dp"
                cardElevation="1dp" gravity="center_vertical">

                    <vertical>
                            <horizontal padding="10 8" h="auto">
                                <text text="APP版本：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text id="bb" text={版本} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            
                            <horizontal padding="10 8" h="auto">
                                <text text="产品品牌：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={brand} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            <horizontal padding="10 8" h="auto">
                                <text text="设备型号：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={SBXH} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            <horizontal padding="10 8" h="auto">
                                <text text="硬件序列号：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={serial} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            <horizontal padding="10 8" h="auto">
                                <text text="设备屏幕分辨率：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={SB} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            
                            <horizontal padding="10 8" h="auto">
                                <text text="安卓版本：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={SBXT} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            <horizontal padding="10 8" h="auto">
                                <text text="安卓ID：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={Androidid} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>
                            
                            <horizontal padding="10 8" h="auto">
                                <text text="IMEI：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={IMEI} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>

                            <horizontal padding="10 8" h="auto">
                                <text text="当前设备是否Root：" padding="0 0 0 0" textColor="#222222" textSize="12sp" />
                                <text text={Root} padding="5 0 0 0" textColor="#9198AE" textSize="12sp" />
                            </horizontal>
                        </vertical>



                <View bg="#afafaf" h="*" w="10" />
            </card>
            </frame>
        </viewpager>
    </vertical>
    <vertical layout_gravity="left" bg="#ffffff" w="280">
        <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg" />
        <list id="menu">
            <horizontal bg="?selectableItemBackground" w="*">
                <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
            </horizontal>
        </list>
    </vertical>
</drawer>
);








//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("编辑");
    menu.add("日志");
    menu.add("退出");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "编辑":
            ui.card3.attr("h","200vh")
            ui.保存.attr("visibility", "visible");
 
            break;
        case "日志":
            app.startActivity("console");
            break;
        case "退出":
            confirm('亲,确定要退出么?').then(clear=>{
                if (clear){
                    utils.stop_autojs()
                };
            })
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["应用设置", "设备信息"]);

//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//悬浮窗和无障碍权限

ui.autoService.on("check", function(checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

ui.悬浮窗服务.on("check", function(checked) {
    //申请悬浮窗
    importClass(android.content.Intent);
    importClass(android.net.Uri);
    importClass(android.provider.Settings);
    var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
        Uri.parse("package:" + context.getPackageName()));
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    app.startActivity(intent);
});

//当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.悬浮窗服务.checked = floaty.checkPermission() != false
});

if (auto.service == null) {
    toast("请先开启无障碍服务！");
}

    //创建一个储存
    var storage = storages.create("leCloud");
    初始化()
    function 初始化(){
        if (storage.contains("uuid") == true) {
            let uuid_ = storage.get("uuid")
            ui.input_uuid.setText(uuid_)
        }
        if (storage.contains("remark") == true) {
            let remark_ = storage.get("remark")
            ui.input_remark.setText(remark_)
        }
        if (storage.contains("secret") == true) {
            let secret_ = storage.get("secret")
            ui.input_secret.setText(secret_)
        }
        if (storage.contains("software") == true) {
            let software_ = storage.get("software")
            ui.input_software.setText(software_)
        }
    }






ui.保存.on("click",function(){
    uuid =String(ui.input_uuid.getText())
    remark =String(ui.input_remark.getText())
    secret = String(ui.input_secret.getText())
    software = String(ui.input_software.getText())
    if( uuid == ""){
        toastLog("请填入UUID")
        return
    }
    if( remark == ""){
        toastLog("请填入编号")
        return
    }

        主脚本(uuid,secret,software)

    
})



function 主脚本(uuid,secret,software){

/* 会员登录 */
    function hasUUID(uuid){
        try {
            var thread = threads.start(function(){
                var res = http.postJson(url+"user/searchUUID", {
                    "uuid": uuid,
                    "remark":remark,
                    "model":IMEI
                });
                var html = res.body.string();
                var html = JSON.parse(html);
                data = html.data;

            })
            thread.join()
            switch(data){
                case null:
                    toastLog("uuid不存在")
                    break;
                case 2:
                    toastLog("编号重复")
                    break;
                case 3:
                    
                    if(secret !== ''){
                        var response = usekami(uuid,secret,software)
                        if(response == true){
                            Ws = startWs();
                        }
                    }else{
                        toastLog("用户未充值")
                    }
                    break;
                case 4:
                    if(secret !== ''){
                        var response = usekami(uuid,secret,software)
                        if(response == true){
                            Ws = startWs();
                        }
                    }else{
                        toastLog("用户已过期")
                    }
                    
                    break;
                case 0:
                    storage.put("uuid",uuid)
                    storage.put("remark",remark)
                    Ws = startWs();
        
                    ui.post(() => {
                        ui.保存.attr("visibility", "gone");
                        ui.card3.attr("h","80vh")
                    }, 1000);
                    break;
            }
            return Ws
        } catch (error) {
            toastLog("未知错误")
        }
        function startWs(){
            let ws = web.newWebSocket("wss://"+ws_url+"/api/ws/"+IMEI, {
                eventThread: 'this'
                });
                ws.on("open", (res, ws) => {
                    toastLog("device online");
                    setTimeout(()=>{
                        var msg = JSON.stringify({
                            type: "online",
                            msg:{
                                deviceModel: IMEI
                            }
                        });
                        
                        ws.send(msg)
                    },2000)
                })  
        
                return ws;
        
        
        }


    }
    Ws = hasUUID(uuid)

/* 卡密登录 */
    function usekami(uuid,secret,software){
        let response =false;
        try {
            let thread =threads.start(function(){
                            //获取uuid
                            var res = http.postJson(url+"user/getUserid", {
                                "uuid": uuid,
                            });
                            var html = res.body.string();
                            var html = JSON.parse(html);
                            var userid = html.data;
                        //获取机器码
                        function 设备信息加密(){
                            var MD5 = require('./md5.js');
                            return MD5.hex_md5(device.model,device.fingerprint,device.serial,device.getIMEI(),false,true)
                        }
                        var machine = 设备信息加密()
                        //获取ip
                        var res = http.get("http://ip.json-json.com/");
                        var ip = res.body.string();


                        //use
                            var res = http.postJson(url+"kami/useKami", {
                                "userid": userid,
                                "software": software,
                                "kami": secret,
                                "machine": machine,
                                "ip": ip
                            });
                            var html = res.body.string();
                            var html = JSON.parse(html);
                            code =html.code
                            data = html.data;
                            description=html.description
                        })
                        thread.join()
                            if(code == 40000){
                                toastLog(description)
                            }
                            else if(code == 50000){
                                toastLog(description)
                            }
                            else if(code == 0){
                                if(compare(data)){
                                    storage.put("uuid",uuid)
                                    storage.put("remark",remark)
                                    storage.put("secret",secret)
                                    storage.put("software",software)
                                    ui.post(() => {
                                        ui.保存.attr("visibility", "gone");
                                        ui.card3.attr("h","145vh")
                                    }, 1000);
                                    response = true
                                }else{
                                    toastLog("卡密过期")               
                                }
                            }





            return response;

        } catch (error) {
            toastLog(error)
        }






    }


//设备上线 开启websocket功能
    if(Ws !== undefined){
        Ws.on("text", (text, ws) => {
            console.info("服务端消息: "+ text);
           var text =eval('(' + text + ')')

           switch(text.type){

            case "addDevice":
                var msg = JSON.stringify({
                    type: "addDevice",
                    msg:{
                        deviceName: brand,
                        deviceModel:IMEI,
                        remark:remark,
                        uuid:uuid
                    },

                });
                ws.send(msg);
            break;
            case "排队":
                console.log("ws排队任务")
                var reg = new RegExp("[^/]+(?=/$|$)", "g");
                var 文件名 =decodeURIComponent(reg.exec((text.scriptUrl))[0]) 
                    var thread = threads.start(function(){
                        运行脚本(text,文件名)
                    });
                 
                thread.join();
                

                break;
             case "定时":
                console.log("ws定时任务")
                var reg = new RegExp("[^/]+(?=/$|$)", "g");
                var 文件名 =decodeURIComponent(reg.exec((text.scriptUrl))[0]) 

                    var thread = threads.start(function(){
                        运行脚本(text,文件名)
                    });


                thread.join();
               
                break;




        }
        })


    }



  }


//悬浮窗
threads.start(function(){
    var window = floaty.window(
        
        <frame>
            <vertical gravity="left" >
            <img id="icon"  src="https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/userCenterAvatar/3.png" w="30" h="30" alpha="0.8"  radius="15px"/>
            <button  id="action"  marginTop="5" text="启动" w="50" h="30" textSize="12" padding="-2 0 0 0" bg="#525252" color="#29f529"  alpha="0.7"  />
            <button  id="日志"  marginTop="5" text="日志" w="50" h="30" textSize="12" padding="-2 0 0 0" bg="#525252" color="#06cad3"  alpha="0.7"  />
            <button  id="设置"  marginTop="5" text="设置" w="50" h="30" textSize="12" padding="-2 0 0 0" bg="#525252" color="#f5f529"  alpha="0.7"  />
            </vertical>
        </frame>
    );

    setInterval(() => {}, 1000);

    var execution = null;
    var intervalID = null;
    //记录按键被按下时的触摸坐标
    var x = 0,
        y = 0;
    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    var downTime;

    window.icon.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                // if (new Date().getTime() - downTime > 1500) {
                //     exit();
                // }
                return true;
            case event.ACTION_UP:
                if (new Date().getTime() - downTime < 150) {
                    if(window.action.visibility ===  0 ){
                    
                        ui.post(() => {
                            window.action.attr("visibility","gone")
                            window.日志.attr("visibility","gone")
                            window.设置.attr("visibility","gone")
                            window.icon.attr("src","https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/userCenterAvatar/2.png")
                        })
                    }else{
                        
                        ui.post(() => {
                            window.action.attr("visibility","visible")
                            window.日志.attr("visibility","visible")
                            window.设置.attr("visibility","visible")
                            window.icon.attr("src","https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/userCenterAvatar/3.png")
                        })
                    }
                }
                

                
        }
        return true;
    });
    
    window.日志.on("click",function(){

        app.startActivity("console");
    })
    window.设置.on("click",function(){

        app.startActivity("settings");
    })
    window.action.on("click",function(){
        if(ui.保存.visibility ===  8){
            onClick()
        }else{
            toastLog("验证失败,无法启动")
        }
        
    })
    function onClick() {
        if (window.action.getText() == '启动') {
        
            intervalID = setInterval(function(){
                console.log("监控中")
                res=null
                //todo   需要监控是不是有任务 10分钟
                let res = MonitoringTask(IMEI,uuid)
                if( res !== "已经有执行任务" && res !== null){
                    res =res.msg
                    res =eval('(' + res + ')')
                    var reg = new RegExp("[^/]+(?=/$|$)", "g");
                    var 文件名 =decodeURIComponent(reg.exec((res.scriptUrl))[0]) 

                        var intervalThread = threads.start(function(){
                            运行脚本(res,文件名)
                        }); 

                    intervalThread.join();
                   
                }else if(res === null){
                    console.log("当前设备没有查询到任务")
                }
                else if(res === "已经有执行任务"){
                    console.log("有正在执行的任务")
                }

            },600000)
            window.action.setText('停止');
        } else {
            if (execution) {
                console.info("手动停止脚本")
                execution.getEngine().forceStop(); 

            }
            if(intervalID !==null){
                console.info("手动停止轮询监控")
                clearInterval(intervalID)
            }

            window.action.setText('启动');
        }
    }

})



//todo
function 运行脚本(msg,filename){
        utils.downloadFile(msg.scriptUrl,filename)
        var script = require("/sdcard/脚本/"+filename)
        utils.editTask(msg.createTime,IMEI,1)
        switch(filename){
            case "抖音养号.js":
                var dz = true;
                var PlDz = true;
                var PlGk = true;
                var PlLy = true;
                if(msg.Dz == ""){
                    dz= false
                }
                if(msg.PlDz == ""){
                    PlDz= false
                }
                if(msg.PlGk == ""){
                    PlGk= false
                }                
                if(msg.PlLy == ""){
                    PlLy= false
                }
                var D_PlLy = msg.D_PlLy
                if(D_PlLy == undefined){
                    D_PlLy = "";
                }
                function exec1(action, args){
                 args = args || {};
                  engineScript = engines.execScript(action.name, action.name + "(" + JSON.stringify(args) + ");\n" + action.toString());
                    
                }
                exec1(script.main, {
                    createTime:msg.createTime,
                    浏览总量min:msg.LlMin,
                    浏览总量max:msg.LlMax,
                    浏览对象:msg.LlDx,
                    浏览方式:msg.LlFs,
                    随机滑屏次数min:msg.HpMin,
                    随机滑屏次数max:msg.HpMax,
                    浏览时长min:msg.LlScMin,
                    浏览时长max:msg.LlScMax,
                    是否视频点赞:dz,
                    视频点赞概率:msg['D_DZ'],
                    是否查看评论:PlGk,
                    查看评论概率:msg['D_Gk'],
                    是否评论点赞:PlDz,
                    评论点赞概率:msg['D_PlDz'],
                    是否评论:PlLy,
                    评论概率:msg['D_PlLy'],
                    评论内容:D_PlLy
            })
            break;
            case "知乎测试.js":
                function exec_zhcs(action, args){
                    args = args || {};
                     engineScript = engines.execScript(action.name, action.name + "(" + JSON.stringify(args) + ");\n" + action.toString());
                       
                   }
                   exec_zhcs(script.main, {
                    createTime:msg.createTime,
                    ID:msg.T_ID
            })
            break;
        }
        

}





/*******************************************************************功能模块********************************************************************************** */



/** 监控任务 */
function MonitoringTask(device,uuid){
    let ress;
    var MonitoringThread = threads.start(function(){
        //http://192.168.10.8:8080/api/task/search
        var res = http.postJson(url+"task/search", {
            "uuid": uuid,
            "device":device,
        });
        res.body.string();
        var html = res.body.string();
        var html = JSON.parse(html);
        code = html.code;
        if(code == 50001){
            ress ="已经有执行任务"
        }else{
            ress = html.data;
        }
        })
        MonitoringThread.join()
       
        return ress;
        
}

//比较时间
function compare(date1){
    let res = false;
    let oDate1 = new Date(date1.replace(/-/g,"/"));
    let oDate2 = new Date();
    if(oDate1.getTime() > oDate2.getTime()){
        res= true
    }
    return res;
}
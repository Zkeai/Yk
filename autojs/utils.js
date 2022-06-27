/*
 * @Author: L.柠
 * @Date: 2022-06-17 13:05:57
 */


var utils ={}

/** 下载文件到本地*/
utils.downloadFile=function(url,fileName){
    var url = url;
    
    var call = http
      .client()
      .newCall(
        http.buildRequest(url, {
          method: "GET",
        })
      )
      .execute();
    var fs = new java.io.FileOutputStream("/sdcard/脚本/"+fileName);
    var buffer = util.java.array("byte", 1024); //byte[]
    var byteSum = 0; //总共读取的文件大小
    var byteRead; //每次读取的byte数
    var is = call.body().byteStream();
    while ((byteRead = is.read(buffer)) != -1) {
      byteSum += byteRead;
      fs.write(buffer, 0, byteRead); //读取

    }

    return true;
}
/** 去除限制*/
utils.Remove=function(){
    importClass(com.stardust.autojs.core.accessibility.AccessibilityBridge.WindowFilter);
    let bridge = runtime.accessibilityBridge;
    let bridgeField = runtime.getClass().getDeclaredField("accessibilityBridge");
    let configField = bridgeField.getType().getDeclaredField("mConfig");
    configField.setAccessible(true);
    configField.set(bridge, configField.getType().newInstance());
    bridge.setWindowFilter(new JavaAdapter(AccessibilityBridge$WindowFilter, {
        filter: function(info) {
            return true;
        }
    }));
    print(app.versionName);
    let list = selector().find();
    for (var i = 0; i < list.size(); i++) {
        var object = list.get(i);
        object.text() 
    }

}
/** 曲线滑动
 * 
 * @param {*} qx 
 * @param {*} qy 
 * @param {*} zx 
 * @param {*} zy 
 * @param {*} time 
 */
  utils.sml_move=function (qx, qy, zx, zy, time) {
  var xxy = [time];
  var point = [];
  var dx0 = {
      "x": qx,
      "y": qy
  };
  var dx1 = {
      "x": random(qx - 100, qx + 100),
      "y": random(qy, qy + 50)
  };
  var dx2 = {
      "x": random(zx - 100, zx + 100),
      "y": random(zy, zy + 50),
  };
  var dx3 = {
      "x": zx,
      "y": zy
  };
  for (var i = 0; i < 4; i++) {
      eval("point.push(dx" + i + ")");
  };
  for (let i = 0; i < 1; i += 0.08) {
      let newPoint=bezier_curves(point, i);
      xxyy = [parseInt(newPoint.x), parseInt(newPoint.y)]
      xxy.push(xxyy);
  }
  gesture.apply(null, xxy);
};
/**贝塞尔曲线
 * 
 * @param {坐标点} ScreenPoint 
 * @param {偏移量} Offset 
 */
  function bezier_curves(ScreenPoint, Offset) {
  cx = 3.0 * (ScreenPoint[1].x - ScreenPoint[0].x);
  bx = 3.0 * (ScreenPoint[2].x - ScreenPoint[1].x) - cx;
  ax = ScreenPoint[3].x - ScreenPoint[0].x - cx - bx;
  cy = 3.0 * (ScreenPoint[1].y - ScreenPoint[0].y);
  by = 3.0 * (ScreenPoint[2].y - ScreenPoint[1].y) - cy;
  ay = ScreenPoint[3].y - ScreenPoint[0].y - cy - by;
  tSquared =Offset * Offset;
  tCubed = tSquared * Offset;
  result = {
      "x": 0,
      "y": 0
  };
  result.x = (ax * tCubed) + (bx * tSquared) + (cx * Offset) + ScreenPoint[0].x;
  result.y = (ay * tCubed) + (by * tSquared) + (cy * Offset) + ScreenPoint[0].y;
  return result;
};
/** 免root强制结束应用 */
utils.killapp = function (pkgName) {
    log('func killapp');
    for (let i = 1; i < 6; i++) {
        app['openAppSetting'](pkgName);
        var stop_obj = textMatches('/(.*停止.*|.*结束.*)/')["findOne"](5000);
        if (stop_obj != null) {
            var stop_obj2 = className("Button")["textMatches"]('/(.*停止.*|.*结束.*)/')['findOne'](1000);
            if (stop_obj2 != null) {
                if (stop_obj2["enabled"]() == true) {
                    if (stop_obj2["click"]() == true) {
                        var ok_ojb = className('Button')["text"]('确定')["findOne"](1000);
                        if (ok_ojb != null) {
                            ok_ojb['click']();
                            break;
                        }
                        var stop_contrl = className('Button')["textContains"]('停止')["findOne"](1000);
                        if (stop_contrl != null) {
                            stop_contrl["click"]();
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
        }

        sleep(1000)
    }

    log('finish-end');
    home()
    sleep(2000)
}
/** 脚本完成后修改设备 */
utils.editTask=function(createTime,device,status){
    let thread = threads.start(function(){
    //http://192.168.10.8:8080/api/task/editStatus
    var res = http.postJson("http://121.5.147.22/api/task/editStatus", {
        "createTime": createTime,
        "device":device,
        "status":status
    });
    res.body.string();
    var html = res.body.string();
        html = JSON.parse(html);
    code = html.code;
    })
        

    thread.join()
    
}
/** 停止所有autojs进程 */
utils.stop_autojs=function(){
    var nowPid = android.os.Process.myPid();
    var am = context.getSystemService(java.lang.Class.forName("android.app.ActivityManager"));
    var list = am.getRunningAppProcesses();
    for (var i = 0; i < list.size(); i++) {
    var info = list.get(i);
    if (info.pid != nowPid) {
        kill(info.pid);
    }
    }
    kill(nowPid);
    function kill(pid) {
    android.os.Process.killProcess(pid);
    }

}
/** 结束主程序之外的其他脚本 */
utils.结束其他脚本= function () {
    var 当前引擎 = engines.myEngine()
    var 所有引擎 = engines.all()    
    var 引擎数量 = 所有引擎.length    
    for (var i = 0; i < 引擎数量; i++) {        
       var 引擎 = 所有引擎[i]        
       if (引擎 != 当前引擎) {            
         引擎.forceStop()        
       }
    }
}


module.exports =utils
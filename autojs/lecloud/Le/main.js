/*
 * @Author: L.柠
 * @Date: 2022-11-13 12:22:22
 */
"ui";
var Url ="https://backend.shuotian.vip/api/"
var 主文件路径 = "/sdcard/Le/main/"
var h = device.height




ui.layout(
 <vertical>
    <text id="myText" gravity="center"  h={h*0.1}  bg="#ffffff" w="*"  line="1"/>
    <webview id="wv"  h={h*0.9} w="*"  />  
 </vertical>
    
)

ui.wv.loadUrl("file://" + files.path("res/bg.html"))


setTimeout(()=>{
  ui.myText.attr("color", "#aa4ff8");
  ui.myText.setText("检测更新...");
  
},100)

init()
function init(){
    files.createWithDirs(主文件路径) 
}


setTimeout(()=>{
  ui.myText.attr("color", "#1976d2");
  ui.myText.setText("初始化完成...");
},2000)

let res = http.get(Url+"hot/search")

jsonObj =JSON.parse(res.body.string())

url=jsonObj.data[0].url

threads.start(function(){
  downloadFile(url,"start.js",主文件路径)
})

setTimeout(()=>{
  ui.myText.attr("color", "#e06c75");
  ui.myText.setText("加载主文件...");
},5000)

setTimeout(()=>{
  engines.execScriptFile(主文件路径+"start.js");
  $ui.finish()
},8000)


/** 下载文件到本地*/
function downloadFile(url,fileName,path){
    var url = url;
    
    var call = http
      .client()
      .newCall(
        http.buildRequest(url, {
          method: "GET",
        })
      )
      .execute();
    var fs = new java.io.FileOutputStream(path+fileName);
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

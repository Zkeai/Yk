/*
 * @Author: L.柠
 * @Date: 2022-11-13 12:22:22
 */

var Url ="https://backend.shuotian.vip/api/"
var 主文件路径 = "/sdcard/Le/main/"

init()
function init(){
    files.createWithDirs(主文件路径) 
}




let res = http.get(Url+"hot/search")

jsonObj =JSON.parse(res.body.string())

url=jsonObj.data[0].url

downloadFile(url,"start.js",主文件路径)

engines.execScriptFile(主文件路径+"start.js");

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

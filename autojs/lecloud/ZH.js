/*
 * @Author: L.柠
 * @Date: 2022-06-27 13:23:55
 */
var utils = require('./utils.js')
var ZH ={}
ZH.跳转文章页 = function(ID){
    app.startActivity({
        action:"VIEW",
        data: "zhihu://articles/"+ID
    });

    descStartsWith("收藏，总收藏数").waitFor();
}

module.exports =ZH
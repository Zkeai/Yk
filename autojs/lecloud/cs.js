/*
 * @Author: L.柠
 * @Date: 2022-08-10 22:24:13
 */
function main(args){
    var IMEI = device.getIMEI()
    var utils = require('/sdcard/脚本/utils.js')
    utils.Remove();

    try {
        app.launchApp("知乎")
        text("推荐").waitFor()
        console.log("开始ZH文章评论任务")
        toastLog("开始ZH操作")
        var 文章ID = args.ID.split("\n")
        for(let i = 0 ; i < 文章ID.length;i++){
            toastLog(文章ID[i])
            //1.跳转文章页面
            app.startActivity({
                action:"VIEW",
                data: "zhihu://articles/"+文章ID[i]
            });
            
            //2.文章页评论
            var 评论内容数组 = args.commentArea.split("\n")
            var a= Math.round(Math.random()*(评论内容数组.length-1))
            var 评论内容=评论内容数组[a]
            console.log(评论内容)
            descStartsWith("为你朗读").waitFor();
            sleep(1000)
                var target = descStartsWith("评论").visibleToUser().findOne();
                target.click();
                sleep(1000)


            text("全部评论").visibleToUser().waitFor();
            var 评论ui = text("写评论").packageName("com.zhihu.android").visibleToUser().exists()
            if( 评论ui !== false){
                text("写评论").click()
                sleep(1000)
            }
            
            text("评论千万条，友善第一条").visibleToUser().waitFor()
            text("评论千万条，友善第一条").visibleToUser().findOne().click()
            sleep(1000)
            text("评论千万条，友善第一条").visibleToUser().setText(评论内容)
            sleep(1000)
            
            text("发布").findOne().click()
            sleep(1000)
            back()
            sleep(1000)
            back()
            sleep(1000)

        }
        
        utils.editTask(args.createTime,IMEI,2)
        console.log("ZH文章评论结束")
    } catch (error) {
        console.log(error)
        utils.editTask(args.createTime,IMEI,3)
        utils.killapp("com.zhihu.android")
        console.log("ZH文章评论异常")
    }

        

        
}

var thread = threads.start(function(){
    var res = http.postJson("https://api.x-metash.com/api/prod/NFTMall/h5/home/summary",
    {
        "isPresell":false,
        "isTimeAsc":false,
        "search":"hiphop",
        "pageNum":1,
        "pageSize":10,
        "reset":"yes"
    },
    {
        headers:{
            "Host": "api.x-metash.com",
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91aWQiOjg5NzExNywibG9naW5fdXNlcl9rZXkiOiIwYzVlZTZmNS1jYzU4LTQyNTMtOTdjMy1hMDA2YTNhZGFlMTIifQ.s94cm6u55YNRQA4Vw-zpV8mvNlvlAkUodSncVGPHNMXR50nTkIx9biYjV9rT86vQkWoPraTrsn204IJ7_V5Hbw",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            "Origin": "https://xmeta.x-metash.com",
            "Referer": "https://xmeta.x-metash.com/"
        }
    }
    );
    var html = res.body.string();
    var html = JSON.parse(html);
    data = html.data;

})
thread.join()

console.log(data)

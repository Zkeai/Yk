/*
 * @Author: L.柠
 * @Date: 2022-06-27 13:21:42
 */

var ZH文章评论 ={}

ZH文章评论.main = function main(args){
	console.log("开始运行 ZH文章评论")
    var IMEI = device.getIMEI()
    var utils = require('/sdcard/Le/main/utils.js')
    utils.Remove();

    try {
        app.launchApp("知乎")
        text("推荐").waitFor()
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
            sleep(2000)

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


module.exports = ZH文章评论
/*
 * @Author: L.柠
 * @Date: 2022-06-20 00:01:51
 */

var DY养号 = {}
DY养号.main = function main(args){
    var IMEI = device.getIMEI()
    var utils = require('utils.js')
    var DY = require('DY.js')
    utils.Remove();

    try {
        app.launchApp("抖音")
        text("推荐").descStartsWith("推荐").waitFor()

        var 浏览次数 =random(args.浏览总量min,args.浏览总量max)
        console.log("开始DY养号任务,浏览总数:"+浏览次数)
        toastLog("开始养号操作")
        for(let i = 0 ; i < 浏览次数;i++){
            //1.确定推荐还是关注 
                if(args.浏览对象 == "关注"){
                    desc("关注，按钮").packageName("com.ss.android.ugc.aweme").findOne().click()
                }
            //2.启用滑屏还是下拉
                if(args.浏览方式 == "随机滑屏"){
                    DY.DY滑动屏幕(args.随机滑屏次数min,args.随机滑屏次数max,args.浏览时长min,args.浏览时长max)
                }else{
                    DY.DY下拉强制刷新(args.浏览时长min,args.浏览时长max)
                }      
            //3.随机点赞
                DY.DY点赞(args.是否视频点赞,args.视频点赞概率)
            //4.评论观看 评论点赞 评论内容
                DY.观看评论(args.是否查看评论,args.查看评论概率,args.是否评论点赞,args.评论点赞概率,args.是否评论,args.评论概率,args.评论内容)
        }
        utils.editTask(args.createTime,IMEI,2)
        console.log("DY养号结束")
    } catch (error) {
        utils.editTask(args.createTime,IMEI,3)
        utils.killapp("com.ss.android.ugc.aweme")
        console.log("DY养号异常")
    }


        

        
}




module.exports = DY养号












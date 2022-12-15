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
                    DY滑动屏幕(args.随机滑屏次数min,args.随机滑屏次数max,args.浏览时长min,args.浏览时长max)
					
                }else{
                    DY下拉强制刷新(args.浏览时长min,args.浏览时长max)
                }      
            //3.随机点赞
                DY点赞(args.是否视频点赞,args.视频点赞概率)
            //4.评论观看 评论点赞 评论内容
                观看评论(args.是否查看评论,args.查看评论概率,args.是否评论点赞,args.评论点赞概率,args.是否评论,args.评论概率,args.评论内容)
        }
        utils.editTask(args.createTime,IMEI,2)
        console.log("DY养号结束")
    } catch (error) {
        utils.editTask(args.createTime,IMEI,3)
        utils.killapp("com.ss.android.ugc.aweme")
        console.log("DY养号异常")
    }

	function DY滑动屏幕(min,max,timeMin,timeMax){
    滑动次数 = random(min,max)
    for(let i = 0;i < 滑动次数;i++){
        num = Math.floor(Math.random()*5) + 1;  
        switch(num){
            case 1:
                h=0.7;
                w=0.1;
                break;
            case 2:
                h=0.6;
                w=0.1;
                break;
            case 3:
                h=0.7;
                w=0.2;
                break;
            case 4:
                h=0.8;
                w=0.2;
                break;
            case 5:
                h=0.8;
                w=0.1;
                break;
        }
        utils.sml_move(device.width / 2+random(-100,300), device.height*h, device.width / 2 + random(100,300),  device.height*0.15, random(300,600));
        let delayTime = random(timeMin*1000, timeMax*1000);
        sleep(delayTime);
    }




}
        
	function DY下拉强制刷新(timeMin,timeMax){
		num = Math.floor(Math.random()*5) + 1;  
    switch(num){
        case 1:
            h=0.7;
            w=0.1;
            break;
        case 2:
            h=0.6;
            w=0.1;
            break;
        case 3:
            h=0.7;
            w=0.2;
            break;
        case 4:
            h=0.8;
            w=0.2;
            break;
        case 5:
            h=0.8;
            w=0.1;
            break;
    }

utils.sml_move(device.width / 2 + random(100,300), device.height*0.15, device.width / 2+random(-100,300),device.height*h  , random(300,600));
let delayTime = random(timeMin*1000, timeMax*1000);
sleep(delayTime);



}
        
	function DY点赞(启用,概率){
    var num =  Math.floor(Math.random()*100) + 1;
    if(num < 概率 && 启用 === true){
       descStartsWith("未点赞").visibleToUser().findOne().click()
    }
} 

	function 观看评论(是否查看评论,评论概率,是否点赞,点赞概率,是否留言,留言概率,留言内容){
    var num =  Math.floor(Math.random()*100) + 1;
    if(num < 评论概率 && 是否查看评论 === true){
    //点击评论,进入评论页面
    var 点击评论 = descStartsWith("评论").packageName("com.ss.android.ugc.aweme").clickable(true).findOne();
    if(点击评论 !== null){
        var 点击评论是否成功 =点击评论.click()

        if( 点击评论是否成功&& 是否点赞){//判断是否需要点赞
            let DZ_num =  Math.floor(Math.random()*100) + 1;
            if(DZ_num < 点赞概率){
                descStartsWith("赞").descEndsWith("未选中").packageName("com.ss.android.ugc.aweme").visibleToUser().findOne().parent().click()
            }
    
            sleep(random(1000,3000))
        }
        sleep(random(500,800))
        if(点击评论是否成功 && 是否留言){//判断是否需要留言
            let Pl_num =  Math.floor(Math.random()*100) + 1;
            if(Pl_num < 留言概率){
                
                if( 留言内容 == ''){
                    留言内容 = "成精了\n抖音\n喜欢"
                }
                console.log(留言内容)
               var text1 = text("留下你的精彩评论吧").findOne(3000).click();
               sleep(random(500,800))
                if(text1){
                    setText(留言内容.split("\n")[random(0,留言内容.split("\n").length-1)])
                    sleep(random(500,800))
                    desc("发送").enabled(true).clickable(true).packageName("com.ss.android.ugc.aweme").findOne(6000).click()
                }
                
                

                

            }
            sleep(random(1000,3000))
        }






        id("back_btn").desc("关闭").packageName("com.ss.android.ugc.aweme").findOne().click()

    }






    }

} 
}




module.exports = DY养号












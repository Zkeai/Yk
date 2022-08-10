/*
 * @Author: L.柠
 * @Date: 2022-06-20 14:29:35
 */
var utils = require('./utils.js')
var DY ={}
DY.观看评论=function (是否查看评论,评论概率,是否点赞,点赞概率,是否留言,留言概率,留言内容){
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


DY.DY下拉强制刷新=function(timeMin,timeMax){
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

DY.DY滑动屏幕=function(min,max,timeMin,timeMax){
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

DY.DY点赞=function (启用,概率){
    var num =  Math.floor(Math.random()*100) + 1;
    if(num < 概率 && 启用 === true){
       descStartsWith("未点赞").visibleToUser().findOne().click()
    }
} 

module.exports =DY
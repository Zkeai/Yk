/*
 * @Author: L.柠
 * @Date: 2022-11-10 19:27:45
 */
var 小红书私信 ={}

小红书私信.main = function main(args){
	console.log("开始运行 小红书私信")
    var IMEI = device.getIMEI()
    var utils = require('/sdcard/Le/main/utils.js')
    utils.Remove();

    try {

        var 用户ID = args.ID.split("\n")
		var 最小随机 = args.YcMin
		var 最大随机 = args.YcMax
		
        for(let i = 0 ; i < 用户ID.length;i++){
            toastLog("当前用户ID："+用户ID[i])
            //1.跳转用户页面
            app.startActivity({
                action:"VIEW",
                data: "xhsdiscover://user/"+用户ID[i]
            });
            
            //2.用户私信
            var 私信内容数组 = args.commentArea.split("\n")
            var a= Math.round(Math.random()*(私信内容数组.length-1))
            var 私信内容=私信内容数组[a]

            desc("设置按钮").waitFor()
                
                desc("设置按钮").findOne().click()
                sleep(1000)
                textStartsWith("发消息").waitFor()
                textStartsWith("发消息").findOne().click()
                
                setText(私信内容)
                
                text("发送").waitFor()
                text("发送").findOne().click()
                sleep(1000)
                back()
                sleep(1000)
                back()
				sleep(1000)
				back()

            
			let 等待时间 = random(最小随机,最大随机)
            toastLog("等待时间:"+等待时间+"秒")
			sleep(等待时间*1000)

        }
        
        utils.editTask(args.createTime,IMEI,2)
        console.log("小红书私信结束")
            
    } catch (error) {
        console.log(error)
        utils.editTask(args.createTime,IMEI,3)
        utils.killapp("com.xingin.xhs")
        console.log("小红书私信异常")
    }
}

module.exports = 小红书私信
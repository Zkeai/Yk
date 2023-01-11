/*
 * @Author: L.柠
 * @Date: 2022-11-10 19:27:45
 */
var 小红书发布文章 ={}

小红书发布文章.main = function main(args){
	console.log("开始运行 小红书发布文章")
    var IMEI = device.getIMEI()
    var utils = require('/sdcard/Le/main/utils.js')
    utils.Remove();

    try {
		var num = 0
		var fileType =''
		const title = args.T_Title
		const content = args.commentArea
		const imgList = args.img_urls.split("\n")
		if(args.T_Label !== undefined){
			const labelList = args.T_Label.split("\n")
		}
		
		for(let i = 0; i < imgList.length; i++){
			fileType = getFileType(imgList[i])
			if(fileType === "jpg" ){
				downloadFile(imgList[i],"tupian"+String(i)+".jpg")
				media.scanFile("/sdcard/Le/main/"+"tupian"+String(i)+".jpg");
			}else if(fileType === "png"){
				downloadFile(imgList[i],"tupian"+String(i)+".png")
				media.scanFile("/sdcard/Le/main/"+"tupian"+String(i)+".png");
			}else{
				downloadFile(imgList[i],"video"+String(i)+".mp4")
				media.scanFile("/sdcard/Le/main/"+"video"+String(i)+".mp4");				
			}


		}

		app.startActivity({
			action:"VIEW",
			data: "xhsdiscover://post"
		}); 
		text("全部").waitFor()
		for(var i = 0; i < imgList.length; i++){
			num= i + 1
			var 选中图片 = packageName("com.xingin.xhs").depth(14).columnSpan(1).indexInParent(i).drawingOrder(num).visibleToUser().findOne()
			sleep(1000)
			click(选中图片.bounds().centerX(), 选中图片.bounds().centerY());
			sleep(1000)
			var 选择按钮 = text("选择").depth(9).packageName("com.xingin.xhs").find()
			if(!选择按钮.empty()){
				text("选择").packageName("com.xingin.xhs").findOne().parent().child(0).click()
			}else{
				depth(8).drawingOrder(2).packageName("com.xingin.xhs").visibleToUser(true).findOne().click()
			}
			sleep(1000)
		}
		textStartsWith("下一步").waitFor()
		textStartsWith("下一步").findOne().click()

		textStartsWith("选择音乐").waitFor()
		var 下一步按钮 = textStartsWith("下一步").find()
		if(!下一步按钮.empty()){
			var 是否发布视频 =depth(9).drawingOrder(4).packageName("com.xingin.xhs").indexInParent(2).visibleToUser(true).find()
			if(是否发布视频.empty()){
				text("下一步").visibleToUser(true).findOne().click()
			}else{
				depth(9).drawingOrder(4).packageName("com.xingin.xhs").indexInParent(2).visibleToUser(true).findOne().click()
			}
		}else{
			text("选择音乐").packageName("com.xingin.xhs").findOne().parent().parent().parent().parent().child(0).child(2).click()
		}
		sleep(1000)

		textStartsWith("填写标题会有更多赞哦").waitFor()
		sleep(1000)
		setText(0,title)
		sleep(1000)
		setText(1,content)
		sleep(1000)
		//标签
		if(args.T_Label !== undefined){
					for(let i = 0; i < labelList.length; i++){
					text("话题").visibleToUser(true).findOne().parent().click()
					sleep(1000)
					input(1,labelList[i])
				}
		}


		text("保存到相册").waitFor()
		text("保存到相册").findOne().parent().click()
		sleep(2000)

		text("发布笔记").findOne().click()
		sleep(1000)
		for(let i = 0; i < imgList.length; i++){
			files.remove("/sdcard/Le/main/"+"tupian"+String(i)+".jpg")
		}
		


        utils.editTask(args.createTime,IMEI,2)
        console.log("小红书发布文章结束")
            
    } catch (error) {
        utils.editTask(args.createTime,IMEI,3)
        utils.killapp("com.xingin.xhs")
        console.log("小红书发布文章异常")
    }
	

	
	/** 下载文件到本地*/
	function downloadFile(url,fileName){
		var url = url;
		
		var call = http
		  .client()
		  .newCall(
			http.buildRequest(url, {
			  method: "GET",
			})
		  )
		  .execute();
		var fs = new java.io.FileOutputStream("/sdcard/Le/main/"+fileName);
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
	
	
	
		/** 判断文件类型*/
	function getFileType(fileName) {
	  let suffix = ''; // 后缀获取
      let result = ''; // 获取类型结果
		if (fileName) {
		const flieArr = fileName.split('.'); // 根据.分割数组
		suffix = flieArr[flieArr.length - 1]; // 取最后一个
		if (!suffix) return false; // fileName无后缀返回false
		suffix = suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作
		return suffix
	  }
	}
}

module.exports = 小红书发布文章
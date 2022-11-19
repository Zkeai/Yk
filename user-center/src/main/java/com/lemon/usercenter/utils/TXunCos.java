package com.lemon.usercenter.utils;


import cn.hutool.core.date.DateTime;
import cn.hutool.core.util.StrUtil;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;

import com.qcloud.cos.model.ObjectListing;
import com.qcloud.cos.model.ObjectMetadata;
import com.qcloud.cos.model.PutObjectResult;
import com.qcloud.cos.region.Region;
import org.springframework.web.multipart.MultipartFile;



import java.io.InputStream;

import static com.lemon.usercenter.contant.UtilsConstant.*;

public class TXunCos {

    /**
     * 生成cos客户端
     * @return
     */
    private static COSClient initCOSClient(String TX_SECRET_ID, String TX_SECRET_KEY, String TX_REGION){
        COSCredentials cred = new BasicCOSCredentials(TX_SECRET_ID, TX_SECRET_KEY);

        Region region = new Region(TX_REGION);
        ClientConfig clientConfig = new ClientConfig(region);

        // 生成 cos 客户端。
        return new COSClient(cred, clientConfig);
    }


    /**
     * 上传文件
     */
    public static String UploadIMG(MultipartFile imgFile, String imgName,String path) {

        try {
            InputStream inputStream = imgFile.getInputStream();
            // 创建上传Object的Metadata
            ObjectMetadata objectMetadata = new ObjectMetadata();
            // - 使用输入流存储，需要设置请求长度
            objectMetadata.setContentLength(inputStream.available());
            // - 设置缓存
            objectMetadata.setCacheControl("no-cache");
            //生成一个随机的文件名
            String key = getFileKey(imgName,path);
            //上传到COS
            PutObjectResult putResult = initCOSClient(TX_SECRET_ID,TX_SECRET_KEY,TX_REGION).putObject(TX_BUKET_NAME, key,inputStream, objectMetadata);
            // 成功存储后，返回的地址
            return TX_URL+"/"+key;
        } catch (Exception e) {
            e.printStackTrace();
            // 发生IO异常、COS连接异常等，返回空
            return null;
        }
    }

    /**
     * 列出文件
     */
    public static ObjectListing FileList(String TX_SECRET_ID, String TX_SECRET_KEY, String TX_REGION,String buketName, String prefix){


       return initCOSClient(TX_SECRET_ID,TX_SECRET_KEY,TX_REGION).listObjects(buketName,prefix);

    }

    /**
     * 删除文件
     */
    public static boolean deleteFile(String TX_SECRET_ID, String TX_SECRET_KEY, String TX_REGION,String buketName, String key){

        initCOSClient(TX_SECRET_ID,TX_SECRET_KEY,TX_REGION).deleteObject(buketName,key);
        return true;
    }

    /**
     * 生成文件路径
     *
     * @return 文件路径
     */
    private static String getFileKey(String originalfileName, String path) {
        //对象储存对应的文件夹名
        String filePath = path+"/";
        //1.获取后缀名 2.去除文件后缀 替换所有特殊字符
        String fileType = originalfileName.substring(originalfileName.lastIndexOf("."));
        String fileStr = StrUtil.removeSuffix(originalfileName, fileType).replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5]", "_");
        filePath +=  new DateTime().toString("yyyyMMddHHmmss") + "_" + fileStr + fileType;
        return filePath;
    }



}

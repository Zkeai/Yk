package com.lemon.usercenter.model.domain.controller;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ResultUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


@RestController
@RequestMapping("/file")
public class FileController {
    @PostMapping("/upload")
    public BaseResponse<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        //获取原始名称
        String fileName=file.getOriginalFilename();
        //获取后缀名
        assert fileName != null;
        String suffixName=fileName.substring(fileName.lastIndexOf("."));
        //生成当前日期
        Date date = new Date();
        SimpleDateFormat dateFormat= new SimpleDateFormat("yyyyMMdd");
        String date_ = dateFormat.format(date);


        File CurrentFile = new File("");
        String CurrentDirectory = CurrentFile.getCanonicalPath();

        //文件保存路径
        String filePath=CurrentDirectory+"/file/"+date_+"/";
        //UUID.randomUUID()
        //文件重命名,防止重复
        fileName=filePath+ date_+"-"+fileName;
        //文件对象
        File dest=new File(fileName);
        //判断路径是否存在,如果不存在则创建
        if (!dest.getParentFile().exists()){
           Boolean a = dest.getParentFile().mkdirs();
        }

        try {
            //保存到服务器中
            file.transferTo(dest);
            return ResultUtils.success(fileName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }




}

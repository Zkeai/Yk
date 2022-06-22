package com.lemon.usercenter.service;
import java.util.Date;

import com.lemon.usercenter.model.domain.Software;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;




@SpringBootTest
class SoftwareServiceTest {
    @Resource
    private SoftwareService softwareService;


    @Test
    public void testCreateSoftware(){
        Software software = new Software();
        software.setName("抖音系列");
        software.setVersion("1.0");
        software.setMachine(0);
        software.setNotice("公告测试");

        boolean result = softwareService.save(software);
        System.out.println(software.getId());
        Assertions.assertTrue(result);


    }
}
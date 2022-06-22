package com.lemon.usercenter.service;
import java.util.Date;

import com.lemon.usercenter.model.domain.Type;
import com.lemon.usercenter.model.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class TypeServiceTest {

    @Resource
    private TypeService typeService;

    @Test
    public void testAdduser(){
        Type type =new Type();
        type.setType(30);
        type.setName("抖音");
        type.setUserid("jashfjfjknfsf");
        type.setCreateTime(new Date());
        type.setUpdateTime(new Date());





        boolean result = typeService.save(type);
        System.out.println(type.getId());
        Assertions.assertTrue(result);
    }
}

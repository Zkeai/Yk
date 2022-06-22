package com.lemon.usercenter.service;
import java.util.Date;

import com.lemon.usercenter.model.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * 用户服务测试
 *
 * @author lemon
 */

@SpringBootTest
class UserServiceTest {

    @Resource
    private UserService userService;


    @Test
    public void testAdduser(){
        User user =new User();
        user.setUsername("dogLemon");
        user.setUserAccount("123");
        user.setAvatarUrl("https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/352/favicon.png");
        user.setGender(0);
        user.setUserPassword("123456");
        user.setPhone("123");
        user.setEmail("456");

        boolean result = userService.save(user);
        System.out.println(user.getId());
        Assertions.assertTrue(result);
    }




}
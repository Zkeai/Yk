package com.lemon.usercenter.service.impl;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.UserService;
import com.lemon.usercenter.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.UUID;
import static com.lemon.usercenter.contant.UserConstant.*;

/**
 * 用户服务实现类
 *
 * @author saoren
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {
    @Resource
    private UserMapper userMapper;


    /**
     * 盐值,混淆密码
     */
    private static final String SALT = "lemon";

    /**
     * 用户注册
     * @param userAccount   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @param verify 验证码
     * @param email   邮箱
     * @param request session
     * @return id
     */
    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword,String verify, String email,HttpServletRequest request) {
        //1.校验
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户账号过短");

        }
        if (userPassword.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"用户密码过短");
        }

        //账户不能包含特殊字符
        String validPattern = "[ `~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*()——+|{}【】‘；：”“’。，、？\\\\\\\\]";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号有特殊字符");
        }
        //校验密码
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码不一致");
        }
        //校验图片验证码
       String lo_verify = (String) request.getSession().getAttribute(RANDOM_CODE_KEY);
        if(!Objects.equals(lo_verify, verify)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"验证码错误");
        }

        //账户不能重复
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        long count = userMapper.selectCount(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号已存在");
        }
        //邮箱不能重复
        QueryWrapper<User> queryWrapperEmail = new QueryWrapper<>();
        queryWrapperEmail.eq("email", email);
        long emailCount = userMapper.selectCount(queryWrapperEmail);
        if (emailCount > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"邮箱已存在");
        }

        int uuid = getUUID();
        //2.加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        //插入数据
        User user = new User();
        user.setUserAccount(userAccount);
        user.setUserPassword(encryptPassword);
        user.setEmail(email);
        user.setAvatarUrl(AVATAR_IMG);
        user.setUuid(uuid);
        boolean saveResult = this.save(user);
        if (!saveResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR);
        }

        return user.getId();
    }

    /**
     * 用户登录
     * @param userAccount 用户账户
     * @param userPassword 用户密码
     * @param request session
     * @return User
     */
    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        //1.校验账号密码
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号过短");

        }
        if (userPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码过短");
        }

        //账户不能包含特殊字符
        String validPattern = "[ `~!@#$%^&*()+=|{}':;',\\\\[\\\\].<>/?~！@#￥%……&*()——+|{}【】‘；：”“’。，、？\\\\\\\\]";
        Matcher matcher = Pattern.compile(validPattern).matcher(userAccount);
        if (matcher.find()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"存在特殊字符");
        }
        //2.加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

        //查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("userPassword", encryptPassword);
        User user = userMapper.selectOne(queryWrapper);
        //用户不存在
        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"账号或密码错误");
        }
        //3.用户脱敏
        User safetyUser = getSafetyUser(user);
        //4.记录用户的登录态
        request.getSession().setAttribute(USER_LOGIN_STATE, safetyUser);
        return safetyUser;
    }


    /**
     * 用户脱敏
     * @param originUser originUser
     * @return User
     */
    @Override
    public User getSafetyUser(User originUser){
        if(originUser == null){
            return null;
        }

        User safetyUser =new User();
        safetyUser.setId(originUser.getId());
        safetyUser.setUsername(originUser.getUsername());
        safetyUser.setUserAccount(originUser.getUserAccount());
        safetyUser.setAvatarUrl(originUser.getAvatarUrl());
        safetyUser.setGender(originUser.getGender());
        safetyUser.setPhone(originUser.getPhone());
        safetyUser.setEmail(originUser.getEmail());
        safetyUser.setUserStatus(originUser.getUserStatus());
        safetyUser.setUserRole(originUser.getUserRole());
        safetyUser.setCreateTime(originUser.getCreateTime());
        safetyUser.setUpdateTime(originUser.getUpdateTime());
        safetyUser.setUuid(originUser.getUuid());
        safetyUser.setSuperior(originUser.getSuperior());
        safetyUser.setValidTime(originUser.getValidTime());
        return safetyUser;
    }

    /**
     * 用户注销
     * @param request request
     */
    @Override
    public int userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 1 ;
    }


    /**
     * 管理员修改用户权限
     * @param userID userID
     * @param userStatus userStatus
     * @param userRole userRole
     * @param request request
     * @return 0/1
     */
    @Override
    public int userEdit(long userID, int userStatus, int userRole,String superior,String validTime, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user.getUserRole() != ADMIN_ROLE){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }


        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式

        Date date;
        try {
            date = df.parse(validTime);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        User newUser =new User();
        newUser.setUserRole(userRole);
        newUser.setUserStatus(userStatus);
        newUser.setId(userID);
        newUser.setValidTime(date);
        newUser.setSuperior(superior);
        return userMapper.updateById(newUser);
    }


    /**
     * 用户修改信息
     * @param id id
     * @param nickName nickName
     * @param email email
     * @param phone phone
     * @param image image
     * @param password password
     * @return int
     */
    @Override
    public int userInfoEdit(long id, String nickName, String email, String phone, String image, String password, String superior)  {

        //查询上级是否存在
        QueryWrapper<User> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("userAccount", superior);
        User user1 = userMapper.selectOne(queryWrapper1);
        if (user1 == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"不存在该上级");
        }


        //2.加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + password).getBytes());

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        queryWrapper.eq("userPassword", encryptPassword);
        User user = userMapper.selectOne(queryWrapper);
        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密码错误");
        }



        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间

        Date date;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }


        User newUser =new User();

        newUser.setId(id);
        newUser.setAvatarUrl(image);
        newUser.setEmail(email);
        newUser.setPhone(phone);
        newUser.setUsername(nickName);
        newUser.setUpdateTime(date);
        newUser.setSuperior(superior);
        return userMapper.updateById(newUser);
    }



    private int getUUID(){
        int hashCode;
        hashCode = UUID.randomUUID().toString().hashCode();
        if (hashCode  < 0){
            hashCode  =-hashCode ;
        }

        return Integer.parseInt(String.format("%010d", hashCode).substring(0,10));

    }
}





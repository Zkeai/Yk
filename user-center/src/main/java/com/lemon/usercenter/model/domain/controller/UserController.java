package com.lemon.usercenter.model.domain.controller;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.DevicesMapper;
import com.lemon.usercenter.mapper.UserMapper;
import com.lemon.usercenter.model.domain.Devices;

import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.request.*;
import com.lemon.usercenter.service.UserService;
import com.lemon.usercenter.utils.Encrypt;
import com.lemon.usercenter.utils.RandomValidateCodeUtil;
import com.lemon.usercenter.utils.TXunCos;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.lemon.usercenter.contant.UserConstant.*;


/**
 * 用户接口
 * @author lemon
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;
    @Resource
    private UserMapper userMapper;

    @Resource
    private DevicesMapper devicesMapper;

    /**
     * 注册
     * @param userRegisterRequest userRegisterRequest
     * @param request request
     * @return id
     * @throws Exception xception
     */
    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest,HttpServletRequest request) throws Exception {
        if(userRegisterRequest == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        String verify =userRegisterRequest.getVerify();
        String email =userRegisterRequest.getEmail();

        if(StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"参数为空");
        }

        long result = userService.userRegister(userAccount, userPassword, checkPassword,verify,email,request);
        return ResultUtils.success(result);
    }

    /**
     * 登录
     * @param userLoginRequest userLoginRequest
     * @param request request
     * @return User
     * @throws Exception Exception
     */
    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) throws Exception {
        if(userLoginRequest == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if(StringUtils.isAnyBlank(userAccount, userPassword)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user =userService.userLogin(userAccount, userPassword,request);
        return ResultUtils.success(user);
    }

    /**
     * 退出登录
     * @param request request
     * @return int
     */
    @PostMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request)  {
        if(request == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        int result = userService.userLogout(request);
        return ResultUtils.success(result);
    }

    /**
     * 获取单个用户
     * @param request request
     * @return User
     * @throws Exception Exception
     */
    @GetMapping("/current")
    public BaseResponse<String> getCurrentUser(HttpServletRequest request) throws Exception {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser =(User) userObj;
        if(currentUser == null){
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        long userId =currentUser.getId();
        //校验用户是否合法todo
        User user = userService.getById(userId);
        User safetyUser = userService.getSafetyUser(user);


        JSONObject SafetyUsers = new JSONObject();
        SafetyUsers.put("id",safetyUser.getId());
        SafetyUsers.put("username",safetyUser.getUsername());
        SafetyUsers.put("userAccount",safetyUser.getUserAccount());
        SafetyUsers.put("uuid",safetyUser.getUuid());
        SafetyUsers.put("avatarUrl",safetyUser.getAvatarUrl());
        SafetyUsers.put("phone",safetyUser.getPhone());
        SafetyUsers.put("email",safetyUser.getEmail());
        SafetyUsers.put("userStatus",safetyUser.getUserStatus());
        SafetyUsers.put("userRole",safetyUser.getUserRole());
        SafetyUsers.put("superior",safetyUser.getSuperior());
        SafetyUsers.put("validTime",safetyUser.getValidTime());
        SafetyUsers.put("createTime",safetyUser.getCreateTime());
        SafetyUsers.put("updateTime",safetyUser.getUpdateTime());
        String res =Encrypt.AESencrypt(SafetyUsers.toString());
        return ResultUtils.success(res);
    }

    /**
     * 查询用户
     * @param username username
     * @param request request
     * @return User
     */
    @GetMapping("/search")
    public BaseResponse<String> searchUsers(String username,HttpServletRequest request) throws Exception {
        JSONArray newArray = new JSONArray();
        if(!isAdmin(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        QueryWrapper<User>queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNotBlank(username)){
            queryWrapper.like("username",username);
        }
       List<User> userList = userService.list(queryWrapper);
        List<User> result = userList.stream().map(user -> userService.getSafetyUser(user)).collect(Collectors.toList());

        for (User user : result) {
            JSONObject newObject = new JSONObject();
            newObject.put("id", user.getId());
            newObject.put("username", user.getUsername());
            newObject.put("userAccount", user.getUserAccount());
            newObject.put("avatarUrl", user.getAvatarUrl());
            newObject.put("gender", user.getGender());
            newObject.put("phone", user.getPhone());
            newObject.put("email", user.getEmail());
            newObject.put("userStatus", user.getUserStatus());
            newObject.put("userRole", user.getUserRole());
            newObject.put("createTime", user.getCreateTime());
            newObject.put("validTime", user.getValidTime());
            newObject.put("superior", user.getSuperior());
            newArray.add(newObject);
        }
        String s = StringUtils.join(newArray,';');
        String res = Encrypt.AESencrypt(s);

        return ResultUtils.success(res);
    }

    /**
     * 安卓端获取是否会员
     * @param userSearchUUIDRequest userSearchUUIDRequest
     * @return  0： ok  1：uuid不存在  2：编号已存在  3：不是会员 4：会员过期
     */
    @PostMapping("/searchUUID")
    public BaseResponse<Integer> searchUUID(@RequestBody UserSearchUUIDRequest userSearchUUIDRequest){
        int res = 0;
        Date validTimeStr = null;

        int uuid = userSearchUUIDRequest.getUuid();
        String remark = userSearchUUIDRequest.getRemark();
        String IMEI = userSearchUUIDRequest.getModel();
        //查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uuid", uuid);
        User user = userMapper.selectOne(queryWrapper);
        if(user == null){
            res = 1;
        }else{
            validTimeStr = user.getValidTime();
        }

        //查询编号是否已经存在
        QueryWrapper<Devices> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("uuid", uuid).eq("remark",remark);
        Devices device = devicesMapper.selectOne(queryWrapper1);
        if(device != null && (!Objects.equals(device.getDeviceModel(), IMEI))){
            res = 2;
        }



        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间

        if(validTimeStr == null){
            res =3;
        }

        Date date = null;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        if (date.after(validTimeStr)) {
            res =4 ;
        }

        return ResultUtils.success(res);
    }

    /**
     * uuid获取userid
     * @param userSearchUseridRequest uuid
     * @return userid
     */
    @PostMapping("/getUserid")
    public BaseResponse<String> getUserid(@RequestBody UserSearchUseridRequest userSearchUseridRequest){

        int uuid = userSearchUseridRequest.getUuid();

        //查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uuid", uuid);
        User user = userMapper.selectOne(queryWrapper);
        String userid = user.getUserAccount();

        return ResultUtils.success(userid);
    }

    /**
     * 删除用户
     * @param userDeleteRequest userDeleteRequest
     * @param request request
     * @return boolean
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteUsers(@RequestBody UserDeleteRequest userDeleteRequest, HttpServletRequest request) {

        if(!isAdmin(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        long id =userDeleteRequest.getUserID();

        if(id <= 0){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = userService.removeById(id);
        return ResultUtils.success(result);

    }

    /**
     * 管理员修改状态
     * @param UserEditRequest UserEditRequest
     * @param request request
     * @return 0-1
     */
    @PostMapping("/edit")
    public BaseResponse<Integer> userEdit(@RequestBody UserEditRequest UserEditRequest, HttpServletRequest request){
        if(request == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        long userID= UserEditRequest.getUserID();
        int userStatus = UserEditRequest.getUserStatus();
        int userRole = UserEditRequest.getUserRole();
        String superior = UserEditRequest.getSuperior();
        String validTime =UserEditRequest.getValidTime();
        if(userRole < 0 || userStatus < 0 ){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        int result =userService.userEdit(userID,userStatus,userRole,superior,validTime,request);

        return ResultUtils.success(result);
    }

    /**
     * 用户修改信息
     * @param UserInfoEditRequest UserInfoEditRequest
     * @param request  request
     * @return 0-1
     */
    @PostMapping("/changeInfo")
    public BaseResponse<Integer> changeInfo(@RequestBody UserInfoEditRequest UserInfoEditRequest, HttpServletRequest request){
        if(request == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        long id= UserInfoEditRequest.getId();
        String email =UserInfoEditRequest.getEmail();
        String nickName=UserInfoEditRequest.getNickName();
        String phone = UserInfoEditRequest.getPhone();
        String password =UserInfoEditRequest.getPassword();
        String image =UserInfoEditRequest.getImage();
        String superior =UserInfoEditRequest.getSuperior();
        int result =userService.userInfoEdit(id,nickName,email,phone,image,password,superior);

        return ResultUtils.success(result);
    }

    /**
     * 获取验证码
     * @param request request
     * @param response response
     */
    @GetMapping( "/getVerify")
    public void getVerify(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
            response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            RandomValidateCodeUtil randomValidateCode = new RandomValidateCodeUtil();
            randomValidateCode.getRandcode(request, response);//输出验证码图片方法
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"验证码获取失败");
        }
    }



    /**
     * 是否为管理员
     * @param request request
     * @return true/false
     */
    private boolean isAdmin(HttpServletRequest request){
        //仅管理员可查询
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        return user != null && user.getUserRole() == ADMIN_ROLE;
    }


    /**
     * 头像上传
     * @param IMG_Raw IMG_Raw
     * @param IMG_Name IMG_Name
     * @return String
     */
    @PostMapping("/txCos")
    public BaseResponse<String>  test(@RequestParam(value = "Raw") MultipartFile IMG_Raw,
                                      @RequestParam(value = "Name") String IMG_Name,
                                      @RequestParam(value = "path") String path){
        return ResultUtils.success(TXunCos.UploadIMG(IMG_Raw,IMG_Name,path));

    }


}

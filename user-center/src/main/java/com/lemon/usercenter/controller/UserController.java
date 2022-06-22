package com.lemon.usercenter.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.lemon.usercenter.common.BaseResponse;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.common.ResultUtils;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.UserMapper;
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

    @PostMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request)  {
        if(request == null) {
            throw new BusinessException(ErrorCode.NULL_Error);
        }

        int result = userService.userLogout(request);
        return ResultUtils.success(result);
    }

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
        SafetyUsers.put("createTime",safetyUser.getCreateTime());
        SafetyUsers.put("updateTime",safetyUser.getUpdateTime());
        String res =Encrypt.AESencrypt(SafetyUsers.toString());
        return ResultUtils.success(res);
    }

    @GetMapping("/search")
    public BaseResponse<List<User>> searchUsers(String username,HttpServletRequest request) {
        if(!isAdmin(request)){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        QueryWrapper<User>queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNotBlank(username)){
            queryWrapper.like("username",username);
        }
       List<User> userList = userService.list(queryWrapper);
        List<User> result = userList.stream().map(user -> userService.getSafetyUser(user)).collect(Collectors.toList());
        return ResultUtils.success(result);
    }

    @PostMapping("/searchUUID")
    public BaseResponse<Integer> searchUUID(@RequestBody UserSearchUUIDRequest userSearchUUIDRequest){
        int res = 1;
        Date validTimeStr = null;

        int uuid =userSearchUUIDRequest.getUuid();
        //查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uuid", uuid);
        User user = userMapper.selectOne(queryWrapper);

        if(user != null){
            validTimeStr = user.getValidTime();
            res = 0;
        }else{
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"UUID不存在");
        }


        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String Time=df.format(new Date());// new Date()为获取当前系统时间

        if(validTimeStr == null){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"无效用户");
        }

        Date date = null;
        try {
            date = df.parse(Time);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        if (date.after(validTimeStr)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"会员已过期");
        }


        return ResultUtils.success(res);
    }


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
        int userRole= UserEditRequest.getUserRole();
        if(userRole < 0 || userStatus < 0 ){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        int result =userService.userEdit(userID,userStatus,userRole,request);

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

        int result =userService.userInfoEdit(id,nickName,email,phone,image,password);

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

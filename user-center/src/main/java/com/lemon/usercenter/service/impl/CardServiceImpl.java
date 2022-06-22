package com.lemon.usercenter.service.impl;
import java.util.Date;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.SoftwareMapper;
import com.lemon.usercenter.model.domain.Card;
import com.lemon.usercenter.model.domain.Software;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.service.CardService;
import com.lemon.usercenter.mapper.CardMapper;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

import static com.lemon.usercenter.contant.UserConstant.*;

/**
* @author saoren
* @description 针对表【card】的数据库操作Service实现
* @createDate 2022-06-03 18:22:38
*/
@Service
public class CardServiceImpl extends ServiceImpl<CardMapper, Card>
    implements CardService{

    @Resource
    private CardMapper cardMapper;

    @Resource
    private SoftwareMapper softwareMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int createKami(String software, String type, int num, String prefix, HttpServletRequest request) {

        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if(user.getUserRole() != ADMIN_ROLE && user.getUserRole() != AGENCY_ROLE){
            throw new BusinessException(ErrorCode.NO_AUTH);
        }
        String userid =user.getUserAccount();

        //1.校验请求参数是否合法
        if(StringUtils.isAnyBlank(software,type)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if( num < 1 || num > 2000 ){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"生成数量范围1-2000");
        }


        //2.判断userid和software name是否存在
        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid", userid).eq("secret", software).eq("status",0);
        Software newSoftware = softwareMapper.selectOne(queryWrapper);
        if (newSoftware == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"应用不存在或禁用");
        }


        //3.卡密批量生成
        Set<String> generatedKamiSet = new HashSet<>();
        final List<String> kamiList = new ArrayList<>();
        while (kamiList.size() < num){
            String kami = generatedKami(prefix);
            if(generatedKamiSet.contains(kami)){
                continue;
            }
            generatedKamiSet.add(kami);
            kamiList.add(kami);
        }


        for (int i = 0; i < num; i++) {
            Card card =new Card();


            card.setUserid(userid);
            card.setSoftware(software);
            card.setKami(kamiList.get(i));
            card.setType(type);

            try{
                int tempRows = cardMapper.insert(card);
                if(tempRows <= 0){
                    throw new BusinessException(ErrorCode.SYSTEM_ERROR,"卡密插入异常");
                }
            }catch (Exception err){
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"生成了重复的卡密");
            }



        }

        return 1;
    }

    @Override
    public String useKami(String kami, String userid, String software, String machine, String ip) {
        String res = "";
        Date newTime = null;
        //1.判断参数
        if(StringUtils.isAnyBlank(kami,userid,software,machine,ip)){
            throw new BusinessException(ErrorCode.NULL_Error);
        }
        //2.判断用户ID和软件密钥是否存在  是否启用
        QueryWrapper<Software> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid", userid).eq("secret", software);
        Software newSoftware = softwareMapper.selectOne(queryWrapper);
        if (newSoftware == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"密钥不存在");
        }

        int newSoftwareStatus =newSoftware.getStatus();
        if(newSoftwareStatus == 1){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"软件未启用");
        }

        //3.判断卡密是否存在
        QueryWrapper<Card> queryWrapperCard = new QueryWrapper<>();
        queryWrapperCard.eq("userid", userid).eq("software", software).eq("kami",kami);
        Card newCardKami = cardMapper.selectOne(queryWrapperCard);
        if (newCardKami == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"卡密不存在");
        }


        //4.判断是不是启用机器码  启用了 验证是不是同一个机器
        int softwareMachine = newSoftware.getMachine();

        if(softwareMachine == 0){
            String machineStr = newCardKami.getMachine();
            if(machineStr != null && !machineStr.equals(machine)){
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"设备码不一致");
            }
        }



        //5.判断卡密是否过期
        Date validTimeStr =newCardKami.getValidTime();

        if(validTimeStr != null){
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            String Time=df.format(new Date());// new Date()为获取当前系统时间

            Date date = null;
            try {
                date = df.parse(Time);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
            if (date.after(validTimeStr)) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR,"卡密过期");
            }

            res = DateToString(validTimeStr);
        }else{
            //需要插入当前时间+type天
            LocalDateTime time = generateValidTime(newCardKami);
            newTime = Date.from(time.atZone( ZoneId.systemDefault()).toInstant());
            res = DateToString(newTime);
        }

        int oldId = newCardKami.getId();
        Card newCardList= new Card();
        newCardList.setMachine(machine);
        newCardList.setValidTime(newTime);
        newCardList.setIp(ip);
        newCardList.setId(oldId);
        int tempRows = cardMapper.updateById(newCardList);
        if(tempRows <= 0){
            throw new BusinessException(ErrorCode.SYSTEM_ERROR,"卡密异常");
        }

        return res;
    }


    /**
     //     * 创建卡密
     //     * @param prefix 前缀
     //     * @return kami
     //     */
    private String generatedKami(String prefix){
        return  String.format("%s%s",prefix,RandomStringUtils.randomAlphabetic(36));
    }

    /**
     * 生成过期时间
     * @param newCardKami 卡密对象
     * @return LocalDateTime
     */
    private LocalDateTime generateValidTime(Card newCardKami){
        String type = newCardKami.getType();
        int intType=Integer.parseInt(type);
        LocalDateTime now = LocalDateTime.now().plusDays(intType);


        return now;
    }

    /**
     * DateToString
     * @param date date
     * @return string date
     */
    private String DateToString( Date date){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        return  df.format(date);// new Date()为获取当前系统时间

    }
}





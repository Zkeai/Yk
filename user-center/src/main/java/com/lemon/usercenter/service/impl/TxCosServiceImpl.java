package com.lemon.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lemon.usercenter.common.ErrorCode;
import com.lemon.usercenter.exception.BusinessException;
import com.lemon.usercenter.mapper.WebMapper;
import com.lemon.usercenter.model.domain.TxCos;
import com.lemon.usercenter.model.domain.User;
import com.lemon.usercenter.model.domain.Web;
import com.lemon.usercenter.service.TxCosService;
import com.lemon.usercenter.mapper.TxCosMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.lemon.usercenter.contant.UserConstant.USER_LOGIN_STATE;

/**
* @author saoren
* @description 针对表【tx_cos(腾讯云cos)】的数据库操作Service实现
* @createDate 2022-11-18 17:04:38
*/
@Service
public class TxCosServiceImpl extends ServiceImpl<TxCosMapper, TxCos>
    implements TxCosService{


    @Resource
    private TxCosMapper txCosMapper;

    @Override
    public int cosEdit(Long id,String TX_SECRET_ID, String TX_SECRET_KEY, String TX_REGION, String TX_URL, String TX_BUKET_NAME, HttpServletRequest request) {
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user =(User) userObj;
        if (user == null) {
            throw new BusinessException(ErrorCode.NO_LOGIN);
        }
        String userid = user.getUserAccount();
        //检测是否是第一次
        QueryWrapper<TxCos> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("userid", userid);

        long count1 = txCosMapper.selectCount(queryWrapper1);
        TxCos txCos = new TxCos();
        if (count1 == 1) {

            //不是第一次,更新
            txCos.setId(id);
            txCos.setUserid(userid);
            txCos.setTx_buket_name(TX_BUKET_NAME);
            txCos.setTx_region(TX_REGION);
            txCos.setTx_secret_id(TX_SECRET_ID);
            txCos.setTx_secret_key(TX_SECRET_KEY);
            txCos.setTx_url(TX_URL);
            int row = txCosMapper.updateById(txCos);
            if(row <= 0){
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"腾讯云COS配置更新失败");
            }

        }else{
            //第一次,增加
            txCos.setUserid(userid);
            txCos.setTx_buket_name(TX_BUKET_NAME);
            txCos.setTx_region(TX_REGION);
            txCos.setTx_secret_id(TX_SECRET_ID);
            txCos.setTx_secret_key(TX_SECRET_KEY);
            txCos.setTx_url(TX_URL);
            int row = txCosMapper.insert(txCos);
            if(row <= 0){
                throw new BusinessException(ErrorCode.SYSTEM_ERROR,"腾讯云COS配置增加失败");
            }
        }


        return 0;
    }
}





import "@/pages/user/UserCenter/components/UserInfo/index.less"
import { Avatar,Tag, Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useModel } from 'umi';
import CardInfo from '../CardInfo/index'
import message from "antd/es/message";



const UserInfo = () => {
  const { initialState } = useModel('@@initialState');
  // @ts-ignore
  const {setKey} =useModel("useCenterModel",model => ({setKey: model.changeTab}))
  const onclick_ = ()=>{
    setKey('2')
  }

  const createTime = initialState?.currentUser?.createTime.toString().replace(/T/g,' ').replace(/\.\d{3}\+\d{2}:\d{2}/g,'');
  const updateTime = initialState?.currentUser?.updateTime.toString().replace(/T/g,' ').replace(/\.\d{3}\+\d{2}:\d{2}/g,'');
  return (
    <div id="userCenter">

      <Avatar className="avatar"
              size={{ xs: 22, sm: 30, md: 38, lg: 62, xl: 78, xxl: 98 }}
              src={initialState?.currentUser?.avatarUrl !== '' ? initialState?.currentUser?.avatarUrl : 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/352/avatar.png'}

      />
      <div className='tag-info'>
        <div className='name'>{initialState?.currentUser?.username !== '' ? initialState?.currentUser?.username : initialState?.currentUser?.userAccount}</div>

      </div>


      <div className='other'>
        <Tag className="tag-id"  color="#1890ff">
          {"用户ID："+initialState?.currentUser?.id}
        </Tag>
        <Tag className="tag-uuid"  color="#1890ff">
          {"UUID："+initialState?.currentUser?.uuid}
        </Tag>
        <Tag className="tag-role" icon={<UserOutlined />} color="#d94a38">
          {initialState?.currentUser?.userRole === 1 ? '管理员' : '普通用户'}
        </Tag>
        <Tag className="tag-status" icon={<UserOutlined />} color="#00897b">
          {initialState?.currentUser?.userStatus === 0 ? '状态正常' : '冻结状态'}

        </Tag>

      </div>


      <div className='card' >
      <Card

        actions={[
          <SettingOutlined key="setting" onClick={()=>{message.warn("暂未开发")}} />,
          <EditOutlined key="edit" onClick={onclick_}/>,
          <EllipsisOutlined key="ellipsis" onClick={()=>{message.warn("暂未开发")}}/>,
        ]}
      >
        <CardInfo style={{color:'#ac8419'}} tip='邮箱' avatar='https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/blog/邮箱.png' value={initialState?.currentUser?.email}></CardInfo>
        <CardInfo style={{color:'skyblue'}} tip='手机' avatar='https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/blog/手机.png' value={initialState?.currentUser?.phone !==""? initialState?.currentUser?.phone:"手机号暂未设置"}></CardInfo>
        <CardInfo style={{color:'#aab0bf'}} tip='创建时间' avatar='https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/blog/创建时间.png' value={createTime}></CardInfo>
        <CardInfo style={{color:'#b0b7c8'}} tip='更新时间' avatar='https://lemon-1251938302.cos.ap-shanghai.myqcloud.com/blog/更新时间.png' value={updateTime}></CardInfo>
      </Card>

      </div>


    </div>

  );
};

export default UserInfo;

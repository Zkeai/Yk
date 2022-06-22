import { Tabs } from 'antd';
import UserInfo from '@/pages/user/UserCenter/components/UserInfo/index'
import ChangeInfo  from "@/pages/user/UserCenter/components/ChangeInfo";
import Invest  from "@/pages/user/UserCenter/components/Invest";
const { TabPane } = Tabs;


// @ts-ignore
import { useModel } from 'umi';


const App = () => {

  const {key,setKey} =useModel("useCenterModel",(model: { key: any; changeTab: any; }) => ({ key: model.key,setKey:model.changeTab}))
  const onChange = (keys: string) => {
    setKey(keys)
  };
  return(
  <Tabs activeKey={key} onChange={onChange}>
    <TabPane tab="用户信息" key='1'>
      <UserInfo />
    </TabPane>
    <TabPane tab="修改信息" key="2">
      <ChangeInfo/>
    </TabPane>
    <TabPane tab="充值中心" key="3">
      <Invest />
    </TabPane>
  </Tabs>)

};

export default App;

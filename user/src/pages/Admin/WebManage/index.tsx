import { Tabs } from 'antd';
import Email from './Email'
import Web from './Web'
import Message from './Message'
const { TabPane } = Tabs;
import { useAccess } from 'umi';
function Index(){
  const access = useAccess();

const isDisplay = access.canAdmin? "inline":"none"
  return(
    <Tabs type={"card"}  defaultActiveKey={isDisplay === "none"?"2":"1"}>
      <TabPane  tab="网站设置" key="1"  disabled={isDisplay === "none"}>
        <Web/>
      </TabPane>


      <TabPane tab="邮箱设置" key="2">
        <Email />
      </TabPane>
      <TabPane tab="短信设置" key="3">
        <Message/>
      </TabPane>
    </Tabs>
  )
}


export default Index;

import { Tabs } from 'antd';
import Email from './Email'
import Web from './Web'
import Message from './Message'
const { TabPane } = Tabs;


const App = () => (


  <Tabs type={"card"}  defaultActiveKey="1">
    <TabPane  tab="基本设置" key="1">
      <Web/>
    </TabPane>
    <TabPane tab="邮箱设置" key="2">
      <Email />
    </TabPane>
    <TabPane tab="短信设置" key="3">
      <Message/>
    </TabPane>
  </Tabs>

);

export default App;

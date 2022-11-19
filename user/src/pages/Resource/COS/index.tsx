import { Tabs } from 'antd';
import COS from '@/pages/Resource/COS/TX/txOss'
import OSS  from "@/pages/Resource/COS/ALI/aliOss";
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
      <TabPane tab="腾讯云COS" key='1'>
        <COS />
      </TabPane>
      <TabPane tab="阿里云OSS" key="2">
        <OSS/>
      </TabPane>
    </Tabs>)

};

export default App;

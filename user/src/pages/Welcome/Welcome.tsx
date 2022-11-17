import {Button, Carousel, Modal} from 'antd';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import "./Welcome.less"
import Abstract from "@/pages/Welcome/components/Abstract";
import Interface from "@/pages/Welcome/components/Interface";
import { useState} from "react";
const contentStyle: any = {
  height: '89.4vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const handleOk = () => {
    setIsModalVisible(false);
  };



  return (
    <div style={{margin: 0 -24 }}>
      <Carousel autoplay dots={false}  arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
        <div>
          <h3 style={contentStyle}>
            <Abstract/>
          </h3>
        </div>

        <div>
          <h3 style={contentStyle}>
            <Interface/>
          </h3>
        </div>


      </Carousel>


      <Modal
        width="300px"
        style={{marginTop:"36vh",marginRight:"36%",height:"200px"}}
        title="leCloud云控声明"
        visible={isModalVisible}
        onOk={handleOk}
        closable={false}
        footer={[
          <Button size="small" key="ok" type="primary" onClick={handleOk}>
            同意
          </Button>,

        ]}
      >
        <p>使用本系统则表示您已同意<a href="" target="_blank">《用户协议》</a></p>
      </Modal>
    </div>
  );
};

export default App;

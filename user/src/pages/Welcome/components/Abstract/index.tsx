
import "./index.less"
import {CloudDownloadOutlined} from "@ant-design/icons";
function Index() {
  return (
    <div className="main">
      <div className="title-icon">
        <CloudDownloadOutlined className="iconfont" />
          <h3 className="desc" >集成式云控系统</h3>
          <span className="desc-text">leCloud前端采用react框架,后端采用springBoot框架,具有很高的稳定性。集成用户中心、卡密系统和管理系统,提供优质的服务。</span>
        <div className="site-download">
          <a href="" target="_blank">安卓客户端</a>
        </div>

      </div>

    </div>
  );
}

export default Index;

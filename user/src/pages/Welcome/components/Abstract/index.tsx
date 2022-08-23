
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
          <a href="https://i11.lanzoug.com/081411bb/2022/08/14/f7aa2b03261aa48c31f21913120e4524.apk?st=eaDV6MwdKxjVT9REJxBoGQ&e=1660448781&b=BTtaP1AzVz4AOlV2BDAEXwYlXDFRfgYwBnsLNlR9Xj0EJgtg&fi=78196061&pid=39-172-24-241&up=2&mp=0&co=1">安卓客户端</a>
        </div>

      </div>

    </div>
  );
}

export default Index;

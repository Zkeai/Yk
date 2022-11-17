
import "./index.less"
import {ApiOutlined} from "@ant-design/icons";
import {useModel} from "@@/plugin-model/useModel";
function Index() {
  const { initialState } = useModel('@@initialState');
  return (
    <div className="main-I">
      <div className="title-icon-I">
        <ApiOutlined  className="iconfont-I" />
          <h3 className="desc-I" >用户客户端API接口</h3>
          <span className="desc-text-I">leCloud提供了一系列外部接口,有能力的客户可以根据api接口自定义功能。</span>
        <div className="site-download-I">
          <a href={initialState?.webConfig?.api_url} target="_blank" rel="noreferrer">API接口文档</a>
        </div>

      </div>

    </div>
  );
}

export default Index;

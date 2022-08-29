import { Avatar, Divider, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {searchHistory} from "@/services/ant-design-pro/api";
import {decrypt} from "@/utils/aes";
import {useModel} from "@@/plugin-model/useModel";

interface DataType {
  userid: string,
  ip: string,
  address: string,
  loginTime: Date
}

const App = () => {
  const { initialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [hisData, setHisData] = useState<DataType[]>([]);

  const loadMoreData = async () => {

    if (loading) {
      setLoading(false);
    }
    const tempList: any= []
    const {data} = await searchHistory();
    const res =decrypt(data).split(";")
    if(res[0] !== ""){
      for(let i = 0;i < res.length;i++){
        const m = JSON.parse(res[i])
        tempList.push({
          userid: m.userid,
          ip: m.ip,
          address: m.address,
          loginTime:m.loginTime
        })
      }
      setHisData(tempList)
      setLoading(false);
    }else{
      tempList.push({
        userid: "",
        ip: "",
        address: "",
        loginTime:""
      })
      setHisData(tempList)
      setLoading(false);
    }


  };

  useEffect(() => {
    loadMoreData().then(() => {});
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: '90vh',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={hisData.length}
        next={loadMoreData}
        hasMore={hisData.length < 11}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={hisData}
          renderItem={(item) => (
            <List.Item key={item.address}>
              <List.Item.Meta
                avatar={<Avatar src={initialState?.currentUser?.avatarUrl} />}
                title={item.address+"  "+item.ip}
                description={item.loginTime}
              />
              <div></div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default App;

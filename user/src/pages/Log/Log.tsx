import {Avatar, List} from "antd";
import {useModel} from "@@/plugin-model/useModel";


const data = [
  {
    title: 'Ant Design Title 1',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 2',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 3',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 4',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
];

const Log = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={initialState?.currentUser?.avatarUrl}/>}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}


export default Log;


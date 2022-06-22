import {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, Form,message} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {DeleteOutlined, PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import {createType, deleteType, searchType} from "@/services/ant-design-pro/api";



interface searchTypeTs{
  id: number;
  name: string,
  type: number,
  createTime: Date,
  updateTime: Date,
}


const App = () => {

  const [typeData,setTypeDate]=useState()
  const [refreshKey, setRefreshKey] = useState(100);
  const [hasLoading,setLoading] =useState(true)
  const typeDelete = async (value: any) => {
    const res = await deleteType({'id':value})
    if(res.code === 0){
      setRefreshKey(refreshKey - 1);
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const action: any = []


  useEffect( () => {

    const getType = async () => {
      const {data} = await searchType();
      if(data !== null){
        data.map((m: searchTypeTs, index)=>{
          action.push({
            index:index  + 1,
            id:m.id,
            name:m.name,
            type:m.type,
            createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(m.updateTime).format("YYYY-MM-DD HH:mm:ss"),
          })
        })
      }


      setLoading(false)
      setTypeDate(action)
    }
    getType()

  }, [refreshKey])
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);




  // @ts-ignore
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: any) => ({
    // @ts-ignore
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            搜索
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            清空
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value: string, record: {}) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });




  const columns: any= [
    {
      title: 'ID',
      dataIndex: 'index',
      key: 'id',
      align:'center',
      width: '5%',
    },
    {
      title: '时长别名',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      width: '15%',
      ...getColumnSearchProps('name'),
    },
    {
      title: '时长/天',
      dataIndex: 'type',
      key: 'type',
      align:'center',
      width: '15%',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align:'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align:'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align:'center',
      key: 'action',
      render:((_: any,record: {id: number})=>(
        <div>
          <Space>
            <a onClick={()=>typeDelete(record.id)}><DeleteOutlined /></a>
          </Space>
        </div>
      ))
    },
  ];



  const onFinish =async (values: any) => {
    const res = await createType({...values})
    if(res.code === 0){
      setRefreshKey(refreshKey + 1);
      message.success('Success',1)
    }else{

      message.error(res.description,1)
    }


  };


const rowSelection={}
  return (
  <div style={{margin:'0 auto'}}>
    <Form
      name="basic"
      onFinish={onFinish}
    >

      <div style={{display:"flex"}}>
        <Space>
          <Form.Item
            name="type"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder="填写 单位/天"/>
          </Form.Item>

          <Form.Item
            name="name"
            rules={[{ required: true, message: '' }]}
          >
            <Input  placeholder="填写 类型别名" />
          </Form.Item>
        </Space>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button icon={<PlusCircleOutlined />} type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </div>


    </Form>
    <Table  rowKey={record => record.id} loading={hasLoading} size={"small"} columns={columns} dataSource={typeData} rowSelection={rowSelection} />
  </div>


  );
};

export default App;

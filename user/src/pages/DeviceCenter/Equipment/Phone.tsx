import {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, Form, message, Tag} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {DeleteOutlined, PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import {deleteDevice, deviceAdd, searchDevicesList} from "@/services/ant-design-pro/api";

import {ws} from '@/utils/WebSocket'
import {decrypt} from "@/utils/aes";




const Phone = () => {

  const [deviceListData,setDeviceListDate]=useState()
  const [refreshKey, setRefreshKey] = useState(100);
  const [hasLoading,setLoading] =useState(true)


  const deviceDelete = async (value: any) => {
    const res = await deleteDevice({'id':value})
    if(res.code === 0){
      const a =refreshKey-1
      setRefreshKey(a)
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const action: any = []






useEffect(()=>{
  ws().onmessage= async (e: any)=>{
    if(e.data === "设备上线"){

      const a =refreshKey+1

        setRefreshKey(a)



    }
    if(e.data === "设备下线"){
      const a =refreshKey-1
      setRefreshKey(a)

    }
  }
},[])

  useEffect( () => {
    const getDevicesList = async () => {
      const {data} = await searchDevicesList();
      const res =decrypt(data).split(";")
      if(res[0] !== ""){
        for(let i = 0 ;i < res.length;i++){
          const m = JSON.parse(res[i])
            action.push({
              index:i + 1,
              id:m.id,
              remark:m.remark,
              deviceName:m.deviceName,
              deviceModel:m.deviceModel,
              deviceGroup:m.deviceGroup,
              status:m.status,
              createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            })
          }

        }






      setLoading(false)
      setDeviceListDate(action)
    }
    getDevicesList().then()

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
    onFilter: (value: string, record: any) =>
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
      title: '编号',
      dataIndex: 'remark',
      key: 'remark',
      align:'center',
      width: '15%',
      ...getColumnSearchProps('remark'),
    },
    {
      title: '设备名',
      dataIndex: 'deviceName',
      key: 'deviceName',
      align:'center',
      width: '15%',
      ...getColumnSearchProps('deviceName'),
    },
    {
      title: '设备识别码',
      dataIndex: 'deviceModel',
      key: 'deviceModel',
      align:'center',
      width: '15%',
      ...getColumnSearchProps('deviceModel'),
    },
    {
      title: '设备分组',
      dataIndex: 'deviceGroup',
      key: 'deviceGroup',
      align:'center',
      width: '15%',
      ...getColumnSearchProps('deviceGroup'),
      render:((_: any,record: {deviceGroup: string})=>(
        <span>{record.deviceGroup == "" || record.deviceGroup == null ? "默认分组": record.deviceGroup} </span>
      ))
    },
    {
      title: '连接状态',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render:((_: any,record: {status: number})=>(
        <div>
          <Tag color={record.status === 0?"#87d068":"volcano" }>{record.status === 0 ? "在线" : "已下线"}</Tag>
        </div>
      ))
    },
    {
      title: '加入时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
            <a onClick={()=>deviceDelete(record.id)}><DeleteOutlined /></a>
          </Space>
        </div>
      ))
    },
  ];



  const onFinish =async (values: any) => {
    const res = await deviceAdd({...values})
    if(res.code === 0){
      const a =refreshKey+1
      setRefreshKey(a)

      message.success('设备添加成功',1)
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
              name="deviceName"
              rules={[{ required: true, message: '' }]}
            >
              <Input placeholder="填写 设备名"/>
            </Form.Item>

            <Form.Item
              name="deviceModel"
              rules={[{ required: true, message: '' }]}
            >
              <Input  placeholder="填写 设备识别码(IMEI)" />
            </Form.Item>

            <Form.Item
              name="remark"
              rules={[{ required: true, message: '' }]}
            >
              <Input  placeholder="填写 自定义编号" />
            </Form.Item>
          </Space>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button icon={<PlusCircleOutlined />} type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </div>


      </Form>
      <Table  rowKey={record => record.id} loading={hasLoading} size={"small"} columns={columns} dataSource={deviceListData} rowSelection={rowSelection} />
    </div>


  );
};

export default Phone;

import {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, message, Modal, Form, Tag, Select, InputNumber} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {DeleteOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import '../ApplicationManage/index.less'
import {createKami, deleteKami, searchKami, searchSoftware, searchType} from "@/services/ant-design-pro/api";
import { useModel } from 'umi';
const { Option } = Select;



const App = () => {
  const [kami,setKami]=useState()
  const [kamiKey,setKamiKey] =useState(100)
  const [hasLoading,setLoading] =useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setDetailIsModalVisible] = useState(false);


  const {kamiValue,setKamiValue,softwareStoreList,savaSoftwareList,typeStoreList,savaTypeList} =useModel("useKamiModel",(model: any)=> ({
    kamiValue: model.kamiValue,
    setKamiValue:model.changeKamiValue,
    softwareStoreList:model.softwareList,
    savaSoftwareList:model.saveSoftware,
    typeStoreList:model.typeList,
    savaTypeList:model.saveType

  }))


  const temp: any = []
  const softwareTempList: any= []
  const typeTempList: any= []
  const getSoftList = async () =>{
    const {data} =  await searchSoftware()
    for(let i = 0;i < data.length;i++){
      softwareTempList.push({
        name:data[i].name,
        secret:data[i].secret
      })
    }

    savaSoftwareList(softwareTempList)

  }
  const getTypeList = async () =>{
    const {data} =  await searchType()
    if(data !== null ){
      for(let i = 0;i < data.length;i++){
        typeTempList.push({
          name:data[i].name,
          type:data[i].type
        })
      }
    }


    savaTypeList(typeTempList)

  }
  const kamiDelete = async (value: any) => {

    const res = await deleteKami({'id':value.id})

    if(res.code === 0){
      setKamiKey(kamiKey - 1);
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const kamiDetail =  (value: any)=>{
    setKamiValue(value)
    setDetailIsModalVisible(true)



  }
  useEffect( () => {
    const getKami = async () => {
      const {data} = await searchKami();
      if(data !== null){
        data.map((m: any,index: number)=>{
          temp.push({
            index: index + 1,
            id:m.id,
            software:m.software,
            status:m.status,
            kami:m.kami,
            type:m.type,
            ip:m.ip,
            machine:m.machine,
            online:m.online,
            createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(m.updateTime).format("YYYY-MM-DD HH:mm:ss"),
            validTime:moment(m.validTime).format("YYYY-MM-DD HH:mm:ss") !== "Invalid date" ? moment(m.validTime).format("YYYY-MM-DD HH:mm:ss") : "",
          })
        })
      }

      setKami(temp)
      setLoading(false)
    }
    getKami().then()
  }, [kamiKey])

  useEffect(() => {
    getSoftList().then()
    getTypeList().then()

  },[])
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

  const rowSelection ={

  }
  const columns: any = [
    {
      title: 'id',
      dataIndex: 'index',
      key: 'id',
      align:'center',

    },
    {
      title: '卡密',
      dataIndex: 'kami',
      key: 'kami',
      align:'center',
      width: '20%',
      ...getColumnSearchProps('kami'),
    },
    {
      title: '时长',
      dataIndex: 'type',
      key: 'type',
      align:'center',
      ...getColumnSearchProps('type'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align:'center',
      render:((_: any, record: {status: number})=>(
        <Tag color={record.status === 0 ? "#009688" : "red"}>
          {record.status === 0 ? "正常" : "冻结"}
        </Tag>

      ))
    },



    {
      title: '创建时间',
      dataIndex: 'createTime',
      align:'center',
      key: 'createTime',
      width: '10%',
    },
    {
      title: '到期时间',
      dataIndex: 'validTime',
      key: 'validTime',
      align:'center',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align:'center',
      key: 'action',
      render:((_: any,m: API.kamiSearch)=>(
        <div >
          <Space >
            <a onClick={()=>kamiDetail(m)}><EyeOutlined /></a>
            <a  onClick={()=>kamiDelete(m)}><DeleteOutlined /></a>
          </Space>
        </div>
      ))
    },
  ];

  const AddSoftware = () =>{
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditCancel = () => {
    setDetailIsModalVisible(false);
  };
  const onFinish =async (values: API.kamiAddParams) => {
    const {software,type,num,prefix} = values
    const res = await createKami({software,type,num,prefix})
    if(res.code === 0 && res.data !== ""){
      setIsModalVisible(false)
      setKamiKey(kamiKey + 1);
      message.success("软件添加成功",2)
    }else{
      message.error(res.description,2)
    }
  };




  return(
    <>
      <Space>
        <Button className='button' icon={<PlusCircleOutlined />} type="primary" htmlType="submit" onClick={AddSoftware}>
          添加
        </Button>
      </Space>

      <Modal footer={null} title="添加软件" visible={isModalVisible}  onCancel={handleCancel}>
        <Form
          name="addSoftware"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}

          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="应用列表"
            name="software"
            rules={[{ required: true, message: '' }]}
          >
            <Select placeholder={"请选择应用"}>
              {
                softwareStoreList?.map((m: {name: string,secret: string})=>{
                  return(
                    <Option key={m.name} value={m.secret}>{m.name}</Option>
                  )
                })
              }

            </Select>
          </Form.Item>
          <Form.Item
            label="卡密类型"
            name="type"
            rules={[{ required: true, message: '' }]}
          >
            <Select placeholder={"请选择卡密类型"}>
              {
                typeStoreList?.map((m: {name: string,type: number})=>{
                  return(
                    <Option key={m.name} value={m.type}>{m.name}</Option>
                  )
                })
              }

            </Select>
          </Form.Item>
          <Form.Item
            label="生成数量"
            name="num"
            rules={[{ required: true, message: '' }]}
          >
            <InputNumber placeholder='请输入生成的卡密数量' max={2000} min={1} style={{width:'313px'}}/>
          </Form.Item>

          <Form.Item

            label="卡密前缀"
            name="prefix"
          >
            <Input placeholder='请输入卡密的前缀' style={{width:'250px'}}/>
          </Form.Item>




          <Form.Item style={{float:'right',marginTop:"-55px",marginRight:'18px'}} wrapperCol={{ offset: 8, span: 16 }}>
            <Button size={"small"} type="primary" htmlType="submit">
              增加
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal footer={null} title="卡密详情" visible={isDetailModalVisible}  onCancel={handleEditCancel}  >

        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Input addonBefore="卡密"  value={kamiValue?.kami} readOnly/>
          <Input addonBefore="卡密时长"  value={kamiValue?.type} readOnly/>
          <Input addonBefore="卡密状态"  value={kamiValue?.status} readOnly/>
          <Input addonBefore="绑定机器"  value={kamiValue?.machine} readOnly/>
          <Input addonBefore="登录IP"  value={kamiValue?.ip} readOnly/>
          <Input addonBefore="生成时间"  value={kamiValue?.createTime} readOnly/>
          <Input addonBefore="最后登录"  value={kamiValue?.updateTime} readOnly/>
          <Input addonBefore="到期时间"  value={kamiValue?.validTime} readOnly/>

        </Space>


      </Modal>

      <Table id="table" rowKey={record => record.id} style={{marginTop:"10px"}} loading={hasLoading}  columns={columns} dataSource={kami} rowSelection={rowSelection} />;
    </>
  )


};

export default App;

import  {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, message, Modal, Form, Tag, Select} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {

  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,

} from '@ant-design/icons';
import moment from 'moment';
import '../Key/index.less'
import {
  addKeyGroup, deleteKeyGroup,
  editKeyGroup,
  searchKeyGroup,

} from "@/services/ant-design-pro/api";

const { Option } = Select;



const App = () => {
  const [formRef]: any=Form.useForm()
  const [KeyGroup,setKeyGroup]=useState()
  const [groupKey,setGroupKey] =useState(100)
  const [hasLoading,setLoading] =useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditIsModalVisible] = useState(false);



  const groupKeyDelete = async (value: API.keyGroupSearch) => {
    const res = await deleteKeyGroup({'id':value.id,"groupName":value.groupName})
    if(res.code === 0){
      setGroupKey(groupKey - 1);
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const groupKeyEdit = (value: any)=>{

    formRef.setFieldsValue(value)
    setEditIsModalVisible(true)


  }

  const temp: any = []

  useEffect( () => {
    const getKeyGroup = async () => {
      const {data} = await searchKeyGroup();
      if(data !== null){
        data.map((m: { id: number; groupName: string; status: number ;num: number,  note: string;userid: string; createTime: moment.MomentInput; updateTime: moment.MomentInput; })=>{
          temp.push({
            id:m.id,
            groupName:m.groupName,
            num:m.num,
            status:m.status,
            note:m.note,
            userid:m.userid,
            createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(m.updateTime).format("YYYY-MM-DD HH:mm:ss"),
          })
        })
      }

      setKeyGroup(temp)
      setLoading(false)
    }
    getKeyGroup().then(()=>{} )



  }, [groupKey])

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
      dataIndex: 'id',
      key: 'id',
      align:'center',
      className:'softWareId'
    },
    {
      title: '分组名称',
      dataIndex: 'groupName',
      key: 'groupName',
      align:'center',
      width: '10%',
      ...getColumnSearchProps('groupName'),
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      align:'center',
      render:((_: any, record: {status: number})=>(
        <Tag color={record.status === 0 ? "#009688" : "red"}>
          {record.status === 0 ? "正常" : "冻结"}
        </Tag>

      ))
    },
    {
      title: '关键词数量',
      dataIndex: 'num',
      key: 'num',
      width: '15%',
      align:'center',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
      align:'center',
      width: "20%"
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      align:'center',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align:'center',
      key: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align:'center',
      key: 'action',
      render:((_: any,m: API.keyGroupSearch)=>(
        <div >
          <Space >
            <a onClick={()=>groupKeyEdit(m)}><EditOutlined /></a>
            <a  onClick={()=>groupKeyDelete(m)}><DeleteOutlined /></a>
          </Space>
        </div>
      ))
    },
  ];

  const AddGroupKey = () =>{
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditCancel = () => {
    setEditIsModalVisible(false);
  };

  const onFinish =async (values: API.keyGroupCreate) => {
    const res = await addKeyGroup(values)
    if(res.code === 0 && res.data !== ""){
      setIsModalVisible(false)
      setGroupKey(groupKey + 1);
      message.success("词库分组添加成功",2)
    }else{
      message.error(res.description,2)
    }
  };

  const EditFinish = async (value: any)=>{
    const res = await editKeyGroup({...value})
    if(res.code === 0){
      setGroupKey(groupKey + 1)
      setEditIsModalVisible(false)
      message.success('修改成功',2)
    }else{
      message.error('修改失败',2)
    }

  }




  return(
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Button className='button' icon={<PlusCircleOutlined />} type="primary" htmlType="submit" onClick={AddGroupKey}>
          添加
        </Button>
      </Space>

      <Modal footer={null} title="添加分组" visible={isModalVisible}  onCancel={handleCancel}>
        <Form
          name="addKeyGroup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true,isChecked:true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="词库分组"
            name="groupName"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder='分组名称'/>
          </Form.Item>

          <Form.Item
            label="备注"
            name="note"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder='备注内容'/>
          </Form.Item>



          <Form.Item style={{float:'right',marginTop:"-55px",marginRight:'18px'}} wrapperCol={{ offset: 8, span: 16 }}>
            <Button size={"small"} type="primary" htmlType="submit">
              增加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal footer={null} title="修改分组" visible={isEditModalVisible}  onCancel={handleEditCancel}>

        <Form
          form={formRef}
          name="editKeyGroup"
          labelCol={{ span: 6}}
          wrapperCol={{ span: 16 }}
          onFinish={EditFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            style={{display:"none"}}
          >
            <Input style={{display:"none"}}/>
          </Form.Item>

          <Form.Item
            label="分组名称"
            name="groupName"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="备注"
            name="note"
          >
            <Input />
          </Form.Item>



          <Form.Item
            label="分组状态"
            name="status"
          >
            <Select >
              <Option value={0}>启用</Option>
              <Option value={1}>停用</Option>
            </Select>

          </Form.Item>

          <Form.Item style={{float:'right',marginTop:"-55px",marginRight:'1px'}} wrapperCol={{ offset: 8, span: 16 }}>
            <Button size={"small"} type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table rowKey={record => record.id} style={{marginTop:"10px"}} loading={hasLoading}  columns={columns} dataSource={KeyGroup} rowSelection={rowSelection} />;
    </>
  )


};

export default App;

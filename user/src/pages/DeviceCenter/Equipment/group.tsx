import {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, Form, message, Tag, Switch, Select, Modal} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {
  DeleteOutlined,
  EditOutlined, FileTextOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UngroupOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import {addGroup, deleteGroup, editGroup, searchDeviceGroupList} from "@/services/ant-design-pro/api";
const { Option } = Select;
// @ts-ignore




const Group = () => {
  const [form] = Form.useForm();
  const [deviceGroupListData,setDeviceGroupListDate]=useState()
  const [refreshKey, setRefreshKey] = useState(100);
  const [hasLoading,setLoading] =useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formRef]: any=Form.useForm()

  function deviceGroupEdit(record: any) {
    formRef.setFieldsValue(record)
    setIsModalVisible(true)
  }
  const handleEditCancel = () => {
    setIsModalVisible(false);
  };

  const EditFinish = async (value: any)=>{
    console.log(value)
    const res = await editGroup({...value})
    if(res.code === 0){
      setRefreshKey(refreshKey - 1)
      setIsModalVisible(false)
      message.success('修改成功',2)
    }else{
      message.error('修改失败',2)
    }

  }


  const deviceGroupDelete = async (value: any) => {
    const res = await deleteGroup({'id':value})
    if(res.code === 0){
      setRefreshKey(refreshKey - 1);
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const action: any = []

  useEffect( () => {

    const getDevicesGroupList = async () => {
      const {data} = await searchDeviceGroupList();
      if(data !== null){
        data.map((m: { id: any; name: any; status: any; note: any; createTime: moment.MomentInput; updateTime: moment.MomentInput; }, index: number)=>{
          action.push({
            index:index  + 1,
            id:m.id,
            groupName:m.name,
            status:m.status,
            note:m.note,
            createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(m.updateTime).format("YYYY-MM-DD HH:mm:ss"),
          })
        })
      }


      setLoading(false)
      setDeviceGroupListDate(action)
    }
    getDevicesGroupList().then()

  }, [refreshKey])


  useEffect(()=>{
    form.setFieldsValue({
      status:true,
    })
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




  const columns: any= [
    {
      title: 'ID',
      dataIndex: 'index',
      key: 'id',
      align:'center',
      width: '5%',
    },
    {
      title: '分组',
      dataIndex: 'groupName',
      key: 'groupName',
      align:'center',
      width: '15%',
      ...getColumnSearchProps('groupName'),
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render:((_: any,record: {status: number})=>(
        <div>
          <Tag color={record.status === 0?"#87d068":"volcano" }>{record.status === 0 ? "正常" : "禁用"}</Tag>
        </div>
      ))
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
      align:'center',
      width: '20%',
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
      render:((_: any,record: any)=>(
        <div>
          <Space>
            <a  onClick={()=>deviceGroupEdit(record)}  ><EditOutlined /></a>
            <a onClick={()=>deviceGroupDelete(record.id)}><DeleteOutlined /></a>
          </Space>
        </div>
      ))
    },
  ];


  const onFinish =async (values: {groupName: string,note: string, status: boolean }) => {
    const{groupName,note,status}=values

    const res = await addGroup({groupName,note,status})
    if(res.code === 0){
      setRefreshKey(refreshKey + 1);
      message.success('设备添加成功',1)
    }else{

      message.error(res.description,1)
    }


  };


  const rowSelection={}
  return (
    <div style={{margin:'0 auto'}}>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
      >

        <div style={{display:"flex"}}>
          <Space>
            <Form.Item
              name="groupName"
              rules={[{ required: true, message: '' }]}
            >
              <Input addonBefore={<UngroupOutlined />} placeholder="填写 设备分组名"/>
            </Form.Item>


            <Form.Item
              name="note"
              rules={[{ required: true, message: '' }]}
            >
              <Input addonBefore={<FileTextOutlined />} placeholder="填写 分组备注" />
            </Form.Item>

            <Form.Item
              name="status"
              rules={[{ required: true, message: '' }]}
              valuePropName="checked"
            >
              <Switch checkedChildren="启用分组" unCheckedChildren="禁用分组"  />

            </Form.Item>

          </Space>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button icon={<PlusCircleOutlined />} type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </div>


      </Form>

      <Modal footer={null} title="修改分组" visible={isModalVisible}  onCancel={handleEditCancel}>

        <Form
          form={formRef}
          name="editPhoneGroup"
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
            label="设备分组"
            name="groupName"
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="分组备注"
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

      <Table  rowKey={record => record.id} loading={hasLoading} size={"small"} columns={columns} dataSource={deviceGroupListData} rowSelection={rowSelection} />
    </div>


  );
};

export default Group;

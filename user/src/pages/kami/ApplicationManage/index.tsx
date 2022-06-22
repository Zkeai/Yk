import  {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, message, Modal, Form, Switch, Tag, Select, Upload} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons';
import moment from 'moment';
import '../ApplicationManage/index.less'
import {
  createSoftware,
  deleteSoftware,
  editSoftware,
  searchSoftware,
  uploadVersion
} from "@/services/ant-design-pro/api";
import type { UploadProps } from 'antd';
import {Host} from "@/contants";
const { Option } = Select;



const App = () => {
  const [formRef]: any=Form.useForm()
  const [software,setSoftWare]=useState()
  const [softwareKey,setSoftwareKey] =useState(100)
  const [hasLoading,setLoading] =useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditIsModalVisible] = useState(false);
  const [isVersionModalVisible, setVersionIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const softwareDelete = async (value: any) => {
    const res = await deleteSoftware({'id':value.id})
    if(res.code === 0){
      setSoftwareKey(softwareKey - 1);
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const softwareEdit = (value: any)=>{

    formRef.setFieldsValue(value)
    setEditIsModalVisible(true)


  }

  const autoVersion =(value: any)=>{

    form.setFieldsValue({
      id:value.id,
      secret:value.secret
    })
    setVersionIsModalVisible(true)
  }
  const temp: any = []

  useEffect( () => {
    const getSoftware = async () => {
      const {data} = await searchSoftware();
      if(data !== null){
        data.map((m: { id: any; name: any; status: any; machine: any; notice: any; secret: any; version: any; userid: any; createTime: moment.MomentInput; updateTime: moment.MomentInput; })=>{
          temp.push({
            id:m.id,
            name:m.name,
            status:m.status,
            machine:m.machine,
            notice:m.notice,
            secret:m.secret,
            version:m.version,
            userid:m.userid,
            createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(m.updateTime).format("YYYY-MM-DD HH:mm:ss"),
          })
        })
      }

      setSoftWare(temp)
      setLoading(false)
    }
    getSoftware().then(()=>{} )



  }, [softwareKey])

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
      title: '软件别名',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      width: '5%',
      ...getColumnSearchProps('name'),
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
      align:'center',
      render:((_: any, record: {status: number})=>(
        <Tag color={record.status === 0 ? "#009688" : "red"}>
          {record.status === 0 ? "正常" : "冻结"}
        </Tag>

      ))
    },
    {
      title: '机器码',
      dataIndex: 'machine',
      key: 'machine',
      width: '10%',
      align:'center',
      render:((_: any, record: {machine: number})=>(
        <Tag color={record.machine === 0 ? "#009688" : "red"}>
          {record.machine === 0 ? "开启" : "关闭"}
        </Tag>
      ))
    },
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      align:'center',
      width: "20%"
    },
    {
      title: '公告',
      dataIndex: 'notice',
      key: 'notice',
      align:'center',
      width: "20%"
    },
    {
      title: '软件密钥',
      dataIndex: 'secret',
      align:'center',
      key: 'secret',
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
      render:((_: any,m: API.softwareSearch)=>(
        <div >
          <Space >
            <a onClick={()=>softwareEdit(m)}><EditOutlined /></a>
            <a onClick={()=>{autoVersion(m)}}><ArrowUpOutlined /></a>
            <a  onClick={()=>softwareDelete(m)}><DeleteOutlined /></a>
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
    setEditIsModalVisible(false);
  };
  const handleVersionCancel = () =>{
    setVersionIsModalVisible(false);
  }
  const onFinish =async (values: API.softwareAddParams) => {
    const {name,notice,version} = values
    let machine = 0
    if(!values.switch){
      machine = 1
    }
    const res = await createSoftware({name,notice,version,machine})
    if(res.code === 0 && res.data !== ""){
      setIsModalVisible(false)
      setSoftwareKey(softwareKey + 1);
      message.success("软件添加成功",2)
    }else{
      message.error(res.description,2)
    }
  };
  const uploadFinish = async (values: API.uploadParams) => {
    const res = await uploadVersion({...values})

    if(res.code === 0){
      message.success("上传新版本成功",1);
      setVersionIsModalVisible(false)
    }else{
      message.success(res.description,1);
    }

  }
  const EditFinish = async (value: any)=>{
    const res = await editSoftware({...value})
    if(res.code === 0){
      setSoftwareKey(softwareKey + 1)
      setEditIsModalVisible(false)
      message.success('修改成功',2)
    }else{
      message.error('修改失败',2)
    }

  }

  const uploadProps: UploadProps = {

    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`).then(() => {});
        if(info.file.response.code === 0){


          form.setFieldsValue({
            updateUrl:info.file.response.data
          })

        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`).then(() =>{} );
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };


  return(
    <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Button className='button' icon={<PlusCircleOutlined />} type="primary" htmlType="submit" onClick={AddSoftware}>
            添加
          </Button>
        </Space>

      <Modal footer={null} title="添加卡密" visible={isModalVisible}  onCancel={handleCancel}>
        <Form
          name="addKami"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true,isChecked:true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="软件名"
            name="name"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder='软件名'/>
          </Form.Item>

          <Form.Item
            label="公告"
            name="notice"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder='公告内容'/>
          </Form.Item>

          <Form.Item
            label="版本号"
            name="version"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder='软件版本号'/>
          </Form.Item>

          <Form.Item
            label="机器码"
            name="switch"
            valuePropName="checked"
          >
            <Switch checkedChildren="开启" unCheckedChildren="关闭"    />

          </Form.Item>


          <Form.Item style={{float:'right',marginTop:"-55px",marginRight:'18px'}} wrapperCol={{ offset: 8, span: 16 }}>
            <Button size={"small"} type="primary" htmlType="submit">
              增加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal footer={null} title="修改软件" visible={isEditModalVisible}  onCancel={handleEditCancel}>

        <Form
          form={formRef}
          name="editSoftware"
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
            label="软件名"
            name="name"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="软件密钥"
            name="secret"
          >
            <Input  disabled/>
          </Form.Item>

          <Form.Item
            label="软件公告"
            name="notice"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="版本号"
            name="version"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="机器码"
            name="machine"
          >
            <Select >
              <Option value={0}>开启</Option>
              <Option value={1}>关闭</Option>
            </Select>

          </Form.Item>

          <Form.Item
            label="软件状态"
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
      <Modal footer={null} title="版本更新" visible={isVersionModalVisible}  onCancel={handleVersionCancel}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Upload
          name="autoVersion"
          action={Host+"/api/user/txCos"}
          data={file=>({
            Raw:file,
            Name:file.name,
            path:'autoUpdate'
          })}
          {...uploadProps}
        >
          <Button icon={<UploadOutlined />}>上传最新文件</Button>
        </Upload>

        <Form
          form={form}
          name="uploadVersion"
          onFinish={uploadFinish}
          scrollToFirstError
        >
          <Form.Item
            name="id"
            label="id"
            style={{display:"none"}}
          >
            <Input   style={{display:"none"}}/>
          </Form.Item>

          <Form.Item
            name="secret"
            label="secret"
            style={{display:"none"}}
          >
            <Input   style={{display:"none"}}/>
          </Form.Item>

          <Form.Item
            name="updateUrl"
            label="txCos地址"
            style={{display:"none"}}
          >
            <Input   style={{display:"none"}}/>
          </Form.Item>

          <Form.Item
            name="version"
            label="版本号"

          >
            <Input   />
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit" >
              提交修改
            </Button>
          </Form.Item>
        </Form>
        </Space>

      </Modal>

        <Table rowKey={record => record.id} style={{marginTop:"10px"}} loading={hasLoading}  columns={columns} dataSource={software} rowSelection={rowSelection} />;
    </>
    )


};

export default App;

import  {useEffect, useRef, useState} from 'react';
import {Table, Input, Button, Space, message, Modal, Form, Tag, Select, Switch} from 'antd';
// @ts-ignore
import Highlighter from 'react-highlight-words';
import {

  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,

} from '@ant-design/icons';
import moment from 'moment';
import '../index.less'
import {
  addKey, deleteKey,
  editKey,
  searchKey, searchKeyGroup,

} from "@/services/ant-design-pro/api";
import {useModel} from "@@/plugin-model/useModel";
import TextArea from "antd/es/input/TextArea";
import {decrypt} from "@/utils/aes";

const { Option } = Select;



const App = () => {
  const [formRef]: any=Form.useForm()
  const [KeyWord,setKeyWord]=useState()
  const [wordKey,setWordKey] =useState(100)
  const [hasLoading,setLoading] =useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditIsModalVisible] = useState(false);

  const {keyGroupList,saveKeyGroup} =useModel("useResourceModel",(model: any)=> ({
    keyGroupList: model.keyGroupList,
    saveKeyGroup:model.saveKeyGroup,

  }))



  const keyGroupTempList: any= []
  const getKeyGroupList = async () =>{
    const userList =  await searchKeyGroup()
    const res =decrypt(userList.data).split(";")

    if(res[0] !== ""){
      for(let i = 0;i < res.length;i++){
        const m = JSON.parse(res[i])

        keyGroupTempList.push({
          keyGroup: m.groupName,
          id: m.id
        })
      }

    }



    saveKeyGroup(keyGroupTempList)

  }
  useEffect(() => {
    getKeyGroupList().then()
  },[])

  const wordKeyDelete = async (value: API.keySearch) => {
    const res = await deleteKey({'id':value.id,"keyWord":value.keyWord})
    if(res.code === 0){
      setWordKey(wordKey - 1);
      message.success('删除成功',1)
    }else{
      message.error(res.description,1)
    }

  }
  const wordKeyEdit = (value: any)=>{
    formRef.setFieldsValue(value)
    setEditIsModalVisible(true)


  }

  const temp: any = []

  useEffect( () => {
    const getKeyWord = async () => {
      const {data} = await searchKey();
      const res =decrypt(data).split(";")

      if(res[0] !== ""){

        for(let i = 0 ;i < res.length;i++){
          const m = JSON.parse(res[i])
          temp.push({
            id:m.id,
            keyWord:m.keyWord,
            content:m.content,
            keyGroup:m.keyGroup,
            status:m.status,
            note:m.note,
            userid:m.userid,
            createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment(m.updateTime).format("YYYY-MM-DD HH:mm:ss"),
          })
        }


      }

      setKeyWord(temp)
      setLoading(false)
    }
    getKeyWord().then(()=>{} )



  }, [wordKey])

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
      title: '关键词',
      dataIndex: 'keyWord',
      key: 'keyWord',
      align:'center',
    },
    {
      title: '回答内容',
      dataIndex: 'content',
      key: 'content',
      align:'center',
      ...getColumnSearchProps('content'),
    },

    {
      title: '分组名称',
      dataIndex: 'keyGroup',
      key: 'keyGroup',
      align:'center',
      width: '10%',
      ...getColumnSearchProps('keyGroup'),
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
      render:((_: any,m: API.keySearch)=>(
        <div >
          <Space >
            <a onClick={()=>wordKeyEdit(m)}><EditOutlined /></a>
            <a  onClick={()=>wordKeyDelete(m)}><DeleteOutlined /></a>
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

  const onFinish =async (values: any) => {
    const {switchStatus,note,keyGroup,keyWord,content} =values
    let status ;
    if (switchStatus === true) {
      status = 0
    } else {
      status = 1
    }
    const res = await addKey({keyWord,keyGroup,note,content,status})
    if(res.code === 0 && res.data !== ""){
      setIsModalVisible(false)
      setWordKey(wordKey + 1);
      message.success("词库添加成功",2)
    }else{
      message.error(res.description,2)
    }
  };

  const EditFinish = async (value: any)=>{
    const res = await editKey({...value})
    if(res.code === 0){
      setWordKey(wordKey + 1)
      setEditIsModalVisible(false)
      message.success('修改成功',2)
    }else{
      message.error('修改失败',2)
    }

  }




  return(
    //todo
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Button className='button' icon={<PlusCircleOutlined />} type="primary" htmlType="submit" onClick={AddGroupKey}>
          添加
        </Button>
      </Space>

      <Modal footer={null} title="添加关键词" visible={isModalVisible}  onCancel={handleCancel}>
        <Form
          name="addKeyGroup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true,isChecked:true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="关键词"
            name="keyWord"
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder='输入关键词'/>
          </Form.Item>

          <Form.Item
            label="回答"
            name="content"
            rules={[{ required: true, message: '' }]}
          >
            <TextArea  placeholder='输入回复内容'/>
          </Form.Item>

          <Form.Item
            label="分组列表"
            name="keyGroup"
            rules={[{ required: true, message: '' }]}
          >
            <Select placeholder={"请选择分组"}>
              {
                keyGroupList?.map((m: {keyGroup: string,id: number})=>{
                  return(
                    <Option key={m.id} value={m.keyGroup}>{m.keyGroup}</Option>
                  )
                })
              }

            </Select>
          </Form.Item>

          <Form.Item
            label="备注"
            name="note"
          >
            <Input placeholder='备注内容'/>
          </Form.Item>

          <Form.Item
            label="状态"
            name="switchStatus"
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
      <Modal footer={null} title="修改关键词" visible={isEditModalVisible}  onCancel={handleEditCancel}>

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
            label="备注"
            name="note"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="回答内容"
            name="content"
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="分组列表"
            name="keyGroup"
            rules={[{ required: true, message: '' }]}
          >
            <Select placeholder={"请选择分组"}>
              {
                keyGroupList?.map((m: {keyGroup: string,id: number})=>{
                  return(
                    <Option key={m.id} value={m.keyGroup}>{m.keyGroup}</Option>
                  )
                })
              }

            </Select>
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

      <Table rowKey={record => record.id} style={{marginTop:"10px"}} loading={hasLoading}  columns={columns} dataSource={KeyWord} rowSelection={rowSelection} />;
    </>
  )


};

export default App;

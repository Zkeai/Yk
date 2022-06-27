import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  message
} from 'antd';
import  { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import '../ChangeInfo/index.less'




import { useModel } from 'umi';
import {userinfoEdit} from "@/services/ant-design-pro/api";
import {Host} from "@/contants";




const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


/**
 * 上传头像-两个方法
 * @param file
 */
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


const handleSubmit = async(values: API.userinfoEditParams)=>{

  try {
    //修改信息
    const res = await userinfoEdit({ ...values});
    if (res.code === 0) {
      const defaultLoginSuccessMessage = '修改成功';
      message.success(defaultLoginSuccessMessage);
    }else{
      message.error(res.description);
    }

  } catch (error: any) {
    const defaultLoginFailureMessage = '修改失败，请重试！';
    message.error(error.message ?? defaultLoginFailureMessage);
  }
}

const App = () => {



  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const [imageUrl, setImageUrl] = useState<any>(initialState?.currentUser?.avatarUrl);
  console.log(initialState?.currentUser?.superior)
  const a ={
    disabled:initialState?.currentUser?.superior !== '' && initialState?.currentUser?.superior !== undefined
  }

  const onFinish =async (values: any) => {

    await handleSubmit(values as API.userinfoEditParams);


  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );


  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, () => {
        setLoading(false);
        if(info.file.response.code === 0){
          setImageUrl(info.file.response.data);

          form.setFieldsValue({
            image:info.file.response.data
          })

        }



      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <div className='main-info'>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={Host+"/api/user/txCos"}
        data={file=>({
          IMG_Raw:file,
          IMG_Name:file.name,
          path:'userCenterAvatar'
        })}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>

        <Form

          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: '86',
            id:initialState?.currentUser?.id,
            nickName:initialState?.currentUser?.username,
            email:initialState?.currentUser?.email,
            phone:initialState?.currentUser?.phone,
            superior:initialState?.currentUser?.superior,
            validTime:initialState?.currentUser?.validTime,
            image:imageUrl,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="image"
            label="头像地址"
            style={{display:'none'}}
          >
            <Input value={imageUrl}  style={{display:'none'}} disabled />

          </Form.Item>

          <Form.Item
            name="id"
            label="用户ID"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="superior"
            label="上级编号"
          >
            <Input
              {...a}
              placeholder="只有首次可以修改,仅普通用户需要"
            />
          </Form.Item>

          <Form.Item
            name="nickName"
            label="昵称"

          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              {
                type: 'email',
                message: '请输入正确的邮箱',
              },

            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>



          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>




          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" >
              提交修改
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
};

export default App;

import type { ProFormInstance} from '@ant-design/pro-components';
import {
  CheckCard,
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit, ProFormRadio, ProFormSelect, ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import {Divider, message, Modal, Skeleton} from 'antd';
import {addTask, getCosFileList, searchComments} from "@/services/ant-design-pro/api";

import {useEffect, useRef, useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import "../../index.less"
import moment from "moment";
import {decrypt} from "@/utils/aes";
import InfiniteScroll from 'react-infinite-scroll-component';
import UpLoads from '@/pages/components/UpLoad'
import PhoneList from '@/pages/DeviceCenter/Script/components/PhoneList'

const phoneArray: any = []
const newPhoneArray: any = []
const newArray: any = []
let ws: any;



const options=[
  {
    value: '6',
    label: '6%',
  },
  {
    value: '12',
    label: '12%',
  },
]




export default (props: any) => {
  const {saveImgUrl} =useModel("useXhsModel",(model: any)=> ({
    saveImgUrl:model.saveImgUrl,

  }))

  const formRef = useRef<ProFormInstance>();
  const {initialState} = useModel('@@initialState');
  const {setUseModalVisible, useScriptInfo} = useModel("useScriptModel", (model: any) => ({
    setUseModalVisible: model.setUseModalVisible,
    useScriptInfo: model.useScriptInfo,
  }))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState({display: "none"});
  const [imgVisible, setImgVisible] = useState({display: "none"});
  const [uploadVisible, setUploadVisible] = useState({display: "inline-block"});
  const [task, setTask] = useState(
    {
      ZxMs: "",
      time: "",
      scriptName: "",
      scriptGroup: "",
      num: 0,
      note: "",
      createTime: ''
    }
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getImg = async ()=>{
    const buketName = initialState?.cosConfig?.tx_buket_name;
    const secret_id = initialState?.cosConfig?.tx_secret_id;
    const secret_key = initialState?.cosConfig?.tx_secret_key;
    const region = initialState?.cosConfig?.tx_region;
    const userList = await getCosFileList({
      buketName:buketName+"",
      prefix:"le_img",
      secret_id:secret_id+"",
      secret_key:secret_key+"",
      region:region+""
    })

    const re =userList.data.objectSummaries
    newArray.length=0
    if(re[0] !== ""){
      for(let i = 0 ;i < re.length;i++){
        if(i > 0){
          newArray.push({
            index:i + 1,
            url:"https://"+buketName+".cos."+region+".myqcloud.com/"+re[i].key,
            imgUrl:"https://"+buketName+".cos."+region+".myqcloud.com/"+re[i].key,
            imgName:re[i].key.split("/")[1],
            key:re[i].key,
            size:(re[i].size/1024/1024).toFixed(2)+"MB",
            buketName,
            secret_id,
            secret_key,
            region,
          })
        }

      }

    }


  }
  useEffect(() => {
    ws = props.Ws
    saveImgUrl(formRef)

  }, [props.Ws, saveImgUrl])






  const handleSelect = (val: string) => {
    formRef?.current?.setFieldsValue({
      commentArea: val,
    });
  }
    //图库图片点击
  const handleCheckedImg = (isChecked: boolean,val: string) => {
    if(isChecked){

      const last_url = formRef?.current?.getFieldsValue().img_urls
      if(last_url === undefined || last_url === ""){
        formRef?.current?.setFieldsValue({
          img_urls: val,
        });
      }else{
        formRef?.current?.setFieldsValue({
          img_urls: last_url+'\n'+val,
        });
      }

    }else{
      //todo 取消选中 理应 删除这条链接
      return

    }

  }



  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

//自定义组件  图片列表
  const ImgList: any = ({count,img_list}: {count: number,img_list: any[]}) => {
    return(
      Array.from({length: count}).map((_item, index) =>
        <CheckCard
          style={{ width: 165 }}
          value={index}
          key={img_list[index]?.imgUrl}
          onChange={(checked)=>{handleCheckedImg(checked,img_list[index]?.imgUrl)}}
          cover={
            <img
              alt="loading"
              style={{height:90}}
              src={img_list[index]?.imgUrl}
            />
          }
        />
      )
    )

}

  const loadMoreData = ()=>{
      return
  }



  // @ts-ignore
  return (
    <>
      <StepsForm
        formRef={formRef}
        onFinish={async (values) => {
          const {time, selectPhone, note, ZxMs} = values
          const scriptName = useScriptInfo.scriptName
          const scriptGroup = useScriptInfo.scriptGroup
          const sendTime = time
          const taskNote = note
          const executionModel = ZxMs
          const devices = selectPhone.toString()
          const uuid = initialState?.currentUser?.uuid
          const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
          let msg = "";
          if (ZxMs === "排队") {
            msg = JSON.stringify({
              type: "排队",
              createTime: createTime,
              scriptUrl: useScriptInfo.scriptUrl,
              T_Title: values?.T_Title,
              commentArea:values?.commentArea,
              img_urls: values?.img_urls,
              T_Label: values?.T_Label

            })
          }
          if (ZxMs === "定时") {
            msg = JSON.stringify({
              type: "定时",
              sendTime: sendTime,
              createTime: createTime,
              scriptUrl: useScriptInfo.scriptUrl,
              T_Title: values?.T_Title,
              commentArea:values?.commentArea,
              img_urls: values?.img_urls,
              T_Label: values?.T_Label
            })
          }


          const res = await addTask({
            scriptName,
            scriptGroup,
            sendTime,
            taskNote,
            devices,
            executionModel,
            uuid,
            msg,
            createTime
          });
          if (res.code === 0) {
            message.success('任务创建成功', 1);
            setTask({
              ZxMs: values.ZxMs,
              time: values.time,
              scriptName: useScriptInfo.scriptName,
              scriptGroup: useScriptInfo.scriptGroup,
              num: values.selectPhone.length,
              note: values.note,
              createTime: res.data
            })
            setIsModalVisible(true);
            setUseModalVisible(false)

            if (executionModel === "排队") {
              const msg_ = JSON.stringify({
                type: executionModel,
                msg: {
                  type: "排队",
                  createTime: createTime,
                  scriptUrl: useScriptInfo.scriptUrl,
                  T_Title: values?.T_Title,
                  commentArea:values?.commentArea,
                  img_urls: values?.img_urls,
                  T_Label: values?.T_Label
                },
                array: devices.split(",")
              })
              ws.send(msg_)


            }

            if (executionModel === "定时") {
              const msg_ = JSON.stringify({
                type: executionModel,
                msg: {
                  type: "定时",
                  createTime: createTime,
                  sendTime: sendTime,
                  scriptUrl: useScriptInfo.scriptUrl,
                  T_Title: values?.T_Title,
                  commentArea:values?.commentArea,
                  img_urls: values?.img_urls,
                  T_Label: values?.T_Label
                },
                array: devices.split(",")
              })
              ws.send(msg_)


            }


          } else {
            message.error(res.description, 1)
          }


          return true;


        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm
          name="first"
          title="脚本配置"
          onFinish={async () => {
            return true;
          }}
        >
          <ProCard
            title="脚本参数配置"
            bordered
            headerBordered
            collapsible
            style={{
              marginBottom: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >



            {/*文章标题*/}
            <ProForm.Group title="文章标题">
              <ProFormText
                rules={[{ required: true, message: '这是必填项' }]}
                width="xl" name="T_Title" />
            </ProForm.Group>
            {/*话术分组*/}
            <ProForm.Group title="文章内容分组">
              <ProFormSelect
                options={options}
                initialValue=""
                width="sm"
                name="comGroupSelect"

                fieldProps={{
                  onSelect:(val: any) => handleSelect(val),
                }}
                request={async () => {
                  const {data} = await searchComments()
                  const res =decrypt(data).split(";")
                  options.length = 0
                  if(res[0] !== ""){

                    for(let i = 0 ;i < res.length;i++){
                      const m = JSON.parse(res[i])

                      options.push({
                        value: m.content,
                        label: m.comGroup + "-" + m.keyWord,
                      })
                    }

                  }

                  return options
                }}
              />

            </ProForm.Group>
            {/*文章内容*/}
            <ProForm.Group title="文章内容">
              <ProFormTextArea
                rules={[{ required: true, message: '这是必填项' }]}
                 width="xl" name="commentArea" />
            </ProForm.Group>
            {/*标签*/}
            <ProForm.Group title="文章标签(一行一个 不要添加#)">
              <ProFormTextArea
                width="xl" name="T_Label" />
            </ProForm.Group>
            {/*图片选择方式*/}
            <ProForm.Group title="上传图片类型">
            <ProFormRadio.Group
              name="imgType"
              initialValue="手动"
              options={[{label:"手动",value:'手动'}, {label:"图库",value:'图库'}]}
              fieldProps={
                {
                  onChange: (value) => {
                    if (value.target.value === "手动") {
                      setImgVisible({display: "none"})
                      setUploadVisible({display: "inline-block"})
                    } else {
                      getImg().then(()=>{
                        setImgVisible({display: "inline"})
                        setUploadVisible({display: "none"})
                      })

                    }

                  }
                }
              }
            />
            </ProForm.Group>
            {/*手动 图片列表*/}
            <UpLoads {...uploadVisible} />
            {/*图库 图片列表*/}
            <ProForm.Group style={imgVisible}  >
              <div
                id="scrollableDiv"
                style={{
                  height: 200,
                  overflow: 'auto',
                  padding: '10px 10px',
                  border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
              >
                <InfiniteScroll
                  dataLength={10}
                  next={loadMoreData}
                  hasMore={false}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                  scrollableTarget="scrollableDiv"
                >
                <CheckCard.Group  style={{ width: 550 }} size="small" multiple={true}>
                  <ImgList count={newArray.length}  img_list={newArray}/>
                </CheckCard.Group>
                </InfiniteScroll>
              </div>
            </ProForm.Group>

            {/*图片链接*/}
            <ProForm.Group  title="图片链接">
              <ProFormTextArea
                width={900}  name="img_urls"/>
            </ProForm.Group>

          </ProCard>


        </StepsForm.StepForm>
        <StepsForm.StepForm name="second" title="选择设备">
          <ProCard
            style={{
              minWidth: 800,
              marginBottom: 16,
              maxWidth: '100%',
            }}
          >

            <ProForm.Group title="选择设备"/>
              <PhoneList phoneArray={phoneArray} newPhoneArray={newPhoneArray} newArray={newArray} />
          </ProCard>
        </StepsForm.StepForm>


        <StepsForm.StepForm name="third" title="任务配置">
          {/*执行模式*/}
          <ProForm.Group title="执行模式">
            <ProFormRadio.Group
              rules={[{required: true, message: ''}]}
              fieldProps={
                {
                  onChange: (value) => {
                    if (value.target.value === "排队") {
                      setTimeVisible({display: "none"})
                    } else {
                      setTimeVisible({display: "inline"})
                    }

                  }
                }
              }
              initialValue={'排队'}
              name="ZxMs"
              options={
                [
                  {

                    label: '排队',
                    value: '排队'
                  },
                  {
                    label: "定时",
                    value: "定时"
                  }
                ]
              }
            />

          </ProForm.Group>
          <ProForm.Group title="开始时间" style={timeVisible}>
            <ProFormDateTimePicker name="time"/>
          </ProForm.Group>
          {/*启动等待*/}
          <ProForm.Group title="启动等待(单位/秒)">
            <ProFormDigit rules={[{required: true, message: ''}]} name="QdDdMin" width="xs" min={1} max={20}
                          initialValue={1}/>-
            <ProFormDigit rules={[{required: true, message: ''}]} name="QdDdMax" width="xs" min={1} max={30}
                          initialValue={3}/>
          </ProForm.Group>
          {/*全局延迟*/}
          <ProForm.Group title="全局延迟(单位/秒)">
            <ProFormDigit rules={[{required: true, message: ''}]} name="QjYcMin" width="xs" min={1} max={20}
                          initialValue={1}/>-
            <ProFormDigit rules={[{required: true, message: ''}]} name="QjYcMax" width="xs" min={1} max={30}
                          initialValue={3}/>
          </ProForm.Group>
          <ProFormText name={"note"} label="任务备注"/>
        </StepsForm.StepForm>
      </StepsForm>


      <Modal title="任务详情" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <table className={"ui_table"}>
          <tbody>

          <tr>
            <td>创建用户</td>
            <td><span>{initialState?.currentUser?.userAccount}</span></td>
          </tr>

          <tr>
            <td>uuid</td>
            <td><span>{initialState?.currentUser?.uuid}</span></td>
          </tr>
          <tr>
            <td>执行模式</td>
            <td><span>{task.ZxMs}</span></td>
          </tr>
          <tr>
            <td>脚本分组</td>
            <td>{task.scriptGroup}</td>
          </tr>
          <tr>
            <td>脚本名称</td>
            <td>{task.scriptName}</td>
          </tr>
          <tr>
            <td>任务备注</td>
            <td>{task.note}</td>
          </tr>
          <tr>
            <td>下发设备数量</td>
            <td>{task.num}</td>
          </tr>
          <tr>
            <td>定时时间</td>
            <td>{task.ZxMs === "排队" ? "排队模式" : task.time}</td>
          </tr>
          <tr>
            <td>创建时间</td>
            <td><span>{task.createTime}</span></td>
          </tr>
          </tbody>
        </table>
      </Modal>

    </>
  );
};

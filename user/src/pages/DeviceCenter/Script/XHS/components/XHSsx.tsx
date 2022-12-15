import {
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit, ProFormInstance, ProFormRadio, ProFormSelect, ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import {message, Modal} from 'antd';
import {addTask, searchComments} from "@/services/ant-design-pro/api";
import {useEffect, useRef, useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import "../../index.less"
import moment from "moment";
import {decrypt} from "@/utils/aes";
import PhoneList from "@/pages/DeviceCenter/Script/components/PhoneList";


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
  const formRef = useRef<ProFormInstance>();



  useEffect(() => {
    ws = props.Ws
  }, [])
  const {initialState} = useModel('@@initialState');
  const {setUseModalVisible, useScriptInfo} = useModel("useScriptModel", (model: any) => ({
    setUseModalVisible: model.setUseModalVisible,
    useScriptInfo: model.useScriptInfo,
  }))


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState({display: "none"});
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
  const handleSelect = (val: string) => {
    formRef?.current?.setFieldsValue({
      commentArea: val,
    });
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
              T_ID: values?.T_ID,
              commentArea:values?.commentArea,
              YcMin:values?.YcMin,
              YcMax:values?.YcMax
            })
          }
          if (ZxMs === "定时") {
            msg = JSON.stringify({
              type: "定时",
              sendTime: sendTime,
              createTime: createTime,
              scriptUrl: useScriptInfo.scriptUrl,
              T_ID: values?.T_ID,
              commentArea:values?.commentArea,
              YcMin:values?.YcMin,
              YcMax:values?.YcMax
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
                  T_ID: values?.T_ID,
                  commentArea:values?.commentArea,
                  YcMin:values?.YcMin,
                  YcMax:values?.YcMax
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
                  T_ID: values?.T_ID,
                  commentArea:values?.commentArea,
                  YcMin:values?.YcMin,
                  YcMax:values?.YcMax
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



            {/*浏览ID*/}
            <ProForm.Group title={"用户ID(一行一条)"}>
              <ProFormTextArea  width="xl" name="T_ID" />
            </ProForm.Group>
            {/*话术分组*/}
            <ProForm.Group title={"私信分组选择"}>
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
            {/*话术内容*/}
            <ProForm.Group title={"私信内容(一行一条)"}>
              <ProFormTextArea tooltip="私信内容" width="xl" name="commentArea" />
            </ProForm.Group>
            {/*随机延迟*/}
            <ProForm.Group title="随机延迟(单位/秒)">
              <ProFormDigit rules={[{required: true, message: ''}]} name="YcMin" width="xs" min={60} max={3600}
                            initialValue={60}/>-
              <ProFormDigit rules={[{required: true, message: ''}]} name="YcMax" width="xs" min={60} max={3600}
                            initialValue={300}/>

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

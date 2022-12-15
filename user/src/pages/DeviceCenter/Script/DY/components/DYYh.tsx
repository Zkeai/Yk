import {
  ProCard,
  ProForm,
  ProFormCheckbox, ProFormDateTimePicker,
  ProFormDigit, ProFormRadio, ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import {message, Modal, Space} from 'antd';
import {addTask} from "@/services/ant-design-pro/api";
import {useEffect, useState} from "react";
import {useModel} from "@@/plugin-model/useModel";
import "../../index.less"
import moment from "moment";
import PhoneList from "@/pages/DeviceCenter/Script/components/PhoneList";


const phoneArray: any = []
const newPhoneArray: any = []
const newArray: any = []
let ws: any;


export default (props: any) => {

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


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <StepsForm
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
              D_DZ: values?.D_DZ,
              D_Gk: values?.D_Gk,
              D_PlDz: values?.D_PlDz,
              D_PlLy: values?.D_PlLy,
              Dz: values?.Dz === undefined ? "" : values?.Dz[0],
              HpMax: values?.HpMax,
              HpMin: values?.HpMin,
              LlDx: values?.LlDx,
              LlFs: values?.LlFs,
              LlMax: values?.LlMax,
              LlMin: values?.LlMin,
              LlScMax: values?.LlScMax,
              LlScMin: values?.LlScMin,
              PlDz: values?.PlDz === undefined ? "" : values?.PlDz[0],
              PlGk: values?.PlGk === undefined ? "" : values?.PlGk[0],
              PlLy: values?.PlLy === undefined ? "" : values?.PlLy[0],
              QdDdMax: values?.QdDdMax,
              QdDdMin: values?.QdDdMin,
              QjYcMax: values?.QjYcMax,
              QjYcMin: values?.QjYcMin,
              SxMax: values?.SxMax,
              SxMin: values?.SxMin,
              T_LyNr: values?.T_LyNr
            })
          }
          if (ZxMs === "定时") {
            msg = JSON.stringify({
              type: "定时",
              sendTime: sendTime,
              createTime: createTime,
              scriptUrl: useScriptInfo.scriptUrl,
              D_DZ: values?.D_DZ,
              D_Gk: values?.D_Gk,
              D_PlDz: values?.D_PlDz,
              D_PlLy: values?.D_PlLy,
              Dz: values?.Dz === undefined ? "" : values?.Dz[0],
              HpMax: values?.HpMax,
              HpMin: values?.HpMin,
              LlDx: values?.LlDx,
              LlFs: values?.LlFs,
              LlMax: values?.LlMax,
              LlMin: values?.LlMin,
              LlScMax: values?.LlScMax,
              LlScMin: values?.LlScMin,
              PlDz: values?.PlDz === undefined ? "" : values?.PlDz[0],
              PlGk: values?.PlGk === undefined ? "" : values?.PlGk[0],
              PlLy: values?.PlLy === undefined ? "" : values?.PlLy[0],
              QdDdMax: values?.QdDdMax,
              QdDdMin: values?.QdDdMin,
              QjYcMax: values?.QjYcMax,
              QjYcMin: values?.QjYcMin,
              SxMax: values?.SxMax,
              SxMin: values?.SxMin,
              T_LyNr: values?.T_LyNr
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
                  D_DZ: values?.D_DZ,
                  D_Gk: values?.D_Gk,
                  D_PlDz: values?.D_PlDz,
                  D_PlLy: values?.D_PlLy,
                  Dz: values?.Dz === undefined ? "" : values?.Dz[0],
                  HpMax: values?.HpMax,
                  HpMin: values?.HpMin,
                  LlDx: values?.LlDx,
                  LlFs: values?.LlFs,
                  LlMax: values?.LlMax,
                  LlMin: values?.LlMin,
                  LlScMax: values?.LlScMax,
                  LlScMin: values?.LlScMin,
                  PlDz: values?.PlDz === undefined ? "" : values?.PlDz[0],
                  PlGk: values?.PlGk === undefined ? "" : values?.PlGk[0],
                  PlLy: values?.PlLy === undefined ? "" : values?.PlLy[0],
                  QdDdMax: values?.QdDdMax,
                  QdDdMin: values?.QdDdMin,
                  QjYcMax: values?.QjYcMax,
                  QjYcMin: values?.QjYcMin,
                  SxMax: values?.SxMax,
                  SxMin: values?.SxMin,
                  T_LyNr: values?.T_LyNr
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
                  D_DZ: values?.D_DZ,
                  D_Gk: values?.D_Gk,
                  D_PlDz: values?.D_PlDz,
                  D_PlLy: values?.D_PlLy,
                  Dz: values?.Dz === undefined ? "" : values?.Dz[0],
                  HpMax: values?.HpMax,
                  HpMin: values?.HpMin,
                  LlDx: values?.LlDx,
                  LlFs: values?.LlFs,
                  LlMax: values?.LlMax,
                  LlMin: values?.LlMin,
                  LlScMax: values?.LlScMax,
                  LlScMin: values?.LlScMin,
                  PlDz: values?.PlDz === undefined ? "" : values?.PlDz[0],
                  PlGk: values?.PlGk === undefined ? "" : values?.PlGk[0],
                  PlLy: values?.PlLy === undefined ? "" : values?.PlLy[0],
                  QdDdMax: values?.QdDdMax,
                  QdDdMin: values?.QdDdMin,
                  QjYcMax: values?.QjYcMax,
                  QjYcMin: values?.QjYcMin,
                  SxMax: values?.SxMax,
                  SxMin: values?.SxMin,
                  T_LyNr: values?.T_LyNr
                },
                array: devices.split(",")
              })
              console.log(ws)
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
            {/*浏览总量*/}
            <ProForm.Group title="浏览总量">
              <ProFormDigit name="LlMin" width="xs" min={0} max={500} initialValue={100}/>-
              <ProFormDigit name="LlMax" width="xs" min={0} max={500} initialValue={200}/>
            </ProForm.Group>
            {/*浏览对象*/}
            <Space size={245}>
              <ProForm.Group title="浏览对象">
                <ProFormRadio.Group
                  initialValue={"推荐"}
                  name="LlDx"
                  options={
                    [
                      {
                        label: '推荐',
                        value: '推荐'
                      },
                      {
                        label: "关注",
                        value: "关注"
                      }
                    ]
                  }
                />

              </ProForm.Group>
              {/*浏览方式*/}
              <ProForm.Group title="浏览方式">
                <ProFormRadio.Group
                  initialValue={"随机滑屏"}
                  name="LlFs"
                  options={
                    [
                      {
                        label: '随机滑屏',
                        value: '随机滑屏'
                      },
                      {
                        label: "强制刷新",
                        value: "强制刷新"
                      }
                    ]
                  }
                />

              </ProForm.Group>
            </Space>
            <Space size={100}>
              {/*随机滑屏*/}
              <ProForm.Group title="随机滑屏(单位/次)" tooltip="跳跃式浏览">
                <ProFormDigit name="HpMin" width="xs" min={0} max={20} initialValue={1}/>-
                <ProFormDigit name="HpMax" width="xs" min={1} max={20} initialValue={3}/>
              </ProForm.Group>
              {/*刷新延时*/}
              <ProForm.Group title="刷新延时(单位/秒)">
                <ProFormDigit name="SxMin" width="xs" min={0} max={20} initialValue={2}/>-
                <ProFormDigit name="SxMax" width="xs" min={1} max={20} initialValue={5}/>
              </ProForm.Group>
            </Space>
            {/*浏览时长*/}
            <ProForm.Group title="浏览时长(单位/秒)">
              <ProFormDigit name="LlScMin" width="xs" min={10} max={20} initialValue={15}/>-
              <ProFormDigit name="LlScMax" width="xs" min={10} max={100} initialValue={30}/>
            </ProForm.Group>
            {/*点赞 看评论 */}

            <ProForm.Group title="点赞 看评论">
              {/*点赞*/}
              <ProFormCheckbox.Group label="点赞" name="Dz" options={['点赞']}/>
              <ProFormDigit label="概率(%)" name="D_DZ" width="xs" min={0} max={100} initialValue={5}/>
              {/*看评论*/}
              <ProFormCheckbox.Group label="评论观看" name="PlGk" options={['观看']}/>
              <ProFormDigit label="概率(%)" name="D_Gk" width="xs" min={0} max={100} initialValue={20}/>

            </ProForm.Group>


            {/*评论点赞 留言*/}
            <Space>
              <ProForm.Group title="评论点赞 留言">
                {/*评论点赞*/}
                <ProFormCheckbox.Group label="评论点赞" name="PlDz" options={['点赞']}/>
                <ProFormDigit label="概率(%)" name="D_PlDz" width="xs" min={0} max={100} initialValue={10}/>
                {/*留言*/}
                <ProFormCheckbox.Group label="评论留言" name="PlLy" options={['留言']}/>
                <ProFormDigit label="概率(%)" name="D_PlLy" width="xs" min={0} max={100} initialValue={5}/>
              </ProForm.Group>

            </Space>
            {/*留言内容*/}
            <ProForm.Group>
              <ProFormTextArea tooltip="优先随机选取下面的内容,没有则随机发送表情" width="xl" name="T_LyNr" label="留言内容(一行一条)"/>
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

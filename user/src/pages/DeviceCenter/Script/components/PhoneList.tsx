import {ProFormTreeSelect} from "@ant-design/pro-components";
import {searchDevicesList} from "@/services/ant-design-pro/api";
import {decrypt} from "@/utils/aes";
import moment from "moment";
import {Tag} from "antd";


const phoneList = [
  {
    title: 'Node1',
    value: '0-0',
    selectable: false,
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        treeIcon: true,

      },
    ],
  },
]

const PhoneList = (props: any) => {
let {phoneArray,newPhoneArray} = props
  const {newArray} =props
  return (
    <div>
      <ProFormTreeSelect
        rules={[{required: true, message: '必选'}]}
        name="selectPhone"
        placeholder="请选择设备"
        allowClear
        width={800}
        secondary
        request={async () => {
          const {data} = await searchDevicesList()
          phoneArray.length = 0
          newArray.length = 0
          const res = decrypt(data).split(";")
          if (res[0] !== "") {
            for (let i = 0; i < res.length; i++) {
              const m = JSON.parse(res[i])
              if (m.deviceGroup === "" || m.deviceGroup === null || m.deviceGroup === undefined) {
                m.deviceGroup = "默认分组"
              }

              phoneArray.push(m.deviceGroup)
              newArray.push({
                index: i + 1,
                id: m.id,
                remark: m.remark,
                deviceName: m.deviceName,
                deviceModel: m.deviceModel,
                deviceGroup: m.deviceGroup,
                status: m.status,
                createTime: moment(m.createTime).format("YYYY-MM-DD HH:mm:ss"),
              })
            }
          }
          phoneArray = phoneArray.sort()
          newPhoneArray = [...new Set(phoneArray)]
          phoneList.length = 0
          newPhoneArray.forEach((groupName: string) => {
            const array: any = []
            newArray.map((m: any) => {
              const title = m.remark
              const value_ = m.deviceModel
              if (m.deviceGroup === groupName) {
                array.push(
                  {
                    title: m.status === 0
                      ?
                      <Tag color={"#009688"} >
                        { "[在线]" + title}
                      </Tag>
                      :
                      <Tag color={"red"} >
                        { "[离线]" + title}
                      </Tag>
                    ,
                    value: value_,

                  }
                )

              }
            })
            phoneList.push({
              selectable: false,
              title: groupName,
              value: groupName,
              children: array
            })
          })

          return phoneList
        }}
        // tree-select args
        fieldProps={{

          showArrow: false,
          filterTreeNode: true,
          showSearch: true,
          dropdownMatchSelectWidth: false,
          labelInValue: false,
          autoClearSearchValue: true,
          multiple: true,
          treeNodeFilterProp: 'title',
          fieldNames: {
            label: 'title',
          },
        }}
      />
    </div>
  )
}


export default PhoneList;


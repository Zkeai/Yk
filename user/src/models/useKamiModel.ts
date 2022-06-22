import { useState, useCallback } from 'react'

export default function useKamiModel() {

  /**
   * 卡密store
   */
  const [kamiValue,setKamiValue] =useState([])
  const changeKamiValue = useCallback((temp) => {
    setKamiValue(temp)
  },[])

  /**
   * 应用列表store
   */
  const [softwareList,setSoftwareList] = useState()
  const saveSoftware = useCallback((temp) => {
    setSoftwareList(temp)
  },[])

  /**
   * 卡密时长类型列表store
   */
  const [typeList,setTypeList] = useState()
  const saveType = useCallback((temp) => {
    setTypeList(temp)
  },[])

  return {
    kamiValue,
    changeKamiValue,
    softwareList,
    saveSoftware,
    typeList,
    saveType
  }
}

import { useState, useCallback } from 'react'

export default function useScriptModel() {
  const [useModalVisible, setIsModalVisible] = useState(false)
  const [useScriptInfo, setScriptInfo] = useState()



  const setUseModalVisible =useCallback((temp)=>{
    setIsModalVisible(temp)
  },[])



  const setUseScriptInfo=useCallback((temp)=>{
    setScriptInfo(temp)
  },[])

  return {
    useModalVisible,
    setUseModalVisible,
    useScriptInfo,
    setUseScriptInfo
  }
}

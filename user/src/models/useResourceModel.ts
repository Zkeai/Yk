import { useState, useCallback } from 'react'

export default function useResourceModel() {
  /**
   * 关键词分组store
   */
  const [keyGroupList,setKeyGroupList] = useState()
  const saveKeyGroup = useCallback((temp) => {
    setKeyGroupList(temp)
  },[])

  return {

    keyGroupList,
    saveKeyGroup,

  }
}

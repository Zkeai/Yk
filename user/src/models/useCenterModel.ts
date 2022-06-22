import { useState, useCallback } from 'react'

export default function useCenterModel() {
  const [key, setKey] = useState('1')

  const changeTab =useCallback((temp)=>{
    setKey(temp)
  },[])

  return {
    key,
    changeTab,
  }
}

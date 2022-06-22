import { useState, useCallback } from 'react'

export default function useManageModel() {
  type propsType ={
    ticketID: number
  }
  const props: propsType={
    ticketID: 0
  }
  const [visible, setVisible] = useState(false)
  const [value,setValue] =useState(props)


  const changeVisible=useCallback((temp: boolean)=>{
    setVisible(temp)
  },[])

  const changeValue = useCallback((temp: propsType) => {
    setValue(temp)
  },[])

  return {
    visible,
    changeVisible,
    value,
    changeValue
  }
}

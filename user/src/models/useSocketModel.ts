import { useState, useCallback } from 'react'

export default function useSocketModel() {
  const [IntervalId, setIntervalId] = useState(0)

  const ChangeIntervalId =useCallback((temp)=>{
    setIntervalId(temp)
  },[IntervalId])

  return {
    IntervalId,
    ChangeIntervalId,
  }
}

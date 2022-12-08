import { useState, useCallback } from 'react'

export default function useXhsModel() {
  /**
   * XHS发布文章 设置图片链接store
   */
  const [imgRef,setImgUrl] = useState()
  const saveImgUrl = useCallback((temp) => {
    setImgUrl(temp)
  },[])

  return {

    imgRef,
    saveImgUrl,

  }
}

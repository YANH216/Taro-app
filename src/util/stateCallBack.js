import { useState, useRef, useEffect } from 'react'

const useStateCallBack = (state) => {
  const cbRef = useRef()
  const [data, setData] = useState(state)

  useEffect(() => {
    cbRef.current && cbRef.current(data)
  }, [data])

  return [data, function (val, callBack) {
    cbRef.current = callBack
    setData(val)
  }]
}

export { useStateCallBack }
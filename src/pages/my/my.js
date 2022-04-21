import { View } from '@tarojs/components'
import { useReady } from '@tarojs/taro'
import { useState } from 'react'

function My () {  
  const [msg, setMsg] = useState('page my')

  useReady(() => {
    console.log('onReady(useReady)'); 
  })
  
  return (
    <View>{ msg }</View>
  )
}

export default My
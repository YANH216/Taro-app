import { View } from '@tarojs/components'
import { useReady } from '@tarojs/taro'
import { useState } from 'react'

function Cart () {  
  const [msg, setMsg] = useState('page cart')

  useReady(() => {
    console.log('onReady(useReady)'); 
  })
  
  return (
    <View>{ msg }</View>
  )
}

export default Cart
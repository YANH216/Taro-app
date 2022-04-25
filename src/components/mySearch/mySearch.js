import { 
  View,
  Icon,
  Text,
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  useReady,
} from '@tarojs/taro'
import './style/mySearch.scss'

function MySearch () {

  const gotoSearch = () => {
    Taro.navigateTo({
      url: '/pages/subpackages/search/search'
    })
  }

  useReady(() => {

  })
  
  return (
    <View className='my-search-container'>
      <View 
        className='my-search-box'
        onClick={gotoSearch}
      >
        <Icon type='search' size='15'/>
        <Text className='placeholder'>搜索</Text>
      </View>
    </View>
  )
}

export default MySearch
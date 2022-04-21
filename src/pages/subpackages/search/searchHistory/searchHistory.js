import { 
  View,
  Text,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import './searchHistory.scss'

function SearchHistory ({searchHistory, setSearchHistory}) {
  const clear = () => {
    setSearchHistory([])
    Taro.removeStorageSync('keyWord')
  }

  const gotoGoodsList = (keyWord) => {
    Taro.navigateTo({
      url: `../../subpackages/goods_list/goods_list?kw=${keyWord}`
    })
  }

  useReady(() => {

  })
  
  return (
    <View className='history-box'>
      {/* 标题区域 */}
      <View className='history-title'>
        <Text>搜索历史</Text>
      </View>
      {/* 列表区域 */}
      <View className='history-list'>
        {
          (searchHistory || []).map((item) => {
            return (
              <View 
                className='search-history-text'  
                onClick={() => gotoGoodsList(item)}
              >
                <Text>{item}</Text>
              </View>
            )
          })
        }
      </View>
      {/* 清空搜索历史 */}
      {
        // 没有历史，不渲染清空历史元素
        (searchHistory || []).length === 0 
        ? ''
        : <View className='history-clear' onClick={clear}>清空搜索历史</View>
      }
    </View>
  )
}

export default SearchHistory
import { 
  View,
  Text,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import './searchResults.scss'

function SearchResults ({searchResults}) { 

  const gotoDetail = (id) => {
    Taro.navigateTo({
      url: `../goods_detail/goods_detail?goods_id=${id}`
    })
  }

  useReady(() => {

  })
  
  return (
    <View className='sugg-list'>
      {
        (searchResults || []).map((item) => {
          return (
            <View 
              className='sugg-item' 
              onClick={() => gotoDetail(item.goods_id)}
            >
              <View className='goods-name'>
                {item.goods_name}
              </View>
              <Text>{'>'}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

export default SearchResults
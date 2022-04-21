import { View, Image } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { memo } from 'react'
import './my_goodsList.scss'

function MyGoodsList ({goodsList}) {
  console.log(goodsList);

  // 将数字保留两位小数
  const toFix = (num) => {
    return Number(num).toFixed(2)
  }

  const gotoDetail = (id) => {
    Taro.navigateTo({
      url: `../goods_detail/goods_detail?goods_id=${id}`
    })
  }

  useReady(() => {
  })
  
  return (
    <>
      {
        (goodsList || []).map((item) => {
          return (
            <View className='goods-item' onClick={() => gotoDetail(item.goods_id)}>
              {/* 左侧盒子 */}
              <View className='goods-item-left'>
                <Image
                  className='goods-img'
                  src={item.goods_small_logo}
                />
              </View>
              {/* 右侧盒子 */}
              <View className='goods-item-right'>
                <View className='goods-name'>
                  {item.goods_name}
                </View>
                <View className='goods-info'>
                  <View className='goods-info-price'>
                    ￥{toFix(item.goods_price)}
                  </View>
                </View>
              </View>
            </View>
          )
        })
      }
    </>
  )
}

export default memo(MyGoodsList)
import { 
  View, 
  Image, 
  Radio,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { memo } from 'react'
import { updateGoodsState } from '../../redux/feature/cartListSlice'
import { useDispatch } from 'react-redux';
import Numberbox from '../numberBox/numberbox';
import './style/my_goodsList.scss'
import notFoundImg from './resource/notFound.png'

function MyGoodsList (props) {
  const { goods_id, goods_name, goods_price, goods_small_logo, goods_state, goods_count } = props.goods
  // 将数字保留两位小数
  const toFix = (num) => {
    return Number(num).toFixed(2)
  }

  const gotoDetail = (id) => {
    let url = `../subpackages/goods_detail/goods_detail?goods_id=${id}`
    if (!props.showRadio) {
      url = `../goods_detail/goods_detail?goods_id=${id}`
    }
    Taro.navigateTo({
      url: url
    })
  }

  const dispatch = useDispatch()
  const changeChecked = (goods_id) => {
    dispatch(updateGoodsState(goods_id))
    return false
  }

  useReady(() => {
  })
  
  return (
    <>
      <View className='goods-item'>
        {/* 复选框 */}
        {
            props.showRadio  // 父组件传递过来的参数，有传参数则显示，没传 则不显示
            ? <Radio 
                checked={goods_state} 
                color='red'
                // 传递goods_id 
                onClick={() => changeChecked(goods_id)}
              >
              </Radio>
            : '' 
          }
        <View className='goods-item-container' onClick={() => gotoDetail(goods_id)}>
          {/* 左侧盒子 */}
          <View className='goods-item-left'>
            {/* 图片 */}
            <Image
              className='goods-img'
              src={goods_small_logo || notFoundImg}
            />
          </View>
          {/* 右侧盒子 */}
          <View className='goods-item-right'>
            <View className='goods-name'>
              {goods_name}
            </View>
            <View className='goods-info'>
              <View className='goods-info-price'>
                ￥{toFix(goods_price)}
              </View>
              {
                // 父组件传递的showNumberBox 决定是否展示该组件
                props.showNumberBox
                ? <Numberbox 
                    goods_count={goods_count} 
                    goods_id={goods_id}
                  />
                : ''
              }
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default memo(MyGoodsList)
import { 
  View,
  Text,
  Image,
} from '@tarojs/components'
import { useEffect } from 'react';
import Taro, { useReady, useDidShow } from '@tarojs/taro'
import { 
  deleteGoodsInCart, 
  getCheckedCount, 
  selectCartList, 
  getTotal,
  getTotalPrice,
} from '../../redux/feature/cartListSlice';
import MyGoodsList from '../../components/my_goodsList/my_goodsList';
import Settle from '../../components/settle/settle'
import { mixin } from '../../mixins/tabbarBadge'
import MyAddress from '../../components/myAddress/myAddress';
import { useDispatch, useSelector } from 'react-redux';
import cartImg from './resource/cart.png'
import '../../resource/iconfont/iconfont.css'
import './style/cart.scss'

function Cart () {
  // 获取redux 中的值
  const cartList = useSelector(selectCartList)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCheckedCount())
    dispatch(getTotal())
    dispatch(getTotalPrice())
  }, [cartList])

  useDidShow(() => {
    mixin(cartList, dispatch)
  })

  useReady(() => {
  })
  
  const deleteGoods = () => {
    Taro.showModal({
      title: '提示',
      content: '确定删除该商品吗?',
      success: (res) => {
        if (res.confirm) {
          dispatch(deleteGoodsInCart())
        } else if (res.cancel) {
          return 
        }
      }
    })
  }

  // 购物车页面
  const cart = (
    <>
      <MyAddress />
      <View className='cart-header'>
        <View className='cart-title'>
          <Text className='iconfont icon-shop'></Text>
          <Text className='cart-title-text'>购物车</Text>
        </View>
        <View 
          className='cart-manage'
          onClick={deleteGoods}
        >
          删除
        </View>
      </View>
      <View className=''>
        {
          (cartList || []).map(goods => {
            return <MyGoodsList goods={goods} showRadio showNumberBox></MyGoodsList>
          })
        }
      </View>
      <Settle></Settle>
    </>
  )

  const emptyCart = (
    <View className='empty-cart'>
      <Image className='img' src={cartImg}/>
      <Text className='text'>空空如也~~~</Text>
    </View>
  )
  
  return (
    <View className='cart-container'>
      {
        !cartList.length ? emptyCart : cart
      }
    </View>
  )
}

export default Cart
import { 
  View, 
  Button,
  Image,
} from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
// import { useEffect, useState, memo } from 'react'  // 第一想法
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import store from '../../redux/store/store'  // 第一想法
import { addToCart } from '../../redux/feature/cartListSlice'
import './goodsNav.scss'
import { selectTotal } from '../../redux/feature/totalSlice'


function GoodsNav ({goodsDetail}) {  
  // 从goods_detail组件中传递过来的商品信息数据中，解构出所需的数据
  const { goods_id, goods_name, goods_price, goods_small_logo } = goodsDetail

  // 从redux中获取total值
  const total = useSelector(selectTotal)


  // 第一想法
  // const [total, setTotal] = useState(0)

  // 组织要添加到redux中购物车的商品信息对象
  const goods = {
    goods_id: goods_id,                   // 商品ID
    goods_name: goods_name,               // 商品名称
    goods_price: goods_price,             // 商品价格
    goods_count: 1,                       // 商品数量
    goods_small_logo: goods_small_logo,   // 商品图片
    goods_state: true                     // 商品勾选状态
  }

  const dispatch = useDispatch()

  const gotoCart = () => {
    Taro.switchTab({
      url: '../../cart/cart'
    })
  }


  // 第一想法
  // redux：不要同时在一个页面dispatch和select同一个redux中的数据
  /* const getCartTotal = (initSum) => {
    let sum = initSum
    cartList.forEach(item => sum += item.goods_count)
    setTotal(sum)
  }
  
  const handleChange = () => {
    // 当购物车中商品数量为0时， dispatch addToCart，可能是因为会保存dipatch之前的快照，所以导致比状态慢一步
    getCartTotal(0)
  }
   
  useEffect(() => {
    getCartTotal(0)
    const unsubscribe = store.subscribe(handleChange)
    return () => {
      unsubscribe()
    }
  })
 */

  useReady(() => {
    console.log('onReady(useReady)'); 
  })
  
  return (
    <View className='goods-nav-container'>
      <View className='shop'>
        <View className='shop-icon'>
        </View>
        <View className='shop-title'>店铺</View>
      </View>
      <View className='cart'>
        <View className='cart-icon'></View>
        {
          total 
          ? <View className='cart-sign'>{ total }</View>
          : ''
        }
        <View 
          className='cart-title'
          onClick={gotoCart}
        >购物车</View>
      </View>
      <View className='btn-group'>
        <Button 
          className='btn-add-cart'
          onClick={() => dispatch(addToCart(goods))}
        >加入购物车</Button>
        <Button className='btn-buy'>购买</Button>
      </View>
    </View>
  )
}

export default memo(GoodsNav)
import { createSlice } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";

const initialState = {
  value: JSON.parse(Taro.getStorageSync('cart') || '[]')
}

const cartListSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { goods_id } = action.payload
      const findResults = state.value.find(item => item.goods_id === goods_id)
      if (!findResults) { // 购物车中没有这件商品，添加这件商品
        state.value.push(action.payload)
      } else {  // 有这件商品，该商品数量加一
        findResults.goods_count++
      }
      Taro.setStorageSync('cart', JSON.stringify(state.value))
    },
  }
})

export const { addToCart } = cartListSlice.actions

export const selectCartList = state => state.cartList.value

export default cartListSlice.reducer
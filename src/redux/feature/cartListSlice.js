import { createSlice } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";
import _showToast from "../../util/_showToast";

const initialState = {
  value: JSON.parse(Taro.getStorageSync('cart') || '[]'),
  total: 0,
  checkedTotal: 0,
  totalPrice: 0
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
      } else if (findResults.goods_count == 9) {  // 有这件商品，该商品数量加一
        _showToast('商品已达购买上限  9件')
      } else {
        findResults.goods_count++
      }
      Taro.setStorageSync('cart', JSON.stringify(state.value))
    },
    getTotal(state) {
      state.total = state.value.reduce((index, item) => index += item.goods_count, 0)
    },
    updateGoodsState(state, action) {
      const goods_id = action.payload
      state.value.forEach(item => {
        return (
          // 如果goods_id相等  goods_state取反
          item.goods_id === goods_id && (item.goods_state = !item.goods_state)
        )
      })
      Taro.setStorageSync('cart', JSON.stringify(state.value))
    },
    updateAllGoodsState(state, action) {
      state.value.map(item => {
        return (
          // 将所有商品状态更新为传递过来的值(true或false)
          item.goods_state = action.payload
        )
      })
      Taro.setStorageSync('cart', JSON.stringify(state.value))
    },
    updateGoodsCount(state, action) {
      const {goods_id, type} = action.payload
      state.value.forEach(item => {
        if (type === '+') {
          return item.goods_id === goods_id && (item.goods_count += 1)
        } else {
          return item.goods_id === goods_id && (item.goods_count -= 1)
        }
      })
      Taro.setStorageSync('cart', JSON.stringify(state.value))
    },
    deleteGoodsInCart(state) {
      state.value = state.value.filter(item => {
        return item.goods_state === false
      })
      Taro.setStorageSync('cart', JSON.stringify(state.value))
    },
    getCheckedCount(state) {
      state.checkedTotal = state.value.filter(item => item.goods_state).reduce((index, item) => index += item.goods_count, 0)
    },
    getTotalPrice(state) {
      state.totalPrice = state.value.filter(item => item.goods_state).reduce((index, item) => index += (item.goods_price * item.goods_count), 0).toFixed(2)
    }
  }
})

export const { 
  addToCart, 
  getTotal, 
  updateGoodsState, 
  updateGoodsCount, 
  deleteGoodsInCart, 
  getCheckedCount, 
  updateAllGoodsState,
  getTotalPrice,
} = cartListSlice.actions

export const selectCartList = state => state.cartList.value

export const selectCartListTotal = state => state.cartList.total

export const selectCheckedTotal = state => state.cartList.checkedTotal

export const selectTotalPrice = state => state.cartList.totalPrice

export default cartListSlice.reducer
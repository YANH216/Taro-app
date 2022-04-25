import { saveTotal } from "../redux/feature/totalSlice"
import Taro from "@tarojs/taro";

export const mixin = (cartList, dispatch) => {
  let total = 0
  cartList.forEach((item) => {
    return total += item.goods_count
  })
  if (total) {
    Taro.setTabBarBadge({
      index: 2,
      // 只能是字符串，redux中是数字，转换成字符串
      text: total + ''
    }).catch(err=> err)
  } else {
    Taro.removeTabBarBadge({
      index: 2
    })
  }
  dispatch(saveTotal(total))
}
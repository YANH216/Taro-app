import { 
  View,
  Radio,
  Text,
} from "@tarojs/components"
import { memo, useEffect } from "react"
import Taro from "@tarojs/taro"
import { useSelector, useDispatch } from "react-redux"
import { 
  selectCheckedTotal, 
  selectCartListTotal, 
  updateAllGoodsState,
  selectTotalPrice,
} from "../../redux/feature/cartListSlice"
import './style/settle.scss'

const Settle = () => {
  const dispatch = useDispatch()

  const checkedTotal = useSelector(selectCheckedTotal)
  const total = useSelector(selectCartListTotal)
  const totalPrice = useSelector(selectTotalPrice)
  // 判断是否全选
  const isFullCheck = (checkedTotal === total)

  console.log(checkedTotal, total);
  const changeAllCheck = () => {
    dispatch(updateAllGoodsState(!isFullCheck))
  }

  useEffect(() => {
    Taro.setTabBarBadge({
      index: 2,
      text: total + ''
    }).catch(err => err)
  }, [total])
  return (
    <View className="settle-container">
      {/* 全选 */}
      <Radio 
        className="settle-radio"
        color='red'
        checked={isFullCheck}
        onClick={changeAllCheck}
      >
        全选
      </Radio>
      {/* 合计 */}
      <View className="settle-amount-box">
        合计:<Text className="amount">￥{totalPrice}</Text>
      </View>
      {/* 结算按钮 */}
      <View className="settle-btn">结算({checkedTotal})</View>
    </View>
  )
}


export default memo(Settle)
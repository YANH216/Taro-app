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
import { selectAddress } from "../../redux/feature/addressSlice"
import { selectToken } from "../../redux/feature/userSlice"
import _showToast from "../../util/_showToast"
import './style/settle.scss'

const Settle = () => {
  const dispatch = useDispatch()

  const checkedTotal = useSelector(selectCheckedTotal)
  const total = useSelector(selectCartListTotal)
  const totalPrice = useSelector(selectTotalPrice)
  const address = useSelector(selectAddress)
  const token = useSelector(selectToken)
  // 判断是否全选
  const isFullCheck = (checkedTotal === total)

  const changeAllCheck = () => {
    dispatch(updateAllGoodsState(!isFullCheck))
  }

  const settlement = () => {
    // 是否勾选了商品
    if (!checkedTotal) return _showToast('请选择要结算的商品!')
    // 是否选择了收货地址
    if (!address) return _showToast('请选择收货地址!')
    // 是否已经登录
    if (!token) return _showToast('请先登录!')
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
      <View 
        className="settle-btn"
        onClick={settlement}
      >结算({checkedTotal})</View>
    </View>
  )
}


export default memo(Settle)
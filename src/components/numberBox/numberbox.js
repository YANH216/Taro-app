import { 
  View,
  Text,
  Button
} from "@tarojs/components"
import { updateGoodsCount } from "../../redux/feature/cartListSlice"
import { useDispatch } from "react-redux"
import _showToast from "../../util/_showToast"
import './style/numberBox.scss'

export default function Numberbox({ goods_count, goods_id }) {
  const dispatch = useDispatch()
  const clickHandler = (e, type) => {
    e.stopPropagation()
    if (type === '+' && goods_count < 9) {
      dispatch(updateGoodsCount({
        goods_id, 
        type: '+'
      }))
    } else if (type === '-' && goods_count > 1) {
      dispatch(updateGoodsCount({
        goods_id, 
        type: '-'
      }))
    } else if (type === '+' && goods_count == 9) {
      _showToast('商品最多添加9件')
    } else if (type === '-' && goods_count == 1) {
      _showToast('商品件数不能为0')
    } else {
      return 
    }
    
  }
  return (
    <View className="number-box">
      <View
        className="btn-left"
        onClick={(e) => clickHandler(e, '-')}
      >
        <Text className="btn-text">-</Text>
      </View>
      <Text className="text">{goods_count}</Text>
      <View 
        className="btn-right"
        onClick={(e) => clickHandler(e, '+')}
      >
        <Text className="btn-text">+</Text>
      </View>
    </View>
  )
}

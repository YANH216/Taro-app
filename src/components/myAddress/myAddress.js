import { 
  View,
  Image,
  Button,
  Text,
} from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useEffect } from "react"
import { saveAddress } from "../../redux/feature/addressSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectAddress } from "../../redux/feature/addressSlice"
import { saveToStoage, getFromStorage } from './../../util/storage';
import borderImg from './resource/cart_border@2x.png'
import './resource/icon/iconfont.css'
import './style/myAddress.scss'

export default function MyAddress() {

  const address = useSelector(selectAddress)

  const { userName, cityName, countyName, detailInfo, telNumber, provinceName } = address

  const dispatch = useDispatch()

  useEffect(() => {
    const address = getFromStorage('address') || {}
    dispatch(saveAddress(address))
  }, [])

  const clickHandler = async () => {
    // 调用小程序的chooseAddress方法,catch失败信息
    const res = await Taro.chooseAddress().catch(err => err)
    // 用户成功选择收货地址
    if (res.errMsg === 'chooseAddress:ok') {
      dispatch(saveAddress(res))
      saveToStoage('address', res)
    }
  }

  const address_choose_box = (
    <View className="address-choose-box">
      <Button
        className="address-choose-btn"
        type="primary" 
        size="mini"
        onClick={clickHandler}
      >
        请选择收货地址 +
      </Button>
    </View>
  )

  const address_info_box = (
    <View 
      className="address-info-box"
      onClick={clickHandler}
    >
      <View className="address-row1">
        <View className="address-row1-left">
          <View className="username">
            收货人:&nbsp;&nbsp;
            <Text>
              {userName}
            </Text>
          </View>
        </View>
        <View className="address-row1-right">
          <View className="phone">
            电话:&nbsp;&nbsp;
            <Text>
              {telNumber}
            </Text>
          </View>
          <Text className="iconfont icon-arrow-right"></Text>
        </View>
      </View>
      <View className="address-row2">
        <View className="address-row2-left">收货地址:</View>
        <View className="address-row2-right">
          {(provinceName || '')+cityName+countyName+detailInfo}
        </View>
      </View>
    </View>
  )
  return (
    <>
      {
        userName
        ? address_info_box
        : address_choose_box
      }
      {/* 底部边框图片 */}
      <Image
        className="border-img"
        src={borderImg}
      />
    </>
  )
}

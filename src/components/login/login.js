import { 
  Button,
  View,
} from "@tarojs/components"
import Taro from '@tarojs/taro';
import _showToast from "../../util/_showToast"
import { useDispatch } from "react-redux"
import { updateUserInfo } from "../../redux/feature/userSlice"
import common from "../../httpCommon/common";
import './style/login.scss'
import './resource/icon/iconfont.css'

export default function Login() {
  const dispatch = useDispatch()

  // 获取token
  const getToken = async (info) => {
    const res = await Taro.login().catch(err => err)
    if (res.errMsg !== 'login:ok') return _showToast('登录失败!')

    // 准备参数对象
    const query = {
      code: res.code,
      encryptedData: info.encryptedData,
      iv: info.iv,
      rawData: info.rawData,
      signature: info.signature
    }
    console.log(query);

    // 调用获取token的api
    const loginRes = await common.getToken({ query })
    console.log(loginRes);
    if (loginRes.meta.status !== 200) return _showToast('登录失败!')

    _showToast('登录成功!')
  }
  // 获取用户基本信息
  const getUserInfo = (e) => {
    if (!e.detail.errMsg === 'getUserInfo:ok') return _showToast('已取消登录')

    dispatch(updateUserInfo(e.detail.userInfo))

    getToken(e.detail)
  }
  return (
    <View className="login-container">
      {/* 提示登录的图标 */}
      <View className="iconfont icon-touxiang"></View>
      {/* 登录按钮 */}
      <Button 
        type="warn" 
        className="login-btn"
        openType="getUserInfo"
        onGetUserInfo={getUserInfo}
      >一键登录</Button>
      {/* 登录提示 */}
      <View className="login-tip">登录</View>
    </View>
  )
}

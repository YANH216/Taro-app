import Taro from "@tarojs/taro"


const _showToast = (title = '数据请求失败!', duration = 1500) => {
  Taro.showToast({
    title,
    duration,
    icon: 'none'
  })
}

export default _showToast
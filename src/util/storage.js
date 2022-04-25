import Taro from "@tarojs/taro";

export const saveToStoage = (key, data) => {
  Taro.setStorageSync(key, JSON.stringify(data))
}

export const getFromStorage = (key) => {
  return JSON.parse(Taro.getStorageSync(key) || '{}')
}
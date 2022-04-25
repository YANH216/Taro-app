import { createSlice } from "@reduxjs/toolkit";
import Taro from "@tarojs/taro";

const initialState = {
  token: '',
  userInfo: JSON.parse(Taro.getStorageSync('userInfo') || '{}')
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      state.userInfo = action.payload
      Taro.setStorageSync('userInfo', JSON.stringify(action.payload))
    }
  }
})

export const { updateUserInfo } = userSlice.actions

export const selectToken = state => state.user.token

export default userSlice.reducer


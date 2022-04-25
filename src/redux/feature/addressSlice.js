import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveAddress(state, action) {
      state.value = action.payload
    }
  }
})

export const { saveAddress } = addressSlice.actions

export const selectAddress = state => state.address.value

export default addressSlice.reducer
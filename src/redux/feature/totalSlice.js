import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0
}


const totalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    saveTotal(state, action) {
      state.value = action.payload
    }
  }
})

export const { saveTotal } = totalSlice.actions

export const selectTotal = state => state.total.value

export default totalSlice.reducer
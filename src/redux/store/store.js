import { configureStore } from "@reduxjs/toolkit";
import cartListReducer from '../feature/cartListSlice'
import totalReducer from '../feature/totalSlice'

export default configureStore({
  reducer: {
    cartList: cartListReducer,
    total: totalReducer
  }
})
import { configureStore } from "@reduxjs/toolkit";
import cartListReducer from '../feature/cartListSlice'
import totalReducer from '../feature/totalSlice'
import addressReducer from '../feature/addressSlice'
import userSlice from "../feature/userSlice";

export default configureStore({
  reducer: {
    cartList: cartListReducer,
    total: totalReducer,
    address: addressReducer,
    user: userSlice
  }
})
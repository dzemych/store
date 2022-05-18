import {configureStore} from "@reduxjs/toolkit";
import appReducer from './app/appReducer'
import productReducer from "./product/productReducer"
import userReducer from './user/userReducer'


const store = configureStore({
   reducer: {
      app: appReducer,
      product: productReducer,
      user: userReducer
   }
})


export default store
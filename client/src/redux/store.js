import {configureStore} from "@reduxjs/toolkit";
import appReducer from './app/appReducer'
import productReducer from "./product/productReducer";


const store = configureStore({
   reducer: {
      app: appReducer,
      product: productReducer
   }
})


export default store
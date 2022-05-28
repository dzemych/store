import {configureStore} from "@reduxjs/toolkit";
import appReducer from './app/appReducer'
import productReducer from "./product/productReducer"
import userReducer from './user/userReducer'
import recentlyReducer from "./recently/recentlyReducer";
import purchaseReducer from "./purchase/purchaseReducer";


const store = configureStore({
   reducer: {
      app: appReducer,
      product: productReducer,
      user: userReducer,
      recently: recentlyReducer,
      purchase: purchaseReducer
   }
})


export default store
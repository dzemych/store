import {configureStore} from "@reduxjs/toolkit";
import appReducer from './app/appReducer'


const store = configureStore({
   reducer: {
      app: appReducer
   }
})


export default store
import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchBasket} from "../user/userAction";
import {removeFromBasket, updateLocalStorage} from "../user/userReducer";


export const fetchCreatePurchase = createAsyncThunk(
   'purchase/createPurchase',
   async (payload, thunkApi) => {
      const isAuth = thunkApi.getState().user.token
      const basket = thunkApi.getState().user.basket

      try {
         const response = await fetch(
            `/api/purchase`,
            {
               method: "POST",
               body: JSON.stringify(payload),
               headers: {'Content-Type': 'application/json'}
            }
         )
         const data = await response.json()

         if (!response.ok)
            throw data

         if (isAuth) {
            thunkApi.dispatch(fetchBasket({id: basket, type: 'remove'}))
         } else {
            thunkApi.dispatch(removeFromBasket(basket))
            thunkApi.dispatch(updateLocalStorage('basket'))
         }

         return data
      } catch (e) {
         throw e
      }
   }
)
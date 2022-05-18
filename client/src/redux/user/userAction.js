import {createAsyncThunk} from '@reduxjs/toolkit'
import {toggleAuth} from "../app/appReducer";
import {clearErrors} from "./userReducer";


export const signUp = createAsyncThunk(
   'user/signUp',
   async (user, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl

      try {
         const response = await fetch(
            `${dbUrl}/auth/signup`,
            {
               method: 'POST',
               body: JSON.stringify(user),
               headers: {'Content-Type': 'application/json'}
            }
         )

         if (!response.ok)
            throw await response.json()

         const data = await response.json()

         thunkApi.dispatch(toggleAuth())
         thunkApi.dispatch(clearErrors())
         return {data}
      } catch (e) {
         throw e
      }
   }
)

export const signIn = createAsyncThunk(
   'user/signIn',
   async (user, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl

      try {
         const response = await fetch(
            `${dbUrl}/auth/login`,
            {
               method: "POST",
               body: JSON.stringify(user),
               headers: {'Content-Type': 'application/json'}
            }
         )

         if (!response.ok)
            throw await response.json()
         const data = await response.json()

         thunkApi.dispatch(toggleAuth())
         thunkApi.dispatch(clearErrors())
         return {data}
      } catch (e) {
         throw e
      }
   }
)
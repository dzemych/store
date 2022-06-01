import {createAsyncThunk} from '@reduxjs/toolkit'
import {toggleAuth} from "../app/appReducer";
import {clearErrors, loadLocalStorage, toggleSent} from "./userReducer";


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

export const updateUser = createAsyncThunk(
   'user/updateUser',
   async (user, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl
      const token = thunkApi.getState().user.token

      try {
         const response = await fetch(
            `${dbUrl}/auth/updateUser`,
            {
               method: "PATCH",
               body: JSON.stringify(user.form),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            })
         const data = await response.json()

         if (!response.ok)
            throw data

         return {data}
      } catch (e) {
         throw e
      }
   }
)

export const fetchUser = createAsyncThunk(
   'user/fetchUser',
   async (token, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl

      try {
         const response = await fetch(`${dbUrl}/user/me`, {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`
            }
         })
         const data = await response.json()

         if (!response.ok)
            throw data

         return {data}
      } catch (e) {
         thunkApi.dispatch(loadLocalStorage())
         throw e
      }
   }
)

export const forgotPassword = createAsyncThunk(
   'user/forgotPassword',
   async (email, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl

      try {
         const response = await fetch(
            `${dbUrl}/auth/resetPassword`,
            {
               method: 'POST',
               body: JSON.stringify({email}),
               headers: {'Content-Type': 'application/json'}
            }
         )
         const data = await response.json()

         if (!response.ok)
            throw data

         thunkApi.dispatch(toggleSent(true))
         return data
      } catch (e) {
         throw e
      }
   }
)

export const resetPassword = createAsyncThunk(
   'user/resetPassword',
   async (user, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl

      try {
         const response = await fetch(
            `${dbUrl}/auth/resetPassword/${user.token}`,
            {
               method: 'POST',
               body: JSON.stringify({
                  password: user.password,
                  passwordConfirm: user.passwordConfirm
               }),
               headers: {'Content-Type': 'application/json'}
            }
         )
         const data = await response.json()

         if (!response.ok) {
            throw data
         }

         return data
      } catch (e) {
         throw e
      }
   }
)

export const fetchWishList = createAsyncThunk(
   'user/fetchWishList',
   async (payload, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl
      const token = thunkApi.getState().user.token

      try {
         const response = await fetch(
            `${dbUrl}/user/changeWishList`,
            {
               method: 'PATCH',
               body: JSON.stringify({productId: payload.id, type: payload.type}),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            }
         )
         const data = await response.json()

         if (!response.ok) {
            throw data
         }

         return data
      } catch (e) {
         throw e
      }
   }
)

export const fetchBasket = createAsyncThunk(
   'user/fetchBasket',
   async (payload, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl
      const token = thunkApi.getState().user.token

      try {
         const response = await fetch(
            `${dbUrl}/user/changeBasket`,
            {
               method: 'PATCH',
               body: JSON.stringify({productId: payload.id, type: payload.type}),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               }
            }
         )
         const data = await response.json()

         if (!response.ok) {
            console.log(data)
            throw data
         }

         return data
      } catch (e) {
         throw e
      }
   }
)
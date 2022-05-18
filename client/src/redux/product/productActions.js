import {createAsyncThunk} from '@reduxjs/toolkit'


export const fetchProduct = createAsyncThunk(
   'product/fetchProduct',
   async (slug, thunkApi) => {
      const dbUrl = thunkApi.getState().app.dbUrl

      const response = await fetch(`${dbUrl}/product/${slug}`)
      const data = await response.json()

      return data.product
   }
)
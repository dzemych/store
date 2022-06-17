import {createAsyncThunk} from '@reduxjs/toolkit'


export const fetchProduct = createAsyncThunk(
   'product/fetchProduct',
   async (slug, thunkApi) => {
      const response = await fetch(`/api/product/${slug}`)
      const data = await response.json()

      return data.product
   }
)
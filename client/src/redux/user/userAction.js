import {createAsyncThunk} from '@reduxjs/toolkit'


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
            throw response

         const data = await response.json()
         return {data}
      } catch (e) {
         console.log(e)
         throw e
      }
   }
)
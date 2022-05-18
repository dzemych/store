const {createSlice} = require("@reduxjs/toolkit");


const initialState = {
   id: null,
   name: null,
   wishList: [],
   basket: [],
   purchases: [],
   error: null
}

const userReducer = createSlice({
   name: 'user',
   initialState,
   reducers: {
   },
   extraReducers(builder) {
      builder
      .addCase('user/signIp/fulfilled', (state, action) => {
         console.log(action.payload)
      })
      .addCase('user/signUp/rejected', (state, action) => {
         console.log(action.payload)
      })
   }
})

export const {} = userReducer.actions

export default userReducer.reducer
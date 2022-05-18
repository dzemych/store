const {createSlice} = require("@reduxjs/toolkit");


const initialState = {
   token: null,
   id: null,
   name: null,
   email: null,
   wishList: [],
   basket: [],
   purchases: [],
   pwdError: false,
   emailError: false
}

const userReducer = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logOut: () => initialState,
      clearErrors(state) {
         state.emailError = false
         state.pwdError = false
      }
   },
   extraReducers(builder) {
      builder
      .addCase('user/signUp/fulfilled', (state, action) => {
         state.token = action.payload.data.token
         state.id = action.payload.data.id
         state.name = action.payload.data.name
         state.email = action.payload.data.email
      })
      .addCase('user/signUp/rejected', (state, action) => {
         state.emailError = true
      })

      .addCase('user/signIn/fulfilled', (state, action) => {
         state.token = action.payload.data.token
         state.id = action.payload.data.id
         state.name = action.payload.data.name
         state.email = action.payload.data.email
      })
      .addCase('user/signIn/rejected', (state, action) => {
         if (action.error.message.includes('Invalid password')){
            state.pwdError = true
            state.emailError = false
         }
         if (action.error.message.includes('No user')) {
            state.pwdError = false
            state.emailError = true
         }
      })
   }
})

export const {logOut, clearErrors} = userReducer.actions

export default userReducer.reducer
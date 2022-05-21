const {createSlice} = require("@reduxjs/toolkit");


const initialState = {
   token: null,
   _id: null,
   name: null,
   email: null,
   wishList: [],
   basket: [],
   purchases: [],
   pwdError: false,
   emailError: false,
   sent: false,
   loading: false,
   isReset: null,
   dataUpdate: false
}

const userReducer = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logOut: () => {
         window.localStorage.removeItem('token')

         return initialState
      },
      clearErrors(state) {
         state.emailError = false
         state.pwdError = false
      },
      toggleSent(state, action) {
         state.sent = action.payload
      },
      toggleReset(state, action) {
         state.isReset = action.payload
      },
      setDataUpdate(state, action) {
         state.dataUpdate = action.payload
      },
   },
   extraReducers(builder) {
      builder
      // 1) Fetch user from localStorage
      .addCase('user/fetchUser/fulfilled', (state, action) => {
         Object.keys(action.payload.data.data).forEach(key => {
            state[key] = action.payload.data.data[key]
         })
         state.token = window.localStorage.getItem('token')
         state.loading = false
      })
      .addCase('user/fetchUser/rejected', () => {
         window.localStorage.removeItem('token')
         return initialState
      })

      // 2) Sign up handlers
      .addCase('user/signUp/fulfilled', (state, action) => {
         Object.keys(action.payload.data).forEach(key => {
            state[key] = action.payload.data[key]
         })
         window.localStorage.setItem('token', action.payload.data.token)
         state.loading = false
      })
      .addCase('user/signUp/rejected', (state) => {
         state.emailError = true
         state.loading = false
      })

      // 3) Sign in handlers
      .addCase('user/signIn/fulfilled', (state, action) => {
         Object.keys(action.payload.data).forEach(key => {
            state[key] = action.payload.data[key]
         })
         window.localStorage.setItem('token', action.payload.data.token)
         state.loading = false
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
         state.loading = false
      })

      // 4) Update user handlers
      .addCase('user/updateUser/fulfilled', (state, action) => {
         console.log(action)
         Object.keys(action.payload.data.user).forEach(key => {
            state[key] = action.payload.data.user[key]
         })

         state.token = action.payload.data.token
         state.pwdError = false
         state.loading = false

         state.dataUpdate = true

         window.localStorage.setItem('token', action.payload.data.token)
      })
      .addCase('user/updateUser/rejected', (state, action) => {
         console.log(action)
         if (action.error.message.includes('Invalid password'))
            state.pwdError = true

         state.loading = false
      })

      // 5) Forgot password handlers
      .addCase('user/forgotPassword/fulfilled', (state) => {
         state.sent = true
         state.loading = false
      })
      .addCase('user/forgotPassword/rejected', (state, action) => {
         if (action.error.message.includes('No user')) {
            state.emailError = true
         }

         state.loading = false
      })

      .addCase('user/resetPassword/fulfilled', (state, action) => {
         console.log(action)
         state.isReset = 'success'
         state.loading = false
      })
      .addCase('user/resetPassword/rejected', (state, action) => {
         console.log(action)
         state.isReset = 'rejected'
         state.loading = false
      })

      .addCase('user/fetchPushWishList/fulfilled', (state, action) => {
         console.log(action)
         state.wishList = action.payload.wishList
      })

      // 6) Set loading to true while pending
      .addCase('user/fetchUser/pending', (state, action) => {
         state.loading = true
      })
      .addCase('user/signUp/pending', (state) => {
         state.loading = true
      })
      .addCase('user/signIn/pending', (state) => {
         state.loading = true
      })
      .addCase('user/updateUser/pending', (state) => {
         state.loading = true
      })
      .addCase('user/forgotPassword/pending', (state) => {
         state.loading = true
      })
      .addCase('user/resetPassword/pending', (state) => {
         state.loading = true
      })
   }
})

export const {
   logOut,
   clearErrors,
   toggleSent,
   setLoading,
   setDataUpdate
} = userReducer.actions

export default userReducer.reducer
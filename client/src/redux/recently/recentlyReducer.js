const {createSlice} = require("@reduxjs/toolkit");


const initialState = {
   products: []
}

const recentlyReducer = createSlice({
   name: 'recently',
   initialState,
   reducers: {
      pushToRecently(state, action) {
         const id = action.payload
         const products = state.products

         if (products.includes(id)) {
            const i = products.indexOf(id)
            state.products = products.sort((x,y) => x === id ? -1 : y === id ? 1 : 0)
         } else {
            if (products.length < 12) {
               products.unshift(id)
            } else {
               products.splice(0, -1)
               products.unshift(id)
            }
         }

         window.localStorage.setItem('recently', JSON.stringify(state.products))
      },
      loadRecentlyFromStorage(state) {
         const data = JSON.parse(
            window.localStorage.getItem('recently')
         )

         if (data)
            state.products = data
      }
   }
})

export default recentlyReducer.reducer

export const { pushToRecently, loadRecentlyFromStorage } = recentlyReducer.actions
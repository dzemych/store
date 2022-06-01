import {createSlice} from "@reduxjs/toolkit";


const initialState = {
   checkout: {},
   purchases: [],
   status: 'idle'
}

const purchaseReducer = createSlice({
   name: 'purchase',
   initialState,
   reducers: {
      addCheckout(state, action) {
         state.checkout = action.payload
      },
      clearCheckout(state) {
         state.checkout = {}
      },
      setStatus(state, action) {
         state.status = action.payload
      }
   },
   extraReducers(builder) {
      builder
         .addCase('purchase/createPurchase/fulfilled', (state, action) => {
            console.log(action)

            state.purchases.unshift(action.payload.data._id)
            state.status = 'success'

            localStorage.setItem('purchases', JSON.stringify(state.purchases))
         })
   }
})

export default purchaseReducer.reducer

export const {addCheckout, clearCheckout, setStatus} = purchaseReducer.actions
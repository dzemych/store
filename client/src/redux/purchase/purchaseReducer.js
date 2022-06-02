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
      },
      loadPurchasesFromLocal(state) {
         const str = window.localStorage.getItem('purchases')
         state.purchases = JSON.parse(str)
      }
   },
   extraReducers(builder) {
      builder
         .addCase('purchase/createPurchase/fulfilled', (state, action) => {
            if (!state.purchases) {
               state.purchases = [action.payload.data._id]
            } else {
               state.purchases.unshift(action.payload.data._id)
            }

            state.status = 'success'

            localStorage.setItem('purchases', JSON.stringify(state.purchases))
         })
   }
})

export default purchaseReducer.reducer

export const {addCheckout, clearCheckout, setStatus, loadPurchasesFromLocal} = purchaseReducer.actions
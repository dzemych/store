import {createSlice} from "@reduxjs/toolkit";


const initialState = {
   checkout: {}
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
      }
   }
})

export default purchaseReducer.reducer

export const {addCheckout, clearCheckout} = purchaseReducer.actions
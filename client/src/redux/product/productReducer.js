const {createSlice} = require("@reduxjs/toolkit");


const initialState = {
   product: {
      _id: null,
      title: '___',
      price: '___',
      description: '___',
      material: '___',
      sex: '___',
      numQuestions: 0,
      avgRating: 0,
      numRating: 0,
      numSizes: {s: '___'}
   },
   status: 'idle'
}

const productReducer = createSlice({
   name: 'product',
   initialState,
   reducers: {
     setStatus(state, action) {
         if (action.payload) {
            state.status = action.payload
         } else {
            state.status = 'idle'
         }
     }
   },
   extraReducers(builder) {
      builder
         .addCase('product/fetchProduct/fulfilled', (state, action) => {
            state.product = action.payload
            state.status = 'success'
         })
   }
})

export const {setStatus} = productReducer.actions

export default productReducer.reducer
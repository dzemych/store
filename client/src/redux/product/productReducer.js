const {createSlice} = require("@reduxjs/toolkit");


const initialState = {
   products: [],
   categories: {}
}

const reducer = createSlice({
   name: 'product',
   initialState,
   extraReducers(builder) {
      builder
         .addCase('fetchCategories/fulfilled', (state, action) => {
            state.categories = action.payload
         })
   }
})

export default reducer
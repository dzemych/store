import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   sidebar: false,
   error: false
}

const reducer = createSlice({
   name: 'app',
   initialState,
   reducers: {
      toggleSidebar(state, action) {
         if (action.payload)
            return state.sidebar = action.payload

         state.sidebar = !state.sidebar
      }
   }
})


export const { toggleSidebar } = reducer.actions
export default reducer.reducer
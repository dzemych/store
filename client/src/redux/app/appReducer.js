import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   sidebar: false,
   error: false,
   catalog: false
}

const reducer = createSlice({
   name: 'app',
   initialState,
   reducers: {
      toggleSidebar(state, action) {
         if (action.payload)
            return state.sidebar = action.payload

         state.sidebar = !state.sidebar
      },

      toggleCatalog(state, action) {
         if (action.payload)
            return state.catalog = action.payload

         state.catalog = !state.catalog
      }
   }
})


export const { toggleSidebar, toggleCatalog } = reducer.actions
export default reducer.reducer
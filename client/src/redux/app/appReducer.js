import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   sidebar: false,
   error: false,
   catalog: false,
   auth: false,
}

const reducer = createSlice({
   name: 'app',
   initialState,
   reducers: {
      toggleSidebar(state, action) {
         if (action.payload)
            state.sidebar = action.payload
         else {
            state.sidebar = !state.sidebar
         }
      },
      toggleCatalog(state, action) {
         if (action.payload) {
            state.catalog = action.payload
         } else {
            state.catalog = !state.catalog
         }
      },
      toggleAuth: function (state, action) {
         if (action.payload) {
            state.auth = action.payload
         } else {
            state.auth = !state.auth
         }
      },
   }
})


export const { toggleSidebar, toggleCatalog, toggleAuth } = reducer.actions
export default reducer.reducer
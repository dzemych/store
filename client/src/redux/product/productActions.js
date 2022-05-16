import {createAsyncThunk} from "@reduxjs/toolkit/src/createAsyncThunk";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
   'product/fetchCategories',
   async () => {
      const categories = axios.get(``)
   }
)
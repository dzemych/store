import React from 'react'
import {Routes, Route} from "react-router-dom";
import CreateProduct from "./containers/CreateProduct/CreateProduct";


const AllRoutes = (props) => {


   return (
      <Routes>
         <Route path={'/'} exact element={ <CreateProduct/> } />
      </Routes>
   )
}

export default AllRoutes
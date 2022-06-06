import React from 'react'
import {Routes, Route} from "react-router-dom";
import CreateProduct from "./containers/CreateProduct/CreateProduct";


const AllRoutes = (props) => {


   return (
      <div style={{marginLeft: '170px'}}>
         <Routes>
            <Route path={'/'} exact element={ <CreateProduct/> } />
         </Routes>
      </div>
   )
}

export default AllRoutes
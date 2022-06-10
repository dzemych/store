import React from 'react'
import {Routes, Route} from "react-router-dom";
import CreateProduct from "./containers/CreateProduct/CreateProduct";
import ProductsList from "./containers/ProductsList/ProductsList";
import Edit from "./containers/Edit/Edit";
import Questions from "./containers/Questions/Questions";
import Purchases from "./containers/Purchases/Purchases";


const AllRoutes = (props) => {


   return (
      <div style={{
         marginLeft: '170px',
         width: '100%'
      }}>
         <Routes>
            <Route path={'/'} exact element={ <CreateProduct/> } />
            <Route path={'/products'} exact element={ <ProductsList/> }/>
            <Route path={'/edit/:slug'} exact element={ <Edit/> }/>
            <Route path={'/questions'} exact element={ <Questions/> }/>
            <Route path={'/purchases'} exact element={ <Purchases/> }/>
         </Routes>
      </div>
   )
}

export default AllRoutes
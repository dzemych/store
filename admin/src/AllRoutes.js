import React from 'react'
import {Routes, Route} from "react-router-dom";
import CreateProduct from "./containers/CreateProduct/CreateProduct";
import ProductsList from "./containers/ProductsList/ProductsList";
import Edit from "./containers/Edit/Edit";
import Questions from "./containers/Questions/Questions";
import Purchases from "./containers/Purchases/Purchases";
import SizesTable from "./containers/SizesTable/SizesTable";
import {useMediaQuery} from "react-responsive";


const AllRoutes = (props) => {
   const isPhone = useMediaQuery({maxWidth: "430px"})

   return (
      <div style={!isPhone ? {
         marginLeft: '170px',
         width: '100%'
      } : null}>
         <Routes>
            <Route path={'/admin'} exact element={ <CreateProduct/> } />
            <Route path={'/admin/products'} exact element={ <ProductsList/> }/>
            <Route path={'/admin/edit/:slug'} exact element={ <Edit/> }/>
            <Route path={'/admin/questions'} exact element={ <Questions/> }/>
            <Route path={'/admin/purchases'} exact element={ <Purchases/> }/>
            <Route path={'/admin/sizes-table'} exact element={ <SizesTable/> }/>
         </Routes>
      </div>
   )
}

export default AllRoutes
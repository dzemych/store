import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './containers/Home/Home'
import ProductsList from './containers/ProductsList/ProductsList'
import Product from './containers/Product/Product'
import About from './containers/About/About'
import Contacts from './containers/Contacts/Contacts'
import Info from './containers/Info/Info'
import User from './containers/User/User'


const getRoutes = (props) => {
    return (
       <Routes>
          <Route path={'/'} exact element={ <Home/> } />
          <Route path={'/about'} exact element={ <About/> } />
          <Route path={'/contacts'} exact element={ <Contacts/> } />
          <Route path={'/info'} exact element={ <Info/> } />
          <Route path={'/user'} exact element={ <User/> } />
          <Route path={'/products'} exact element={ <ProductsList/> } />
          <Route path={'/products/:slug'} exact element={ <Product/> } />
       </Routes>
    )
}

export default getRoutes
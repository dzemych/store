import React, {useEffect} from 'react'
import {Routes, Route, useLocation} from "react-router-dom";
import Home from './containers/Home/Home'
import ProductsList from './containers/ProductsList/ProductsList'
import Product from './containers/Product/Product'
import About from './containers/About/About'
import Contacts from './containers/Contacts/Contacts'
import Info from './containers/Info/Info'
import User from './containers/User/User'
import WishList from "./containers/WishList/WishList";
import ShoppingCart from "./containers/ShoppingCart/ShoppingCart";
import Orders from "./containers/Orders/Orders";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth} from "./redux/app/appReducer";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import ResetPassword from "./containers/ForgotPassword/ResetPassword";
import Checkout from "./containers/Checkout/Checkout";


const useRoutes = (props) => {
   const isAuth = useSelector(state => state.user.token)

   const dispatch = useDispatch()

   const location = useLocation()

   useEffect(() => {
      if (!isAuth)
         if (location.pathname === '/user') {
            dispatch(toggleAuth())
         }
   }, [location, dispatch, isAuth])

    return (
       <Routes>
          <Route path={'/'} exact element={ <Home/> } />
          <Route path={'/about'} exact element={ <About/> } />
          <Route path={'/wish-list'} exact element={ <WishList/> } />
          <Route path={'/shopping-cart'} exact element={ <ShoppingCart/> } />
          <Route path={'/contacts'} exact element={ <Contacts/> } />
          <Route path={'/info'} exact element={ <Info/> } />
          <Route path={'/products'} exact element={ <ProductsList/> } />
          {isAuth
             ? <Route path={'/user'} exact element={ <User/> } />
             : <Route path={'/user'} exact element={ <Home/> } />
          }
          <Route path={'/orders'} exact element={ <Orders/> } />
          <Route path={'/checkout'} exact element={ <Checkout/> }/>
          <Route path={'/resetPassword'} exact element={ <ForgotPassword/> }/>
          <Route path={'/resetPassword/:token'} exact element={ <ResetPassword/> }/>
          <Route path={'/products/:slug'} exact element={ <Product/> } />
       </Routes>
    )
}

export default useRoutes
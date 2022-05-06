import React from 'react'
import classes from './Header.module.sass'
import tdLogo from '../../img/td-logo.png'
import Search from "../../components/Search/Search";
import {toggleSidebar} from '../../redux/app/appReducer'
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faBasketShopping} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom";


const Header = (props) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const openSidebar = () => {
      dispatch(toggleSidebar())
   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <FontAwesomeIcon
               icon={faBars}
               className={classes.burger}
               onClick={openSidebar}
            />

            <Search/>

            <img
               className={classes.logo}
               src={tdLogo}
               alt="logo"
               onClick={() => navigate('/')}
            />

            <FontAwesomeIcon
               icon={faBasketShopping}
               className={classes.shopping_cart}
               onClick={() => navigate('/shopping-cart')}
            />
         </div>
      </div>
   )
}

export default Header
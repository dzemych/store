import React from 'react'
import classes from './Header.module.sass'
import tdLogo from '../../img/td-logo.png'
import Search from "../../forms/Search/Search";
import {toggleSidebar, toggleCatalog, toggleAuth} from '../../redux/app/appReducer'
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faBasketShopping, faShirt, faUser} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom";
import tanDem from '../../img/tan-dem-wide-logo.png'
import MediaQuery from "react-responsive";
import {Desktop, Laptop, Tablet} from "../../functions/mediaCheck";


const Header = (props) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   // const isDesk = useMediaQuery({minWidth: 1024})
   // const isDeskOrLap = useMediaQuery({minWidth: 520})

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

            <Desktop>
               <div
                  className={classes.tanDem_logo}
                  onClick={() => navigate('/')}
               >
                  <img src={tanDem} alt=""/>
               </div>
            </Desktop>

            <Laptop>
               <div
                  className={classes.catalog_container}
                  onClick={() => dispatch(toggleCatalog())}
               >
                  <FontAwesomeIcon icon={faShirt}/>

                  <span>Catalog</span>
               </div>
            </Laptop>

            <Search/>

            <Tablet>
               <button className={classes.search_btn}>
                  Search
               </button>
            </Tablet>

            <img
               className={classes.logo}
               src={tdLogo}
               alt="logo"
               onClick={() => navigate('/')}
            />

            <Desktop>
               <FontAwesomeIcon
                  icon={faUser}
                  className={classes.user_icon}
                  onClick={() => dispatch(toggleAuth())}
               />
            </Desktop>

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
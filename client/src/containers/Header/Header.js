import React from 'react'
import classes from './Header.module.sass'
import tdLogo from '../../img/td-logo.png'
import Search from "../../forms/Search/Search";
import {toggleSidebar, toggleCatalog} from '../../redux/app/appReducer'
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faBasketShopping, faShirt} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom";
import useDesktopCheck from "../../functions/useDesktopCheck";


const Header = (props) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const isDesktop = useDesktopCheck()

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

            {isDesktop &&
               <div
                  className={classes.catalog_container}
                  onClick={() => dispatch(toggleCatalog())}
               >
                  <FontAwesomeIcon icon={faShirt}/>

                  <span>Catalog</span>
               </div>
            }

            <Search/>

            {isDesktop &&
               <button className={classes.search_btn}>
                  Search
               </button>
            }

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
import React, {useState} from 'react'
import classes from './Header.module.sass'
import tdLogo from '../../img/td-logo.png'
import Search from "../../forms/Search/Search";
import {toggleSidebar, toggleCatalog, toggleAuth} from '../../redux/app/appReducer'
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faBasketShopping, faRightToBracket, faShirt, faUser} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from "react-router-dom";
import tanDem from '../../img/tan-dem-wide-logo.png'
import {Desktop, Laptop, Tablet} from "../../functions/mediaCheck";


const Header = (props) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const isAuth = useSelector(state => state.user.token)
   const isSidebar = useSelector(state => state.app.isSidebar)

   const [value, setValue] = useState('')

   const openSidebar = () => {
      dispatch(toggleSidebar())
   }

   const authHandler = () => {
      if (!isAuth) {
         dispatch(toggleAuth())
      } else {
         navigate('/user')
      }
   }

   const searchHandler = e => {
      e.preventDefault()
      navigate(`/products?title[regex]=${value}&page=1   `)
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

                  <span>Каталог</span>
               </div>
            </Laptop>

            <Search
               value={value}
               onChange={e => setValue(e.target.value)}
               onSubmit={e => searchHandler(e)}
            />

            <Laptop>
               <button
                  className={classes.search_btn}
                  onClick={e => searchHandler(e)}
               >
                  Поиск
               </button>
            </Laptop>

            <img
               className={classes.logo}
               src={tdLogo}
               alt="logo"
               onClick={() => navigate('/')}
            />

            <Desktop>
               <FontAwesomeIcon
                  icon={isAuth ? faUser : faRightToBracket}
                  className={classes.user_icon}
                  onClick={() => authHandler()}
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
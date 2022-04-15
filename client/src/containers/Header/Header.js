import React from 'react'
import classes from './Header.module.sass'
import {ReactComponent as Burger} from '../../img/bars-solid.svg'
import {ReactComponent as ShoppingCart} from '../../img/cart-shopping-solid.svg'
import tdLogo from '../../img/td-logo.png'
import Search from "../../components/Search/Search";


const Header = (props) => {
    return(
       <div className={classes.container}>
          <div className={classes.wrapper}>
             <Burger className={classes.burger}/>
             <Search/>
             <img className={classes.logo} src={tdLogo} alt="logo"/>
             <ShoppingCart className={classes.shopping_cart}/>
          </div>
       </div>
    )
}

export default Header
import React from 'react'
import { NavLink } from "react-router-dom";
import burger from '../../img/bars-solid.svg'
import classes from './Navbar.module.sass'



const Navbar = (props) => {
   return (
      <nav>
         <img  className={classes.burger} src={burger} alt=""/>
      </nav>
   )
}

export default Navbar
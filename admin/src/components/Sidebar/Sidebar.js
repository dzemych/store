import React from 'react'
import classes from './Sidebar.module.sass'
import {useNavigate} from "react-router-dom"


const Sidebar = (props) => {
   const navigate = useNavigate()

   const links = [
      {
         title: 'New product',
         onClick: () => navigate('/')
      }
   ]

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <nav className={classes.nav_wrapper}>
               {links.map((el, i) => (
                  <div className={classes.link_item} key={i}>
                     <span onClick={el.onClick}>
                        {el.title}
                     </span>
                  </div>
               ))}
            </nav>
         </div>
      </div>
   )
}

export default Sidebar
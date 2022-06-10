import React, {useContext} from 'react'
import classes from './Sidebar.module.sass'
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext";


const Sidebar = (props) => {
   const auth = useContext(AuthContext)

   const navigate = useNavigate()

   const logOutHandler = () => {
      auth.logout()
   }

   const links = [
      {
         title: 'New product',
         onClick: () => navigate('/')
      },
      {
         title: 'All products',
         onClick: () => navigate('/products')
      },
      {
         title: 'Questions',
         onClick: () => navigate('/questions')
      },
      {
         title: 'Purchases',
         onClick: () => navigate('/purchases')
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

            <span
               className={classes.logOut}
               onClick={logOutHandler}
            >
               Log out
            </span>
         </div>
      </div>
   )
}

export default Sidebar
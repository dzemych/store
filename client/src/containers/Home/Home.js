import React from 'react'
import classes from './Home.module.sass'
import {NavLink} from "react-router-dom";
import {ReactComponent as FashionAndStyle} from '../../img/fashionAndStyle.svg'


const Home = (props) => {
    return (
       <div className={classes.container}>
          <div className={classes.wrapper}>
             <section className={classes.preview}>
                <nav className={classes.preview_nav}>
                  <NavLink to={'/info'}>Info</NavLink>
                  <NavLink
                     to={'/contacts'}
                     className={classes.nav_contact}
                  >Contacts</NavLink>
                  <NavLink to={'/about'}>About</NavLink>
                </nav>

                <FashionAndStyle className={classes.preview_img}/>

                <button className={classes.btnCatalog}>
                  Catalog
                </button>
             </section>
          </div>
       </div>
    )
}

export default Home
import React from 'react'
import classes from './Home.module.sass'
import {NavLink} from "react-router-dom";
import {ReactComponent as FashionAndStyle} from '../../img/fashionAndStyle.svg'
import laptop from '../../img/laptop.png'
import Slider from "../../components/Slider/Slider";


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

             <span className={classes.manuscript}>
                Clean and Elegant Design
             </span>

             <section className={classes.notation}>
                <h2 className={classes.note_title}>
                   About us
                </h2>
                <span className={classes.note_text}>
                   Read about our dizzily creation story.
                   We had been fighting pirates and politics to reach what we have today
                </span>
                <div className={classes.note_img}>
                   <img src={laptop} alt=""/>
                </div>
             </section>

             <section className={classes.recently}>
                <h2 className={classes.recently_title}>Recently watched</h2>

                <div className={classes.recently_slider}>
                   <Slider>
                     <div className={classes.recent_product}>Product 1</div>
                     <div className={classes.recent_product}>Product 2</div>
                     <div className={classes.recent_product}>Product 3</div>
                     <div className={classes.recent_product}>Product 4</div>
                     <div className={classes.recent_product}>Product 5</div>
                   </Slider>
                </div>

                <span>View all products</span>
             </section>
          </div>
       </div>
    )
}


export default Home
import React from 'react'
import classes from './Home.module.sass'
import {NavLink} from "react-router-dom";
import {ReactComponent as FashionAndStyle} from '../../img/fashionAndStyle.svg'
import laptop from '../../img/laptop.png'
import Button from "../../forms/Button/Button";
import {toggleCatalog} from "../../redux/app/appReducer";
import {useDispatch} from "react-redux";
import RecentlySlider from "../../components/Slider/RecentlySlider";


const Home = (props) => {
   const dispatch = useDispatch()

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

               <Button
                  type={'big_orange_button'}
                  onClickHandler={() => dispatch(toggleCatalog())}
               >
                  Catalog
               </Button>
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
               <RecentlySlider/>

               <Button
                  type={'viewAll_button'}
                  onClickHandler={() => dispatch(toggleCatalog())}
               >
                  View all products</Button>

               <hr className={classes.hr}/>
            </section>
         </div>
      </div>
   )
}


export default Home
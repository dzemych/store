import React from 'react'
import classes from './Home.module.sass'
import {NavLink} from "react-router-dom";
import {ReactComponent as FashionAndStyle} from '../../img/fashionAndStyle.svg'
import laptop from '../../img/laptop.png'
import Slider, {SliderItem} from "../../components/Slider/Slider";
import ProductCard from "../../components/ProductCard/ProductCard";


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

                     <SliderItem key={1}>
                        <ProductCard title={'Very cool jeans'} price={500}/>
                     </SliderItem>

                     <SliderItem key={2}>
                        <ProductCard
                           title={'Very cool and just beautiful T-shirt with cool logo'}
                           price={700}
                        />
                     </SliderItem>

                     <SliderItem key={3}>
                        <ProductCard
                           title={'Very cool and just beautiful T-shirt with cool logo'}
                           price={700}
                        />
                     </SliderItem>

                     <SliderItem key={4}>
                        <ProductCard
                           title={'Very cool and just beautiful T-shirt with cool logo'}
                           price={700}
                        />
                     </SliderItem>

                     <SliderItem key={5}>
                        <ProductCard
                           title={'Very cool and just beautiful T-shirt with cool logo'}
                           price={700}
                        />
                     </SliderItem>
                  </Slider>
               </div>

               <span className={classes.recents_btn}>View all products</span>

               <hr className={classes.hr}/>
            </section>
         </div>
      </div>
   )
}


export default Home
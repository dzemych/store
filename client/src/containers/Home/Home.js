import React from 'react'
import classes from './Home.module.sass'
import {NavLink} from "react-router-dom";
import {ReactComponent as FashionAndStyle} from '../../img/fashionAndStyle.svg'
import laptop from '../../img/laptop.png'
import Slider, {SliderItem} from "../../components/Slider/Slider";
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../components/Button/Button";
import jeans from '../../img/jeans.jpg'
import square from '../../img/square.jpg'
import tShirt from '../../img/t-shirt.jpg'
import {toggleCatalog} from "../../redux/app/appReducer";
import {useDispatch} from "react-redux";


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
               <h2 className={classes.recently_title}>Recently watched</h2>

               <div className={classes.recently_slider}>
                  <Slider>

                     <SliderItem key={1}>
                        <ProductCard
                           title={'Very cool jeans'}
                           price={500}
                           img={jeans}
                        />
                     </SliderItem>

                     <SliderItem key={2}>
                        <ProductCard
                           title={'Very cool and just ' +
                           'beautiful T-shirt with cool logo'}
                           price={700}
                           img={square}
                        />
                     </SliderItem>

                     <SliderItem key={3}>
                        <ProductCard
                           title={'Very cool and just beautiful ' +
                           'T-shirt with cool logo'}
                           price={700}
                           img={tShirt}
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
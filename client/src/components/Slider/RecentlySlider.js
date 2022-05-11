import React from 'react'
import classes from './Slider.module.sass'
import Slider, {SliderItem} from "./Slider";
import ProductCard from "../ProductCard/ProductCard";
import jeans from "../../img/jeans.jpg";
import square from "../../img/square.jpg";
import tShirt from '../../img/t-shirt.jpg'
import {useMediaQuery} from "react-responsive";


const RecentlySlider = (props) => {
   const products = [
      {
         type: 'basket',
         title: "Amazing and cute jeans",
         price: 850,
         img: jeans
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
         img: square
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
         img: tShirt
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
      }
   ]

   const isTablet = useMediaQuery({minWidth: 660})
   const isLaptop = useMediaQuery({minWidth: 836})
   const isDesktop = useMediaQuery({minWidth: 1100})
   const isBigDesktop = useMediaQuery({minWidth: 1450})

   const slides = props.slides
      ? props.slides
      : isBigDesktop ? 6
      : isDesktop ? 5
      : isLaptop ? 4
      : isTablet ? 3
      : 2

   return (
      <div className={classes.recently_container}>
         <h2 className={classes.recently_title}>Recently watched</h2>

         <Slider slides={slides}>
            {products.map((el, i) => (
               <SliderItem slides={slides} key={i}>
                  <ProductCard
                     title={el.title}
                     price={el.price}
                     img={el.img}
                  />
               </SliderItem>
            ))}
         </Slider>
      </div>
   )
}

export default RecentlySlider
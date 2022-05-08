import React from 'react'
import Slider, {SliderItem} from "./Slider";
import ProductCard from "../ProductCard/ProductCard";
import jeans from "../../img/jeans.jpg";
import square from "../../img/square.jpg";
import tShirt from '../../img/t-shirt.jpg'


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

   return (
      <div style={{width: '100%'}}>
         <h2 style={{
            fontFamily: 'RobotoRegular',
            marginBottom: '3vw',
            textAlign: 'center'
         }}>Recently watched</h2>

         <Slider>
            {products.map((el, i) => (
               <SliderItem key={i}>
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
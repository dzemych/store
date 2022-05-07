import React from 'react'
import Slider, {SliderItem} from "./Slider";
import ProductCard from "../ProductCard/ProductCard";


const RecentlySlider = (props) => {
   return (
      <div style={{width: '100%'}}>
         <h2 style={{
            fontFamily: 'RobotoRegular',
            marginBottom: '3vw',
            textAlign: 'center'
         }}>Recently watched</h2>

         <Slider>
            {props.products.map((el, i) => (
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
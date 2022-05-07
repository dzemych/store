import React from 'react'
import classes from './ProductsList.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../forms/Button/Button";
import RecentlySlider from "../../components/Slider/RecentlySlider";
import jeans from "../../img/jeans.jpg";
import square from "../../img/square.jpg";
import tShrit from '../../img/t-shirt.jpg'


const ProductsList = (props) => {
   const products = [
      {
         title: "Amazing and cute jeans",
         price: 850,
         img: jeans
      },
      {
         title: "Fancy T-shirt",
         price: 500,
         img: square
      },
      {
         title: "Fancy T-shirt",
         price: 500,
         img: tShrit
      }
   ]

   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h2 className={classes.title}>Title</h2>

            <div className={classes.sort_panel}>
               <select name="sort" id="sort" className={classes.select}>
                  <option value="price_h_to_l">Price from high to low</option>
                  <option value="price_l_to_h">Price from low to high</option>
                  <option value="most_popular">Most popular</option>
                  <option value="newest">Newest</option>
               </select>
            </div>

            <div className={classes.products_container}>
               {
                  products.map((item, i) => (
                     <ProductCard
                        title={item.title}
                        price={item.price}
                        img={item.img}
                        key={i}
                     />
                  ))
               }
            </div>

            <Button type={'viewAll_button'}>Show more</Button>

            <hr className={classes.hr}/>

            <RecentlySlider products={products}/>
         </div>
      </div>
   )
}

export default ProductsList
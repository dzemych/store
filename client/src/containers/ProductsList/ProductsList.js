import React from 'react'
import classes from './ProductsList.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../components/Button/Button";


const ProductsList = (props) => {
   const products = [
      {
         text: 'Very cool and cute jeans',
         price: 850,
      },
      {
         text: 'Very cool and cute jeans',
         price: 850,
      },
      {
         text: 'Very cool and cute jeans',
         price: 850,
      },
      {
         text: 'Very cool and cute jeans',
         price: 850,
      },
      {
         text: 'Amazing T-shirt',
         price: 500,
      },
      {
         text: 'Amazing T-shirt',
         price: 500,
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
                        title={item.text}
                        price={item.price}
                        type={item.type}
                        key={i}
                     />
                  ))
               }
            </div>

            <Button type={'viewAll_button'}>Show more</Button>
         </div>
      </div>
   )
}

export default ProductsList
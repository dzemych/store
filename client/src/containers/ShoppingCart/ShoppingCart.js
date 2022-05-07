import React from 'react'
import classes from './ShoppingCart.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import square from '../../img/square.jpg'
import jeans from '../../img/jeans.jpg'
import Button from "../../forms/Button/Button";


const ShoppingCart = (props) => {
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
      }
   ]

   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>Shopping cart</h1>

            <div className={classes.products_container}>

                  {products.map((el, i, arr) => (
                     <div key={i}>
                        <ProductCard
                           type={el.type}
                           title={el.title}
                           price={el.price}
                           img={el.img}

                        />
                        {i < arr.length - 1 && <hr className={classes.hr}/>}
                     </div>
                  ))}

               </div>

            <div className={classes.total_container}>
               <div className={classes.total_amount}>
                  <span>Total</span>
                  <span className={classes.total_price}>
                     {products.reduce((acc, el) => {
                        acc += el.price
                        return acc
                     }, 0)}
                     ₴
                  </span>
               </div>

               <Button type={'bigGreen_button'}>Purchase</Button>
            </div>
         </div>
      </div>
   )
}

export default ShoppingCart
import React from 'react'
import classes from './WishList.module.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../forms/Button/Button";
import '../basicStyles.sass'


const WishList = (props) => {
   const items = [
      {
         text: 'Very cool and cute jeans',
         price: 850,
         type: 'wish'
      },
      {
         text: 'Very cool and cute jeans',
         price: 850,
         type: 'wish'
      },
      {
         text: 'Very cool and cute jeans',
         price: 850,
         type: 'wish'
      },
      {
         text: 'Very cool and cute jeans',
         price: 850,
         type: 'wish'
      },
      {
         text: 'Amazing T-shirt',
         price: 500,
         type: 'wish'
      },
      {
         text: 'Amazing T-shirt',
         price: 500,
         type: 'wish'
      }
   ]

   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>Your wish list</h1>

            <div className={classes.actions_container}>
               <span className={classes.action_btn}>Buy all</span>
               <span className={classes.action_btn}>Buy</span>
               <span className={classes.action_btn}>Delete all</span>
               <span className={classes.action_btn}>Delete</span>
            </div>

            <div className={classes.products_list}>
               {
                  items.map((item, i) => (
                     <ProductCard
                        title={item.text}
                        price={item.price}
                        type={item.type}
                        key={i}
                     />
                  ))
               }
            </div>

            <hr className={classes.hr}/>

            <div className={classes.sum_container}>
               <div className={classes.sum_left}>
                  <span className={classes.sum_num}>
                     {items.length} goods worth
                  </span>
                  <span className={classes.sum_price}>
                     {items.reduce((acc, el) => {
                        acc += el.price
                        return acc
                     }, 0)} ₴
                  </span>
               </div>

               <div className={classes.sum_right}>
                  <Button type={'bigGreen_button'}>Buy all</Button>
               </div>
            </div>

            <hr className={classes.hr}/>
         </div>
      </div>
   )
}

export default WishList
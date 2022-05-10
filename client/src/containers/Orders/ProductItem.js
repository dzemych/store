import React from 'react'
import classes from './ProductItem.module.sass'


const ProductItem = (props) => {
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.topBar_wrapper}>
               <div className={classes.img_container}>
                  <img src={props.img} alt=""/>
               </div>

               <div className={classes.topBar_title}>
                  <span>{props.title}</span>
               </div>
            </div>

            <div className={classes.sum_wrapper}>
               <div className={classes.sum_item}>
                  <span className={classes.item_title}>Price</span>

                  <span className={classes.item_value}>{props.price} ₴</span>
               </div>

               <div className={classes.sum_item}>
                  <span className={classes.item_title}>Amount</span>

                  <span className={classes.item_value}>{props.amount}</span>
               </div>

               <div className={classes.sum_item}>
                  <span className={classes.item_title}>Total</span>

                  <span className={classes.item_value}>
                     {props.amount * props.price} ₴
                  </span>
               </div>
            </div>

            <div className={classes.totals_wrapper}>
               <div className={classes.totals_item}>
                  <span className={classes.total_title}>Payment</span>

                  <span>Upon receipt</span>
               </div>

               <div className={classes.totals_item}>
                  <span className={classes.total_title}>In total</span>

                  <span className={classes.total_price}>{props.price * props.amount} ₴</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductItem
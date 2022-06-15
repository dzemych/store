import React from 'react'
import classes from '../PurchaseCard.module.sass'
import CardWrapper from "../../../../components/CardWrapper/CardWrapper";


const ProductItem = (props) => {

   return (
      <CardWrapper
         mainPhoto={props.mainPhoto}
         slug={props.slug}
         title={props.title}
         sex={props.sex}
         price={props.price * props.amount}
      >
         <div className={classes.product_data}>
            <div className={classes.data_item}>
               <span>Size:&nbsp;</span>

               <span>{props.size}</span>
            </div>

            <div className={classes.data_item}>
               <span>Amount</span>

               <span>{props.amount}</span>
            </div>

            <div className={classes.data_item}>
               <span>Product price</span>

               <span>{props.price}</span>
            </div>
         </div>
      </CardWrapper>
   )
}

export default ProductItem
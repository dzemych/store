import React from 'react'
import '../basicStyles.sass'
import classes from './Orders.module.sass'
import OrderItem from "./OrderItem";
import {useSelector} from "react-redux";


const Orders = (props) => {
   const purchaseIds = useSelector(state => state.purchase.purchases)

   console.log(purchaseIds
   )
   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={'title'}>Your orders</h1>

            <div className={classes.orders_list}>
               {purchaseIds && purchaseIds.length > 0
                ? purchaseIds.map((el, i) => (
                     <OrderItem
                        id={el}
                        key={i}
                     />
                  ))
                : <span className={classes.noPurchases}>
                     No purchases made on this device
                  </span>
               }
            </div>

            <hr className={classes.last_hr}/>
         </div>
      </div>
   )
}

export default Orders
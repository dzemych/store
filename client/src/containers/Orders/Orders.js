import React, {useEffect, useState} from 'react'
import '../basicStyles.sass'
import classes from './Orders.module.sass'
import tShirt from '../../img/t-shirt.jpg'
import jeans from '../../img/jeans.jpg'
import square from '../../img/square.jpg'
import OrderItem from "./OrderItem";
import {useSelector} from "react-redux";
import {useHttp} from "../../functions/http.hook";


const Orders = (props) => {
   const {requestJson} = useHttp()

   const purchaseIds = useSelector(state => state.purchase.purchases)

   useEffect(() => {
      // if (purchaseIds.length > 0) {
      //    (async () => {
      //       const data = await requestJson(
      //          `/purchase/getPurchases`,
      //          'POST',
      //          JSON.stringify({purchases: purchaseIds}),
      //          {'Content-Type': 'application/json'}
      //       )
      //
      //       setPurchases(data)
      //    })()
      // }
   }, [purchaseIds])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={'title'}>Your orders</h1>

            <div className={classes.orders_list}>
               {purchaseIds.length > 0
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
import React from 'react'
import classes from './OrderItem.module.sass'
import ProductItem from "./ProductItem";
import {useMediaQuery} from "react-responsive";


const OrderItem = (props) => {

   const statusColor = props.status === 'success' ?
      '#00A046' : props.status === 'fail' ? '#D2D2D2'
         : '#FFA900'

   const isLaptop = useMediaQuery({minWidth: 768})

   return (
      <div className={classes.container}>
         <div style={{
            position: 'relative',
            padding: isLaptop ? '15px 20px' : '5vw 6vw',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '6px',
            boxShadow: `0 0 8px 1px ${statusColor}`
         }}>
            <div className={classes.topBar}>
               <div className={classes.status_wrapper}>
                  <span className={classes.status_date}>{props.date}</span>

                  <span className={classes.status_status}>
                     {props.status.charAt(0).toUpperCase() + props.status.slice(1)}
                  </span>
               </div>

               <div className={classes.order_sum_wrapper}>
               <span className={classes.sum_title}>
                  Order price
               </span>

                  <span className={classes.sum_price}>
                  {props.orderPrice} ₴
               </span>
               </div>
            </div>


            <div className={classes.bottomBar}>
               <div className={classes.data_wrapper}>
                  <span className={classes.data_item}>{props.data.name}</span>
                  <span className={classes.data_item}>{props.data.phoneNumber}</span>
                  <span className={classes.data_item}>{props.data.email}</span>
               </div>

               <div className={classes.action_wrapper}>
                  <span>Cancel</span>
               </div>
            </div>

            <div className={classes.products_list}>
               {
                  props.products.map((el, i) => (
                     <ProductItem
                        key={i}
                        title={el.title}
                        price={el.price}
                        id={el.id}
                        amount={el.amount}
                        img={el.img}
                     />
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default OrderItem
import React from 'react'
import classes from './OrderItem.module.sass'
import ProductItem from "./ProductItem";


const OrderItem = (props) => {

   const statusColor = props.status === 'success' ?
      '#00A046' : props.status === 'fail' ? '#D2D2D2'
         : '#FFA900'

   return (
      <div className={classes.container}>
         <div style={{
            padding: '5vw 6vw',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '6px',
            boxShadow: `0 0 8px 1px ${statusColor}`
         }}>
            <div className={classes.topBar_wrapper}>
               <span className={classes.topBar_date}>{props.date}</span>

               <span className={classes.topBar_status}>
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

            <div className={classes.data_wrapper}>
               <span className={classes.data_item}>{props.data.name}</span>
               <span className={classes.data_item}>{props.data.phoneNumber}</span>
               <span className={classes.data_item}>{props.data.email}</span>
            </div>

            <hr/>

            {
               props.products.map((el, i) => (
                  <>
                     <ProductItem
                        key={i}
                        title={el.title}
                        price={el.price}
                        id={el.id}
                        amount={el.amount}
                        img={el.img}
                     />
                     <hr/>
                  </>
               ))
            }
         </div>
      </div>
   )
}

export default OrderItem
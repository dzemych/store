import React from 'react'
import '../basicStyles.sass'
import classes from './Orders.module.sass'
import tShirt from '../../img/t-shirt.jpg'
import jeans from '../../img/jeans.jpg'
import square from '../../img/square.jpg'
import OrderItem from "./OrderItem";


const Orders = (props) => {
   const orders = [
      {
         date: '01.02.2022',
         status: 'delivery',
         orderPrice: 1450,
         data: {
            phoneNumber: '+380634134547',
            name: 'Dzemych Ivan',
            email: 'dzemichivan@gmail.com'
         },
         products: [
            {
               title: 'H&M t-shirt',
               price: 500,
               amount: 2,
               id: '41kdjjddf234f',
               img: tShirt
            },
            {
               title: 'Super jeans',
               price: 1100,
               amount: 1,
               id: '41kdsdfaf234f',
               img: jeans
            },
            {
               title: 'Super jeans',
               price: 1100,
               amount: 1,
               id: '68qdsdfaf234f',
               img: square
            }
      ]
      },
      {
         date: '01.02.2022',
         status: 'success',
         orderPrice: 450,
         data: {
            phoneNumber: '+380634134547',
            name: 'Dzemych Ivan',
            email: 'dzemichivan@gmail.com'
         },
         products: [
            {
               title: 'H&M t-shirt',
               price: 500,
               amount: 2,
               id: '41kdjjddf234f',
               img: tShirt
            },
            {
               title: 'Super jeans',
               price: 1100,
               amount: 1,
               id: '41kdsdfaf234f',
               img: jeans
            },
            {
               title: 'Super jeans',
               price: 1100,
               amount: 1,
               id: '68qdsdfaf234f',
               img: square
            }
         ]
      }
   ]

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h1 className={'title'}>Your orders</h1>

            <div className={classes.orders_list}>
               {orders.map((el, i) => (
                  <OrderItem
                     key={i}
                     date={el.date}
                     status={el.status}
                     orderPrice={el.orderPrice}
                     products={el.products}
                     data={el.data}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default Orders
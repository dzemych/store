import React, {useCallback, useEffect, useState} from 'react'
import classes from './OrderItem.module.sass'
import ProductItem from "./ProductItem";
import {useMediaQuery} from "react-responsive";
import {useHttp} from "../../functions/http.hook";


const OrderItem = (props) => {

   const {requestJson} = useHttp()
   const [purchase, setPurchase] = useState({
      status: '___',
      createdAt: '___',
      totalPrice: '___',
      user: {
         name: '___',
         surname: '___',
         email: '___',
         tel: '___'
      },
      products: []
   })
   const [products, setProducts] = useState([])

   const statusColor = purchase.status === 'success'
      ? '#00A046'
      : purchase.status === 'return'
         ? '#D2D2D2'
         : purchase.status === 'canceled'
            ? '#f66767'
            :'#FFA900'

   const isLaptop = useMediaQuery({minWidth: 768})

   const changeStatus = async () => {
      await requestJson(
         `/purchase/${purchase._id}`,
         'PATCH',
         JSON.stringify({status: 'canceled'}),
         {'Content-Type': 'application/json'}
      )

      setPurchase(prev => ({...prev, status: 'canceled'}))
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            `/purchase/${props.id}`
         )

         setPurchase(data.data)
      })()
   }, [props.id])

   useEffect(() => {
      (async () => {
         const ids = purchase.products.reduce((acc, el) => {
            acc.push(el.id)
            return acc
         }, [])

         const data = await requestJson(
            `/product/getProducts`,
            'POST',
            JSON.stringify({products: ids}),
            {'Content-Type': 'application/json'}
         )

         setProducts(data.products)
      })()
   }, [purchase.products])

   const renderProducts = useCallback(() => {
      if (products.length > 0) {
         return purchase.products.map((el, i) => {
            const product = products.find(productEl => productEl._id === el.id)

            return (
               <ProductItem
                  key={i}
                  id={el.id}
                  slug={product.slug}
                  mainPhoto={product.mainPhoto}
                  title={product.title}
                  price={product.price}
                  amount={el.amount}
                  size={el.size}
               />
            )
         })
      }
   }, [products, purchase.products])

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
                  <span className={classes.status_date}>{purchase.date}</span>

                  <span className={classes.status_status}>
                     {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                  </span>
               </div>

               <div className={classes.order_sum_wrapper}>
                  <span className={classes.sum_title}>
                     Сума заказа
                  </span>

                  <span className={classes.sum_price}>
                     {purchase.totalPrice} ₴
                  </span>
               </div>
            </div>


            <div className={classes.bottomBar}>
               <div className={classes.data_wrapper}>
                  <span className={classes.data_item}>
                     {purchase.user.name}&nbsp;
                     {purchase.user.surname}
                  </span>

                  <span className={classes.data_item}>{purchase.user.tel}</span>

                  <span className={classes.data_item}>{purchase.user.email}</span>
               </div>

               <div className={classes.action_wrapper}>
                  {purchase.status === 'processing' &&
                     <span
                        onClick={changeStatus}
                     >
                        Cancel
                     </span>
                  }
               </div>
            </div>

            <div className={classes.products_list}>
               {renderProducts()}
            </div>
         </div>
      </div>
   )
}

export default OrderItem
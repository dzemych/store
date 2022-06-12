import React, {useEffect, useState} from 'react'
import classes from './PurchaseCard.module.sass'
import ProductItem from "./ProductItem";
import {useHttp} from "../../functions/http.hook";


const PurchaseCard = (props) => {
   const {requestJson} = useHttp()

   const [products, setProducts] = useState([])

   console.log(props)
   useEffect(() => {
      (async () => {
         const ids = props.products.map(el => el.id)

         const data = await requestJson(
            '/product/getProducts',
            'POST',
            JSON.stringify({products: ids}),
            {'Content-Type': 'application/json'}
         )

         setProducts(data.products)
      })()
   }, [props.products])

   return (
      <div className={classes.wrapper}>
         <div className={classes.topBar_container}>
            <div className={classes.user_data}>
               <span>
                  {props.user.tel}
               </span>

               <span>
                  {props.user.email}
               </span>

               <span>
                  {props.user.name} {props.user.surname}
               </span>
            </div>

            <div className={classes.delivery_container}>
               <span>
                  {props.delivery.type.slice(0,1).toUpperCase() + props.delivery.type.slice(1)}
               </span>

               {props.delivery.address &&
                  <span>{
                     props.delivery.address.city + ' , ' +
                     props.delivery.address.address
                  }</span>
               }
            </div>

            <div className={classes.order_price}>
               <span>
                  Total price
               </span>

               <span>
                  {props.totalPrice}
               </span>
            </div>
         </div>

         <div className={classes.products_list}>
            {products.length > 0 &&
               products.map((el, i) => (
                  <ProductItem
                     key={i}
                     price={el.price}
                     slug={el.slug}
                     mainPhoto={el.mainPhoto}
                     title={el.title}
                     sex={el.sex}
                     amount={props.products.find(item => item.id === el._id).amount}
                     size={props.products.find(item => item.id === el._id).size}
                  />
            ))}
         </div>
      </div>
   )
}

export default PurchaseCard
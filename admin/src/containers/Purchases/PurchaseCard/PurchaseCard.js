import React, {useContext, useEffect, useState} from 'react'
import classes from './PurchaseCard.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import ItemsList from "./ItemsList/ItemsList";
import {useHttp} from "../../../functions/http.hook";
import {AuthContext} from "../../../context/AuthContext";


const PurchaseCard = (props) => {

   const {requestJson} = useHttp()
   const auth = useContext(AuthContext)

   const [showProducts, setShowProducts] = useState(false)
   const [status, setStatus] = useState(props.status)

   const btnArr = [
      'success',
      'canceled',
      'heading',
      'delivered',
      'payment',
      'processing',
      'return',
   ]

   const fetchStatus = async text => {
      try {
         const response = await requestJson(
            '/purchase/' + props.id,
            'PATCH',
            JSON.stringify({
               status: text
            }),
            {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + auth.user.token
            }
         )

         setStatus(response.data.status)
      } catch (e) {
         console.log(e)
      }
   }

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
                  Total price:
               </span>

               <span>
                  {props.totalPrice}
               </span>
            </div>
         </div>

         <hr className={classes.main_hr}/>

         <div className={classes.status_container}>
            <div className={classes.status_title}>
               <span
                  style={{
                     fontWeight: 500,
                     color: status === 'success'
                        ? '#61ad3b' :
                        status === 'return' || status === 'canceled'
                        ? '#a93939' : '#c4982e'
                  }}
               >
                  {status}
               </span>

               <div className={classes.status_actions}>
                  {btnArr.map((el, i) => (
                     <button
                        key={i}
                        onClick={() => fetchStatus(el)}
                     >
                        {el}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         <hr className={classes.main_hr}/>

         <div className={classes.show_container}>
            <FontAwesomeIcon
               icon={faArrowRight}
               className={[classes.showIcon, showProducts ? classes.showIconDown : ''].join(' ')}
               onClick={() => setShowProducts(prev => !prev)}
            />

            <span>
               {showProducts ? 'Close products' : 'Show products'}
            </span>
         </div>

         {showProducts &&
            <ItemsList
               products={props.products}
            />
         }
      </div>
   )
}

export default PurchaseCard
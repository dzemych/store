import React, {useContext, useEffect, useState} from 'react'
import classes from './Purchases.module.sass'
import {useHttp} from "../../functions/http.hook";
import {AuthContext} from "../../context/AuthContext";
import PurchaseCard from "../../components/PurchaseCard/PurchaseCard";


const Purchases = (props) => {
   const auth = useContext(AuthContext)

   const {requestJson} = useHttp()

   const [purchases, setPurchases] = useState([])

   useEffect(() => {
      (async () => {
         const purchases = await requestJson(
            '/purchase/',
            'GET',
            null,
            {'Authorization': 'Bearer ' + auth.user.token}
         )

         setPurchases(purchases.data)
      })()
   }, [])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            {purchases.length > 0
               ? <div className={classes.purchases_list}>
                  {purchases.map((el, i) => (
                     <PurchaseCard
                        key={i}
                        delivery={{
                           type: el.deliveryType,
                           address: el.deliveryAddress
                        }}
                        totalPrice={el.totalPrice}
                        user={el.user}
                        products={el.products}
                        status={el.status}
                     />
                  ))}
               </div>

               : <span className={classes.noPurchases}>
                  No purchases yet
               </span>
            }
         </div>
      </div>
   )
}

export default Purchases
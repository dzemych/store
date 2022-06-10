import React, {useContext, useEffect, useState} from 'react'
import classes from './Purchases.module.sass'
import {useHttp} from "../../functions/http.hook";
import {AuthContext} from "../../context/AuthContext";


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

         console.log(purchases)
         setPurchases(purchases)
      })()
   }, [])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            {purchases.length > 0
               ? <div className={classes.purchases_list}>

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
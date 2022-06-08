import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {useHttp} from "../../functions/http.hook";


const ProductsList = (props) => {
   const {requestJson} = useHttp()

   const location = useLocation()

   const [products, setProducts] = useState([])
   const [sort, setSort] = useState('-avgRating')

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            `/product${location.search}&page=1&limit=10&` +
            `fields=price,title,slug,avgRating,numRating,mainPhoto,_id,status&` +
            `sort=${sort}`
         )

         setProducts(data.products)
      })()
   }, [location.search])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>

         </div>
      </div>
   )
}

export default ProductsList
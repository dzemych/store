import React,{useEffect, useState} from 'react'
import classes from './ItemsList.module.sass'
import ProductItem from "./ProductItem";
import {useHttp} from "../../../../functions/http.hook";


const ItemsList = (props) => {
   const {requestJson} = useHttp()

   const [products, setProducts] = useState([])

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
   )
}

export default ItemsList
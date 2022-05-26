import React, {useEffect, useState} from 'react'
import classes from './ShoppingCart.module.sass'
import '../basicStyles.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../forms/Button/Button";
import MediaQuery from "react-responsive";
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../functions/http.hook";


const ShoppingCart = (props) => {

   const {requestJson} = useHttp()

   const dispatch = useDispatch()
   const basket = useSelector(state => state.user.basket)

   const [products, setProducts] = useState([])

   useEffect(() => {
      if (basket.length > 0) {
         (async () => {
            const data = await requestJson(
               '/product/getProducts',
               'POST',
               JSON.stringify({products: basket}),
               {'Content-Type': 'application/json'}
            )

            setProducts(data.products)
         })()
      } else {setProducts([])}
   }, [basket])

   return (
      <div className={classes.container}>
         <div className={'wrapper'}>
            <h1 className={'title'}>Shopping cart</h1>

            <div className={classes.body}>
               <div className={classes.products_container}>

                  {products.length > 0
                     ? products.map((el, i, arr) => (
                        <div
                           key={i}
                           className={classes.product_item}
                        >
                           <ProductCard
                              type={'basket'}
                              key={el.slug}
                              slug={el.slug}
                              id={el._id}
                              title={el.title}
                              price={el.price}
                              mainPhoto={el.mainPhoto}
                              avgRarting={el.avgRating}
                              numRating={el.numRating}
                              numSizes={el.numSizes}
                           />
                           {i < arr.length - 1 && <hr className={classes.hr}/>}
                        </div>
                     ))
                     : <div className={classes.noProducts}>
                        <h1>No products</h1>
                     </div>
                  }

               </div>

               <div className={classes.total_container}>
                  <div className={classes.total_amount}>
                     <MediaQuery maxWidth={768}>
                        <span>Total</span>
                     </MediaQuery>

                     <span className={classes.total_price}>
                        {products.reduce((acc, el) => {
                           acc += el.price
                           return acc
                        }, 0)}
                        ₴
                     </span>
                  </div>

                  {products.length > 0 &&
                  <Button type={'bigGreen_button'}>Purchase</Button>}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShoppingCart
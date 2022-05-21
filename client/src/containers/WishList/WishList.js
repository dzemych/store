import React, {useEffect, useState} from 'react'
import classes from './WishList.module.sass'
import ProductCard from "../../components/ProductCard/ProductCard";
import Button from "../../forms/Button/Button";
import '../basicStyles.sass'
import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../functions/http.hook";
import {fetchBasket, fetchWishList} from "../../redux/user/userAction";
import {pushToBasket, removeFromWishList} from "../../redux/user/userReducer";


const WishList = (props) => {

   const wishList = useSelector(state => state.user.wishList)
   const isAuth = useSelector(state => state.user.token)

   const dispatch = useDispatch()

   const {requestJson, loading} = useHttp()

   const [products, setProducts] = useState([])

   const buyAll = () => {
      if (isAuth) {
         dispatch(fetchWishList({id: wishList, type: 'remove'}))
         dispatch(fetchBasket({id: wishList, type: 'push'}))
      } else {
         dispatch(removeFromWishList(wishList))
         dispatch(pushToBasket(wishList))
      }
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            `/product/getProducts`,
            'POST',
            JSON.stringify({products: wishList}),
            {'Content-Type': 'application/json'}
         )

         console.log(data)
         setProducts(data.products)
      })()
   }, [wishList])

   return (
      <div className={'container'}>
         <div className={classes.wrapper}>
            <h1 className={'title'}>Your wish list</h1>

            <div className={classes.actions_container}>
               <span
                  className={classes.action_btn}
                  onClick={() => buyAll()}
               >Buy all</span>
               <span
                  className={classes.action_btn}
                  onClick={() => dispatch(removeFromWishList(wishList))}
               >Delete all</span>
            </div>

            <div className={classes.products_list}>
               {wishList.length > 0
                  ? products.map((item, i) => (
                     <ProductCard
                        id={item._id}
                        slug={item.slug}
                        title={item.title}
                        price={item.price}
                        mainPhoto={item.mainPhoto}
                        avgRating={item.avgRating}
                        numRating={item.numRating}
                        key={props.slug}
                     />
                  ))
                  : <div className={classes.noProducts}>
                     <h1>No products</h1>
                  </div>
               }
            </div>

            <hr className={classes.hr}/>

            <div className={classes.sum_container}>
               <div className={classes.sum_left}>
                  <span className={classes.sum_num}>
                     {products.length} goods worth
                  </span>
                  <span className={classes.sum_price}>
                     {products.reduce((acc, el) => {
                        acc += el.price
                        return acc
                     }, 0)} ₴
                  </span>
               </div>

               <div
                  className={classes.sum_right}
                  onClick={() => buyAll()}
               >
                  <Button type={'bigGreen_button'}>Buy all</Button>
               </div>
            </div>

            <hr className={classes.hr}/>
         </div>
      </div>
   )
}

export default WishList
import React, {useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchBasket, fetchWishList} from "../redux/user/userAction";
import {
   pushToBasket,
   pushToWishList,
   removeFromBasket,
   removeFromWishList,
   updateLocalStorage
} from "../redux/user/userReducer";
import {useLocation, useNavigate} from "react-router-dom";


const useWishAndBasketList = (productId) => {

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const wishList = useSelector(state => state.user.wishList)
   const basket = useSelector(state => state.user.basket)
   const isAuth = useSelector(state => state.user.token)

   const location = useLocation()

   const basketHandler = () => {
      if (!basket.includes(productId)){

         if (isAuth) {
            dispatch(fetchBasket({id: productId, type: 'push'}))
         } else {
            dispatch(pushToBasket(productId))
            dispatch(updateLocalStorage('basket'))
         }

      } else {

         if (location.pathname.includes('shopping-cart')) {
            if (isAuth) {
               dispatch(fetchBasket({id: productId, type: 'remove'}))
            } else {
               dispatch(removeFromBasket(productId))
               dispatch(updateLocalStorage('basket'))
            }
         } else {
            navigate('/shopping-cart')
         }

      }
   }

   const wishListHandler = () => {
      if (wishList.includes(productId)){

         if (isAuth) {
            dispatch(fetchWishList({id: productId, type: 'remove'}))
         } else {
            dispatch(removeFromWishList(productId))
            dispatch(updateLocalStorage('wishList'))
         }

      } else {

         if (isAuth) {
            dispatch(fetchWishList({id: productId, type: 'push'}))
         } else {
            dispatch(pushToWishList(productId))
            dispatch(updateLocalStorage('wishList'))
         }

      }
   }

   const isWish = useMemo(() => (wishList.includes(productId)), [wishList, productId])
   const isBasket = useMemo(() => (basket.includes(productId)), [basket, productId])

   return {basketHandler, wishListHandler, isWish, isBasket}
}

export default useWishAndBasketList
import React, {useEffect, useState} from 'react'
import classes from './ProductCard.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faHeartCirclePlus,
   faStar,
   faStarHalfAlt,
   faShoppingCart,
   faHeartCircleMinus,
   faCheck
} from "@fortawesome/free-solid-svg-icons";
import defaultPhoto from "../../img/no-image.png"
import ReactStars from "react-rating-stars-component";
import {useMediaQuery} from "react-responsive";
import {useHttp} from "../../functions/http.hook";
import {useNavigate} from "react-router-dom";
import useWishAndBasketList from "../../functions/useWishAndBasketList.hook";


const ProductCard = React.forwardRef((props, ref) => {

   const {requestImg} = useHttp()
   const navigate = useNavigate()
   const {wishListHandler, basketHandler, isBasket, isWish} = useWishAndBasketList(props.id)

   const [img, setImg] = useState(defaultPhoto)
   const [status, setStatus] = useState('idle')

   const isTablet = useMediaQuery({ minWidth: 425 })
   const isBigScreen = useMediaQuery({minWidth: 1440})

   const icon = isWish ? faHeartCircleMinus : faHeartCirclePlus

   const ratingStars = {
      size: isBigScreen ? 16 : isTablet ? 14 : 11,
      count: 5,
      edit: false,
      color: "#D2D2D2",
      activeColor: "#FFA900",
      value: props.avgRating,
      isHalf: true,
      emptyIcon: <FontAwesomeIcon icon={faStar}/>,
      halfIcon: <FontAwesomeIcon icon={faStarHalfAlt}/>,
      filledIcon: <FontAwesomeIcon icon={faStar}/>,
   }

   const openProductHandler = slug => {
      navigate('/products/' + slug)
   }

   const basketClick = () => {
      if (props.status === 'active')
         basketHandler()
   }

   const wishClick = () => {
      wishListHandler()
   }

   useEffect(() => {
      if (status === 'idle') {
         if (props.mainPhoto) {
            (async () => {
               try {
                  const imgUrl = await requestImg(
                     `/img/product/${props.slug}/${props.mainPhoto}`
                  )

                  setImg(imgUrl)
                  setStatus('success')
               } catch (e) {
                  setStatus('error')
               }
            })()
         }
      }
   }, [props.mainPhoto, requestImg, props.slug])

   return (
      <div className={classes.productCard_container} ref={ref}>
         <div className={classes.wrapper}>
            {props.sex &&
               <div className={classes.product_sex}>
                  <span>
                     {props.sex.slice(0,1).toUpperCase()}{props.sex.slice(1)}
                  </span>
               </div>
            }

            <FontAwesomeIcon
               icon={icon}
               className={classes.heartIcon}
               onClick={() => wishClick()}
            />

            <div
               className={classes.img_container}
               onClick={() => openProductHandler(props.slug)}
            >
               <img src={img}
                    alt='product img'
               />
            </div>

            <div
               className={classes.title}
               onClick={() => openProductHandler(props.slug)}
            >
               {props.title}
            </div>

            {props.numRating > 0 && props.avgRating > 0
               ? <div className={classes.rating}>
                  <ReactStars {...ratingStars} />

                  <span className={classes.rating_num}>
                     {props.numRating}
                  </span>
               </div>
               : <div
                  className={classes.leave_rating}
                  onClick={() => openProductHandler(props.slug)}
               >
                  <span>Leave rating</span>
               </div>
            }

            <div className={classes.price_container}>
               <div className={classes.price}>
                  {props.price} ₴
               </div>

               <FontAwesomeIcon
                  icon={isBasket
                     ? faCheck
                     : faShoppingCart
                  }
                  className={classes.shoppingCart_icon}
                  onClick={() => basketClick()}
                  aria-disabled={props.status !== 'active'}
               />
            </div>
         </div>
      </div>
   )
})

export default ProductCard
import React, {useEffect, useState} from 'react'
import classes from './ProductCard.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faHeartCirclePlus,
   faTrash,
   faMinus,
   faPlus, faStar, faStarHalfAlt, faShoppingCart, faHeartCircleMinus, faCheck
} from "@fortawesome/free-solid-svg-icons";
import defaultPhoto from "../../img/no-image.png"
import ReactStars from "react-rating-stars-component";
import {useMediaQuery} from "react-responsive";
import {useHttp} from "../../functions/http.hook";
import {useNavigate} from "react-router-dom";
import {fetchBasket, fetchWishList} from "../../redux/user/userAction";
import {useDispatch, useSelector} from "react-redux";
import {pushToBasket, pushToWishList, removeFromBasket, removeFromWishList} from "../../redux/user/userReducer";


const ProductCard = React.forwardRef((props, ref) => {

   const {requestImg} = useHttp()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const wishList = useSelector(state => state.user.wishList)
   const basket = useSelector(state => state.user.basket)

   const isAuth = useSelector(state => state.user.token)
   const [img, setImg] = useState(null)
   const [amount, setAmount] = useState(1)
   const [status, setStatus] = useState('idle')

   const isTablet = useMediaQuery({ minWidth: 425 })
   const isBigScreen = useMediaQuery({minWidth: 1440})

   const changeAmount = (e, type) => {
      e.preventDefault()

      if (type === 'plus')
         setAmount(prev => prev + 1)

      if (type === 'minus')
         setAmount(prev => Math.max(1, prev - 1))

      if (!type)
         setAmount(Math.max(e.target.value, 1))
   }

   let icon
   switch (props.type) {
      case 'basket':
         icon = faTrash
         break
      case 'wish':
         icon = faHeartCircleMinus
         break

      default:
         if (wishList.includes(props.id)) {
            icon = faHeartCircleMinus
            break
         }
         icon = faHeartCirclePlus
   }

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

   const wishListHandler = () => {
      if (isAuth) {
         if (wishList.includes(props.id)) {
            dispatch(fetchWishList({id: props.id, type: 'remove'}))
         } else {
            dispatch(fetchWishList({id: props.id, type: 'push'}))
         }
      } else {
         if (wishList.includes(props.id)) {
            dispatch(removeFromWishList(props.id))
         } else {
            dispatch(pushToWishList(props.id))
         }
      }
   }

   const basketHandler = () => {
      if (!basket.includes(props.id)){
         if (isAuth) {
            dispatch(fetchBasket({id: props.id, type: 'push'}))
         } else {
            dispatch(pushToBasket(props.id))
         }
      } else {
         navigate('/shopping-cart')
      }
   }

   useEffect(() => {
      if (status === 'idle') {
         if (props.mainPhoto) {
            (async () => {
               try {
                  const data = await requestImg(
                     `/img/product/${props.slug}/${props.mainPhoto}`,
                     'GET', null, {
                        referrerPolicy: 'no-referrer-when-downgrade',
                        contentType: 'image/jpeg'
                     }
                  )

                  setStatus('success')

                  const blob = await data.blob()
                  setImg(URL.createObjectURL(blob))
               } catch (e) {
                  setStatus('error')
               }
            })()
         }
      }
   }, [props.mainPhoto, requestImg, props.slug])

   return (
      <div className={
         props.type === 'basket'
            ? classes.basket_container
            : classes.simple_container} ref={ref}>
         <div className={classes.wrapper}>
            <FontAwesomeIcon
               icon={icon}
               className={classes.heartIcon}
               onClick={() => wishListHandler()}
            />

            {props.type !== 'basket'
               ? <>
                  <div
                     className={classes.img_container}
                     onClick={() => openProductHandler(props.slug)}
                  >
                     <img src={props.mainPhoto ? img : defaultPhoto}
                          alt='product img'
                     />
                  </div>

                  <div
                     className={classes.title}
                     onClick={() => openProductHandler(props.slug)}
                  >{props.title}</div>

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
                        icon={basket.includes(props.id)
                           ? faCheck
                           : faShoppingCart
                        }
                        className={classes.shoppingCart_icon}
                        onClick={() => basketHandler()}
                     />
                  </div>
               </>
               : <>
                  <div className={classes.topBar}>
                     <div className={classes.basket_img_container}>
                        <img src={props.mainPhoto ? img : defaultPhoto}
                             alt='img'
                             onClick={() => openProductHandler(props.slug)}
                        />
                     </div>

                     <span
                        className={classes.basket_title}
                        onClick={() => openProductHandler(props.slug)}
                     >
                        {props.title}
                     </span>
                  </div>

                  <div className={classes.bottomBar}>
                     <div className={classes.counter}>
                        <FontAwesomeIcon
                           icon={faMinus}
                           className={
                              [classes.counter_minus,
                               amount < 2 && classes.counter_disabled].join(' ')
                           }
                           aria-disabled={amount < 2}
                           onClick={e => changeAmount(e, 'minus')}
                        />

                        <input
                           type="number"
                           className={classes.counter_input}
                           value={amount}
                           onChange={e => changeAmount(e)}
                        />

                        <FontAwesomeIcon
                           icon={faPlus}
                           className={classes.counter_plus}
                           onClick={e => changeAmount(e, 'plus')}
                        />
                     </div>

                     <div className={classes.basket_price}>
                        {props.price}₴
                     </div>
                  </div>
               </>
            }

         </div>
      </div>
   )
})

export default ProductCard
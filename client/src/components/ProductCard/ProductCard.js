import React, {useEffect, useState} from 'react'
import classes from './ProductCard.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faHeartCirclePlus,
   faTrash,
   faMinus,
   faPlus, faStar, faStarHalfAlt, faShoppingCart, faHeartCircleMinus
} from "@fortawesome/free-solid-svg-icons";
import defaultPhoto from "../../img/no-image.png"
import ReactStars from "react-rating-stars-component";
import {useMediaQuery} from "react-responsive";
import {useHttp} from "../../functions/http.hook";


const ProductCard = React.forwardRef((props, ref) => {

   const {getImg} = useHttp()

   const [img, setImg] = useState(null)
   const [amount, setAmount] = useState(1)

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

      default: icon = faHeartCirclePlus
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

   useEffect(() => {
      if (props.mainPhoto) {
         (async () => {
            const data = await getImg(
               `/img/product/${props.slug}/${props.mainPhoto}`,
               'GET', null, {
                  referrerPolicy: 'no-referrer-when-downgrade',
                  contentType: 'image/jpeg'
               }
            )

            const blob = await data.blob()

            setImg(URL.createObjectURL(blob))
         })()
      }
   }, [props.mainPhoto, getImg, props.slug])

   return (
      <div className={
         props.type === 'basket'
            ? classes.basket_container
            : classes.simple_container} ref={ref}>
         <div className={classes.wrapper}>
            <FontAwesomeIcon
               icon={icon}
               className={classes.heartIcon}
            />

            {props.type !== 'basket'
               ? <>
                  <div className={classes.img_container}>
                     <img src={props.mainPhoto ? img : defaultPhoto}
                          alt='product img'
                     />
                  </div>

                  <div className={classes.title}>{props.title}</div>

                  {props.numRating > 0 && props.avgRating > 0
                     ? <div className={classes.rating}>
                        <ReactStars {...ratingStars} />

                        <span className={classes.rating_num}>
                           {props.numRating}
                        </span>
                     </div>
                     : <div className={classes.leave_rating}>
                        <span>Leave rating</span>
                     </div>
                  }

                  <div className={classes.price_container}>
                     <div className={classes.price}>
                        {props.price} ₴
                     </div>

                     <FontAwesomeIcon
                        icon={faShoppingCart}
                        className={classes.shoppingCart_icon}
                     />
                  </div>
               </>
               : <>
                  <div className={classes.topBar}>
                     <div className={classes.basket_img_container}>
                        <img src={props.imgPath ? props.imgPath : defaultPhoto}
                             alt='img'
                        />
                     </div>

                     <span className={classes.basket_title}>
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
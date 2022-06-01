import React, {useEffect, useState} from 'react'
import classes from "./ProductCard.module.sass";
import defaultPhoto from "../../img/no-image.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import RadioBox from "../../forms/RadioBox/RadioBox";
import useWishAndBasketList from "../../functions/useWishAndBasketList.hook";
import {useHttp} from "../../functions/http.hook";
import {useNavigate} from "react-router-dom";


const ShoppingCart = (props) => {

   const {requestImg} = useHttp()
   const navigate = useNavigate()

   const [img, setImg] = useState(defaultPhoto)
   const [amount, setAmount] = useState(1)
   const [curSize, setCurSize ] = useState(() => (
      Object.keys(props.numSizes).find(key => props.numSizes[key] > 0)
   ))
   const [sizeAmount, setSizeAmount] = useState(0)

   const {basketHandler} = useWishAndBasketList(props.id)

   const iconClickHandler = () => {
      basketHandler(props.id)
   }

   const openProductHandler = slug => {
      navigate('/products/' + slug)
   }

   const changeAmount = (value) => {
      if (value === 'minus')
         if (amount - 1 > 0)
            setAmount(prev => prev - 1)

      if (value === 'plus')
         if (sizeAmount >= amount + 1)
            setAmount(prev => prev + 1)

      if (+value)
         if (sizeAmount > value && value > 0) {
            setAmount(value)
         } else {
            setAmount(sizeAmount)
         }

      if (+value === 0)
         setAmount(1)
   }

   useEffect(() => {
      props.setSize(prev => (
         {
            ...prev,
            [props.id]: {size: curSize, amount}
         }
         ))
   }, [amount, curSize])

   useEffect(() => {
      if (props.mainPhoto) {
         (async () => {
            try {
               const img = await requestImg(
                  `/img/product/${props.slug}/${props.mainPhoto}`,
               )

               setImg(img)
            } catch (e) {
               console.log(e)
            }
         })()
      }
   }, [props.mainPhoto, requestImg, props.slug])

   useEffect(() => {
      if (!curSize)
         basketHandler()

      if (props.numSizes)
         setSizeAmount(props.numSizes[curSize])
   }, [curSize])

   useEffect(() => {
      if (amount > sizeAmount && sizeAmount > 0)
         setAmount(sizeAmount)
   }, [sizeAmount])

   return (
      <div className={classes.basket_container}>
         <div className={classes.wrapper}>
            <FontAwesomeIcon
               icon={faTrash}
               className={classes.heartIcon}
               onClick={() => iconClickHandler()}
            />

            <div className={classes.topBar}>
               <div className={classes.basket_img_container}>
                  <img src={img}
                       alt='img'
                       onClick={() => openProductHandler(props.slug)}
                  />
               </div>

               <div className={classes.basket_main}>
                  <span
                     className={classes.basket_title}
                     onClick={() => openProductHandler(props.slug)}
                  >
                     {props.title}
                  </span>

                  <div className={classes.basket_sizes}>
                     {
                        Object.keys(props.numSizes).map(el => (
                           <RadioBox
                              key={`${props.slug}_${el}`}
                              value={el}
                              id={`${props.slug}_${el}`}
                              checked={el === curSize}
                              onChange={() => setCurSize(el)}
                              available={props.numSizes[el]}
                           />
                        ))
                     }
                  </div>
               </div>
            </div>

            <div className={classes.bottomBar}>
               <div className={classes.counter}>
                  <FontAwesomeIcon
                     icon={faMinus}
                     className={
                        [classes.counter_minus,
                         amount < 2 && classes.counter_disabled].join(' ')
                     }
                     onClick={() => changeAmount('minus')}
                  />

                  <input
                     type="number"
                     className={classes.counter_input}
                     value={amount}
                     onChange={e => setAmount(e.target.value)}
                     onBlur={e => changeAmount(e.target.value)}
                  />

                  <FontAwesomeIcon
                     icon={faPlus}
                     className={
                        [classes.counter_minus,
                         sizeAmount === amount && classes.counter_disabled].join(' ')
                     }
                     onClick={() => changeAmount('plus')}
                  />
               </div>

               <div className={classes.basket_price}>
                  {props.price}₴
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShoppingCart
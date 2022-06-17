import React, {useEffect, useState} from 'react'
import classes from './ProductItem.module.sass'
import {useHttp} from "../../functions/http.hook";
import defaultPhoto from '../../img/no-image.png'
import {useNavigate} from "react-router-dom";


const ProductItem = (props) => {
   const {requestImg} = useHttp()
   const navigate = useNavigate()

   const [img, setImg] = useState(defaultPhoto)

   const openProduct = () => {
      navigate('/products/' + props.slug)
   }

   useEffect(() => {
      (async () => {
         const img = await requestImg(
            `/img/product/${props.slug}/${props.mainPhoto}`
         )

         if (img)
            setImg(img)
      })()
   }, [props.slug, props.mainPhoto])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.topBar_wrapper}>
               <div className={classes.img_container}>
                  <img
                     src={img}
                     alt=""
                     onClick={openProduct}
                  />
               </div>

               <div
                  className={classes.topBar_title}
                  onClick={openProduct}
               >
                  <span>{props.title}</span>
               </div>
            </div>

            <div className={classes.sum_wrapper}>
               <div className={classes.sum_item}>
                  <span className={classes.item_title}>Цена</span>

                  <span className={classes.item_value}>{props.price} ₴</span>
               </div>

               <div className={classes.sum_item}>
                  <span className={classes.item_title}>Количество</span>

                  <span className={classes.item_value}>{props.amount}</span>
               </div>

               <div className={classes.sum_item}>
                  <span className={classes.item_title}>В целом</span>

                  <span className={classes.item_value}>
                     {props.amount * props.price} ₴
                  </span>
               </div>
            </div>

            <div className={classes.totals_wrapper}>
               <div className={classes.totals_item}>
                  <span className={classes.total_title}>Оплата</span>

                  <span>При получении</span>
               </div>

               <div className={classes.totals_item}>
                  <span className={classes.total_title}>В целом</span>

                  <span className={classes.total_price}>{props.price * props.amount} ₴</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductItem
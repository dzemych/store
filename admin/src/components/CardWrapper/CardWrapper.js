import React, {useEffect, useState} from 'react'
import classes from './CardWrapper.module.sass'
import {useHttp} from "../../functions/http.hook";
import defaultPhoto from "../../img/no-image.png";


const CardWrapper = (props) => {

   const { requestImg } = useHttp()

   const [photo, setPhoto] = useState(defaultPhoto)

   useEffect(() => {
      if (props.mainPhoto) {
         (async () => {
            const {imgUrl} = await requestImg(
               `/img/product/${props.slug}/${props.mainPhoto}`
            )

            setPhoto(imgUrl)
         })()
      }
   }, [props.mainPhoto, props.slug])

   return (
      <div className={classes.wrapper}>
         <div className={classes.topBar_container}>
            <div className={classes.img_container}>
               <img src={photo} alt=""/>
            </div>

            <div className={classes.product_title}>
               {props.title} ({props.sex})
            </div>

            <div className={classes.product_price}>
               {props.price} ₴
            </div>
         </div>

         {props.children}
      </div>
   )
}

export default CardWrapper
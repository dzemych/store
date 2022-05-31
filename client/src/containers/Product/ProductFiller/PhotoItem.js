import React, {useEffect, useState} from 'react'
import classes from "./Review.module.sass";
import defaultPhoto from '../../../img/no-image.png'
import {useHttp} from "../../../functions/http.hook";


const PhotoItem = ({el, slug}) => {

   const {requestImg} = useHttp()

   const [photo, setPhoto] = useState(null)

   useEffect(() => {
      if (slug && el) {
         try {
            (async () => {
               const img = await requestImg(`/img/product/${slug}/${el}`)

               setPhoto(img)
            })()
         } catch(e) {
            console.log(e)
         }
      }

   }, [slug, el])

   return (
      <div className={classes.photo_wrapper}>
         <img src={photo ? photo : defaultPhoto} alt=""/>
      </div>
   )
}

export default PhotoItem
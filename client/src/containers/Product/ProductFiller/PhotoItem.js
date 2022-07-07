import React, {useEffect, useState} from 'react'
import classes from "./Review.module.sass";
import defaultPhoto from '../../../img/no-image.png'
import {useHttp} from "../../../functions/http.hook";
import Loading from "../../../components/Loading/Loading";


const PhotoItem = ({el, slug, onLoad, onClick}) => {

   const {requestImg, loading} = useHttp()

   const [photo, setPhoto] = useState(defaultPhoto)

   useEffect(() => {
      if (slug && el) {
         try {
            (async () => {
               const img = await requestImg(`/img/product/${slug}/${el}`)

               setPhoto(img)
               onLoad(img)
            })()
         } catch(e) {
            console.log(e)
         }
      }

   }, [slug, el])

   return (
      <div className={classes.photo_wrapper}>
         {loading ?
            <Loading color={'gray'}/> :
            <img src={photo} alt="" onClick={onClick}/>
         }
      </div>
   )
}

export default PhotoItem
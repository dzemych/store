import React, {useEffect, useState} from 'react'
import classes from "./Review.module.sass";
import Slider, {SliderItem} from "../../../components/Slider/Slider";
import RadioBox from "../../../forms/RadioBox/RadioBox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faCartShopping, faCheck,
   faCircleCheck, faHeartCircleMinus,
   faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../forms/Button/Button";
import MediaQuery from "react-responsive";
import {useSelector} from "react-redux";
import PhotoItem from "./PhotoItem";
import useWishAndBasketList from "../../../functions/useWishAndBasketList.hook";
import PhotoSlider from "../../../components/PhotoSlider/PhotoSlider";


const Review = (props) => {
   const [curSize, setCurSize] = useState('s')

   const product = useSelector(state => state.product.product)
   const status = useSelector(state => state.product.status)

   const [photos, setPhotos] = useState({})
   const [photoPage, setPhotoPage] = useState(null)

   const {wishListHandler, basketHandler, isWish, isBasket} = useWishAndBasketList(product._id)

   useEffect(() => {
      if (product.status === 'active') {

         setCurSize(() => (
            Object.keys(product.numSizes).find(key => (
               product.numSizes[key] > 0 && key
            ))
         ))

      } else {
         setCurSize(' ')
      }
   }, [product])

   const basketClick = () => {
      if (product.status === 'active')
         basketHandler()
   }

   const wishClick = () => {
      if (product.status === 'active')
         wishListHandler()
   }

   const onLoadPhoto = (photo, i) => {
      setPhotos(prev => ({
         ...prev,
         [i]: photo
      }))
   }

   const openPhoto = i => {
      setPhotoPage(i)
   }

   const onClose = () => {
      setPhotoPage(null)
   }

   return (
      <div className={classes.container}>
         <MediaQuery maxWidth={768}>
            <hr className={classes.main_hr}/>
         </MediaQuery>

         {typeof photoPage === 'number' &&
            <PhotoSlider
               page={photoPage}
               onClose={onClose}
               photos={photos}
            />
         }

         <div className={classes.photo_slider_container}>
            <Slider slides={1}>
               {
                  status === 'success' &&
                  product.photos && product.photos.length > 0
                  ? product.photos.map((el, i) => (
                        <SliderItem slides={1} key={i}>
                           <PhotoItem
                              el={el}
                              slug={product.slug}
                              onLoad={photo => onLoadPhoto(photo, i)}
                              onClick={() => openPhoto(i)}
                           />
                        </SliderItem >
                     ))
                  : <SliderItem>
                       <PhotoItem/>
                    </SliderItem>
               }
            </Slider>
         </div>

         <MediaQuery maxWidth={768}>
            <hr className={classes.main_hr}/>
         </MediaQuery>

         <div className={classes.data_wrapper}>
            <div className={classes.size_container}>
               <span className={classes.size_title}>Размеры:</span>

               <div className={classes.sizes_items}>
                  {
                     Object.keys(product.numSizes).map(el => {
                        return (
                           <RadioBox
                              value={el}
                              id={el}
                              checked={el === curSize}
                              onChange={() => setCurSize(el)}
                              available={product.numSizes[el]}
                              key={el}
                           />
                        )
                     })
                  }
               </div>
            </div>

            <div
               className={
                  classes.status_container + ` ${
                     (product.status !== 'active')
                     && classes.unAvailable
                  }`
               }
            >
               <FontAwesomeIcon icon={faCircleCheck}/>

               <span>
                  {product.status === 'active'
                     ? 'В наличии' :
                     product.status === 'nosizes' ?
                        'Нет размеров': 'Недоступен'
                  }
               </span>
            </div>

            <div className={classes.action_container}>
               <div className={classes.action_top}>
                  <span>{product.price} ₴</span>

                  <FontAwesomeIcon
                     aria-disabled={product.status !== 'active'}
                     icon={isWish ? faHeartCircleMinus : faHeartCirclePlus}
                     onClick={() => wishClick()}
                  />
               </div>

               <Button
                  type={'wideBlue_button'}
                  onClickHandler={() => basketClick()}
                  disabled={product.status !== 'active'}
               >
                  <FontAwesomeIcon
                     icon={isBasket ? faCheck : faCartShopping}
                     style={{
                        fontSize: "5vw",
                        marginRight: "2vw"
                     }}/>

                  {isBasket ? 'В корзине' : 'Купить'}
               </Button>
            </div>

            <div className={classes.bottomData_wrapper}>
               <div className={classes.features_container}>
                  <div className={classes.title_container}>
                     <span className={classes.features_first}>
                        Характеристики
                     </span>

                     <span className={classes.features_second}>
                        &nbsp;{product.title}
                     </span>
                  </div>

                  <div className={classes.features_table}>
                     {
                        status === 'success' &&
                        Object.keys(product.features).map((key, i) => (
                           <div
                              className={classes.table_row}
                              key={i}
                           >
                              <span className={classes.table_left}>
                                 {product.features[key].titleRus}:
                              </span>

                              <span className={classes.table_right}>
                                 {product.features[key].textRus}
                              </span>
                           </div>
                        ))
                     }
                  </div>
               </div>

               <MediaQuery maxWidth={768}>
                  <hr className={classes.main_hr}/>
               </MediaQuery>

               <div className={classes.description_container}>
                  <div className={classes.title_container}>
                     <span className={classes.features_first}>
                        Описание
                     </span>

                     <span className={classes.features_second}>
                        &nbsp;{product.title}
                     </span>
                  </div>

                  <div className={classes.description_text}>
                     <span>
                        {product.description}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Review
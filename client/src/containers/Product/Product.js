import React from 'react'
import classes from './Product.module.sass'
import ReactStars from "react-rating-stars-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import '../basicStyles.sass'
import Slider, {SliderItem} from "../../components/Slider/Slider";
import jeans from '../../img/jeans.jpg'
import tShirt from '../../img/t-shirt.jpg'
import square from '../../img/square.jpg'


const Product = (props) => {
   const ratingStars = {
      size: "10vw",
      count: 5,
      edit: false,
      color: "#D2D2D2",
      activeColor: "#FFA900",
      value: 3.5,
      isHalf: true,
      emptyIcon: <FontAwesomeIcon icon={faStar}/>,
      halfIcon: <FontAwesomeIcon icon={faStarHalfAlt}/>,
      filledIcon: <FontAwesomeIcon icon={faStar}/>,
   }

   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <div className={classes.product_top}>
               <h1 className={classes.product_title}>Product name for amazing good like t-shirt or jeans</h1>
               
               <div className={classes.all_reviews}>
                  <ReactStars {...ratingStars} />

                  <span className={classes.review_number}>
                     731 review
                  </span>
               </div>
            </div>

            <div className={classes.photo_slider_container}>
               <Slider slides={1}>
                  <SliderItem slides={1}>
                     <div className={classes.photo_wrapper}>
                        <img src={jeans} alt=""/>
                     </div>
                  </SliderItem >

                  <SliderItem slides={1}>
                     <div className={classes.photo_wrapper}>
                        <img src={tShirt} alt=""/>
                     </div>
                  </SliderItem>

                  <SliderItem slides={1}>
                     <div className={classes.photo_wrapper}>
                        <img src={square} alt=""/>
                     </div>
                  </SliderItem>
               </Slider>
            </div>
         </div>
      </div>
   )
}

export default Product
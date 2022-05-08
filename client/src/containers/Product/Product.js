import React, {useState} from 'react'
import classes from './Product.module.sass'
import ReactStars from "react-rating-stars-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import '../basicStyles.sass'
import RecentlySlider from "../../components/Slider/RecentlySlider";
import Review from "./ProductFiller/Review";
import Ratings from "./ProductFiller/Ratings";


const getProductFiller = (page) => {
   switch (page) {
      case 'review':
         return <Review/>
      case 'ratings':
         return <Ratings/>

      default: return <Review/>
   }
}

const Product = (props) => {
   const [activePage, setPage] = useState('review')

   const ratingStars = {
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

   const pages = [
      {key: 'Review', value: 'review'},
      {key: 'Ratings', value: 'ratings'},
      {key: 'Questions', value: 'questions'},
      {key: 'Ask a question', value: 'askQuestion'},
      {key: 'Leave a review', value: 'leaveReview'}
   ]

   return (
      <div className={classes.container}>
         <div className={'wrapper'}>
            <div className={classes.product_top}>
               <h1 className={classes.product_title}>
                  Product name for amazing good like t-shirt or jeans
               </h1>
               
               <div className={classes.all_reviews}>
                  <ReactStars {...ratingStars} />

                  <span className={classes.review_number}>
                     731 review
                  </span>
               </div>
            </div>

            <div className={classes.nav_container}>
               <div className={classes.nav_list}>
                  {
                     pages.map((el, i) => (
                        <span
                           key={i}
                           className={`${classes.nav_item} ${
                              el.value === activePage ? 
                              classes.nav_item_active :
                              ''   
                           }`}
                           onClick={() => setPage(el.value)}
                        >
                           {el.key}
                        </span>
                     ))
                  }
               </div>
            </div>

            {getProductFiller(activePage)}

            <hr className={classes.recent_hr}/>

            <RecentlySlider/>

            <hr className={classes.main_hr}/>
         </div>
      </div>
   )
}

export default Product
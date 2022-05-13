import React, {useState} from 'react'
import classes from './Product.module.sass'
import ReactStars from "react-rating-stars-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import '../basicStyles.sass'
import RecentlySlider from "../../components/Slider/RecentlySlider";
import ProductFiller from "./ProductFiller";
import {useMediaQuery} from "react-responsive";


const Product = (props) => {
   const [activePage, setPage] = useState('review')

   const isTablet = useMediaQuery({minWidth: 768})

   const ratingStars = {
      size: isTablet ? 20 : '',
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
      {key: 'Leave a review', value: 'leaveRating'}
   ]

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.product_topBar}>
               <div className={classes.product_title_container}>
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
            </div>

            <ProductFiller
               page={activePage}
               title={'Product name for amazing good like t-shirt or jeans'}
            />

            <hr className={classes.recent_hr}/>

            <div className={classes.recently_container}>
               <RecentlySlider />
            </div>

            <hr className={classes.main_hr}/>
         </div>
      </div>
   )
}

export default Product
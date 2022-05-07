import React, {useState} from 'react'
import classes from './Product.module.sass'
import ReactStars from "react-rating-stars-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faCartShopping,
   faCircleCheck,
   faHeartCirclePlus,
   faStar,
   faStarHalfAlt
} from "@fortawesome/free-solid-svg-icons";
import '../basicStyles.sass'
import Slider, {SliderItem} from "../../components/Slider/Slider";
import jeans from '../../img/jeans.jpg'
import tShirt from '../../img/t-shirt.jpg'
import square from '../../img/square.jpg'
import RadioBox from "../../forms/RadioBox/RadioBox";
import Button from "../../forms/Button/Button";
import RecentlySlider from "../../components/Slider/RecentlySlider";


const Product = (props) => {
   const [curSize, setCurSize] = useState('s')
   const [activePage, setPage] = useState('review')

   const availableSizes = ['xs', 's', 'm', 'l', 'xl']
   const photos = [jeans, tShirt, square]

   const features = [
      {key: 'Size', value: curSize.toUpperCase()},
      {key: 'Season', value: 'Summer'},
      {key: 'Style', value: 'Every day'},
      {key: 'Warrant', value: '14 days'}
   ]

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

   const products = [
      {
         type: 'basket',
         title: "Amazing and cute jeans",
         price: 850,
         img: jeans
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
         img: square
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
         img: tShirt
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
      },
      {
         type: 'basket',
         title: "Fancy T-shirt",
         price: 500,
      }
   ]

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

            <hr className={classes.main_hr}/>

            <div className={classes.photo_slider_container}>
               <Slider slides={1}>

                  {photos.map((el, i) => (
                     <SliderItem slides={1} key={i}>
                        <div className={classes.photo_wrapper}>
                           <img src={el} alt=""/>
                        </div>
                     </SliderItem >
                  ))}
               </Slider>
            </div>

            <hr className={classes.main_hr}/>

            <div className={classes.size_container}>
               <span className={classes.size_title}>Sizes:</span>

               <div className={classes.sizes_items}>
                  {
                     availableSizes.map((el, i) => (
                        <RadioBox
                           value={el}
                           checked={el === curSize}
                           onChange={() => setCurSize(el)}
                           key={i}
                        />
                     ))
                  }
               </div>
            </div>

            <div className={classes.status_container}>
               <FontAwesomeIcon icon={faCircleCheck}/>

               <span>Is available</span>
            </div>

            <div className={classes.action_container}>
               <div className={classes.action_top}>
                  <span>550 ₴</span>

                  <FontAwesomeIcon icon={faHeartCirclePlus}/>
               </div>

               <Button type={'wideBlue_button'}>
                  <FontAwesomeIcon icon={faCartShopping} style={{
                     fontSize: "5vw",
                     marginRight: "2vw"
                  }}/>
                  Purchase
               </Button>
            </div>

            <div className={classes.features_container}>
               <div className={classes.title_container}>
                  <span className={classes.features_first}>
                     Characteristics
                  </span>

                  <span className={classes.features_second}>
                     &nbsp;Product name for amazing good like t-shirt or jeans
                  </span>
               </div>

               <div className={classes.features_table}>
                  <div className={classes.tabel_left}>
                     <ul>
                        {features.map((el, i) => (
                           <li key={i}>{el.key}:</li>
                        ))}
                     </ul>
                  </div>

                  <div className={classes.tabel_right}>
                     <ul>
                        {features.map((el, i) => (
                           <li key={i}>{el.value}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            <hr className={classes.main_hr}/>

            <div className={classes.description_container}>
               <div className={classes.title_container}>
                  <span className={classes.features_first}>
                     Description
                  </span>

                  <span className={classes.features_second}>
                     &nbsp;Product name for amazing good like t-shirt or jeans
                  </span>
               </div>

               <div className={classes.description_text}>
                  <span>
                     Lorem ipsum dolor sit amet, consectetur
                     adipiscing elit, sed do eiusmod tempor
                     incididunt ut labore et dolore magna
                     aliqua. Ut enim ad minim veniam, quis
                     nostrud exercitation ullamco laboris nisi
                     ut aliquip ex ea commodo consequat.
                  </span>
               </div>
            </div>

            <hr className={classes.recent_hr}/>

            <RecentlySlider products={products}/>

            <hr className={classes.main_hr}/>
         </div>
      </div>
   )
}

export default Product
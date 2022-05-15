import React, {useState} from 'react'
import classes from "./Review.module.sass";
import Slider, {SliderItem} from "../../../components/Slider/Slider";
import RadioBox from "../../../forms/RadioBox/RadioBox";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faCartShopping,
   faCircleCheck,
   faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../forms/Button/Button";
import jeans from "../../../img/jeans.jpg";
import tShirt from "../../../img/t-shirt.jpg";
import square from "../../../img/square.jpg";
import MediaQuery from "react-responsive";


const Review = (props) => {
   const [curSize, setCurSize] = useState('s')

   const availableSizes = ['xs', 's', 'm', 'l', 'xl']
   const photos = [jeans, tShirt, square]

   const features = [
      {key: 'Size', value: curSize.toUpperCase()},
      {key: 'Season', value: 'Summer'},
      {key: 'Style', value: 'Every day'},
      {key: 'Warrant', value: '14 days'}
   ]

   return (
      <div className={classes.container}>
         <MediaQuery maxWidth={768}>
            <hr className={classes.main_hr}/>
         </MediaQuery>

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

         <MediaQuery maxWidth={768}>
            <hr className={classes.main_hr}/>
         </MediaQuery>

         <div className={classes.data_wrapper}>
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

            <div className={classes.bottomData_wrapper}>
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

               <MediaQuery maxWidth={768}>
                  <hr className={classes.main_hr}/>
               </MediaQuery>

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
            </div>
         </div>
      </div>
   )
}

export default Review
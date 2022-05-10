import React from 'react'
import classes from './Ratings.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";
import Button from "../../../forms/Button/Button";


const Ratings = (props) => {

   const ratingStars = {
      size: 20,
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

   const ratings = [
      {
         userName: 'Irina',
         date: '05.04.2022',
         stars: 5,
         text: 'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore et' +
            ' dolore magna aliqua. Ut enim ad minim ' +
            'veniam, quis nostrud exercitation ullamco ' +
            'laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu ' +
            'fugiat nulla pariatur'
      },
      {
         userName: 'Vadim',
         date: '11.04.2022',
         stars: 3.5,
         text: 'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore et' +
            ' dolore magna aliqua. Ut enim ad minim ' +
            'veniam, quis nostrud exercitation ullamco ' +
            'laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu ' +
            'fugiat nulla pariatur'
      },
      {
         userName: 'Vlad',
         date: '11.26.2021',
         stars: 4,
         text: 'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore et'

      }
   ]

   return (
      <div className={classes.container}>
         <span className={classes.title}>
            Ratings about {props.title}
         </span>

         <div className={classes.common_container}>
            <div className={classes.common_title}>
               <span>General rating</span>
            </div>

            <div className={classes.common_filler}>
               <div className={classes.common_left}>
                  <span className={classes.common_left_avg}>4,5</span>

                  <ReactStars {...ratingStars} />

                  <span className={classes.rating_amount}>15 ratings</span>
               </div>

               <div className={classes.common_right}>
                  {[5, 4, 3, 2, 1].map(num => (
                     <div key={num} className={classes.count_container}>
                        <span className={classes.count_number}>{num}</span>

                        <FontAwesomeIcon icon={faStar}/>

                        <span className={classes.count_amount}>{num * 12}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className={classes.ratings_container}>
            <div className={classes.ratings_title}>
               <span>All ratings <span>{ratings.length}</span></span>
            </div>

            {
               ratings.map((el, i) => (
                  <div className={classes.rating_item} key={i}>
                     <div className={classes.rating_topBar}>
                        <span className={classes.rating_userName}>
                           {el.userName}
                        </span>

                        <span className={classes.rating_date}>
                           {el.date}
                        </span>
                     </div>

                     <div className={classes.rating_main}>
                        <ReactStars {...ratingStars} />

                        <div className={classes.rating_text}>
                           {el.text}
                        </div>
                     </div>
                  </div>
               ))
            }

            <div className={classes.showMore_container}>
               <Button type={'viewAll_button'}>Show more</Button>
            </div>
         </div>
      </div>
   )
}

export default Ratings
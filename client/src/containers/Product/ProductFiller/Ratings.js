import React, {useEffect, useState} from 'react'
import classes from './Ratings.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeartCirclePlus, faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import ReactStars from "react-rating-stars-component";
import Button from "../../../forms/Button/Button";
import {Tablet} from "../../../functions/mediaCheck";
import tShirt from '../../../img/t-shirt.jpg'
import {useHttp} from "../../../functions/http.hook";
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";


const Ratings = (props) => {

   const {requestJson} = useHttp()
   const product = useSelector(state => state.product.product)

   const [stats, setStats] = useState([])
   const [ratings, setRatings] = useState([])

   const isTablet = useMediaQuery({ minWidth: 768 })

   useEffect(() => {
      if (product._id) {
         (async () => {
            try {
               const stats = await requestJson(`/rating/getRatingsStats/${product._id}`)
               const ratings = await requestJson(`/rating/productRatings/${product._id}`)

               setStats(stats.ratings)
               setRatings(ratings.data)
            } catch (e) {
               console.log(e)
            }
         })()
      }
   }, [product._id])

   return (
      <div className={classes.container}>
         <span className={classes.title}>
            Ratings about {product.title}
         </span>

         <div className={classes.topBar_container}>
            <div className={classes.common_container}>
               <div className={classes.common_title}>
                  <span>General rating</span>
               </div>

               <div className={classes.common_filler}>
                  <div className={classes.common_left}>
                     <span className={classes.common_left_avg}>{product.avgRating}</span>

                     <ReactStars
                        size={isTablet ? 20 : 15}
                        count={5}
                        edit={false}
                        color={"#D2D2D2"}
                        activeColor={"#FFA900"}
                        value={product.avgRating}
                        isHalf={true}
                        emptyIcon={<FontAwesomeIcon icon={faStar}/>}
                        halfIcon={<FontAwesomeIcon icon={faStarHalfAlt}/>}
                        filledIcon={<FontAwesomeIcon icon={faStar}/>}
                     />

                     <span className={classes.rating_amount}>{product.numRating} ratings</span>
                  </div>

                  <div className={classes.common_right}>
                     {[5, 4, 3, 2, 1].map(num => (
                        <div key={num} className={classes.count_container}>
                           <span className={classes.count_number}>{num}</span>

                           <FontAwesomeIcon icon={faStar}/>

                           <span className={classes.count_amount}>
                              {stats[num] ? stats[num] : 0}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <Tablet>
               <div className={classes.product_container}>
                  <div className={classes.product_header}>
                     <div className={classes.product_img_container}>
                        <img src={tShirt} alt=""/>
                     </div>

                     <div className={classes.product_title}>
                        {product.title}
                     </div>
                  </div>

                  <div className={classes.product_action_container}>
                     <div className={classes.action_top}>
                        <div className={classes.price}>
                           {product.price} ₴
                        </div>

                        <div className={classes.product_wish}>
                           <FontAwesomeIcon icon={faHeartCirclePlus}/>
                        </div>
                     </div>

                     <div className={classes.action_bottom}>
                        <Button type={'wideBlue_button'}>
                           Purchase
                        </Button>
                     </div>
                  </div>
               </div>
            </Tablet>
         </div>

         <div className={classes.ratings_container}>
            <div className={classes.ratings_title}>
               <span>All ratings <span>{ratings.length}</span></span>
            </div>

            {
               ratings && ratings.length > 1
               ? <div className={classes.ratings_list}>
                  {
                     ratings.map((el, i) => (
                        <div className={classes.rating_item} key={i}>
                           <div className={classes.rating_topBar}>
                        <span className={classes.rating_userName}>
                           {el.user.name}
                        </span>

                              <span className={classes.rating_date}>
                           {new Date(el.createdAt).toLocaleDateString()}
                        </span>
                           </div>

                           <div className={classes.rating_main}>
                              <div className={classes.stars_wrapper}>
                                 <ReactStars
                                    size={isTablet ? 18 : 15}
                                    count={5}
                                    edit={false}
                                    color={"#D2D2D2"}
                                    activeColor={"#FFA900"}
                                    value={el.rating}
                                    isHalf={true}
                                    emptyIcon={<FontAwesomeIcon icon={faStar}/>}
                                    halfIcon={<FontAwesomeIcon icon={faStarHalfAlt}/>}
                                    filledIcon={<FontAwesomeIcon icon={faStar}/>}
                                 />
                              </div>

                              <div className={classes.rating_text}>
                                 {el.text}
                              </div>
                           </div>
                        </div>
                     ))
                  }
               </div>
               : <h1 className={classes.noRatings}>No ratings yet</h1>

            }
         </div>
      </div>
   )
}

export default Ratings
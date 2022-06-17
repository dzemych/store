import React, {useEffect, useState} from 'react'
import classes from './Product.module.sass'
import ReactStars from "react-rating-stars-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import '../basicStyles.sass'
import RecentlySlider from "../../components/Slider/RecentlySlider";
import ProductFiller from "./ProductFiller";
import {useMediaQuery} from "react-responsive";
import {useParams} from "react-router-dom";
import {fetchProduct} from "../../redux/product/productActions";
import {useDispatch, useSelector} from "react-redux";
import {setStatus} from '../../redux/product/productReducer'
import {pushToRecently} from "../../redux/recently/recentlyReducer";


const Product = (props) => {
   const pages = [
      {key: 'Все о товаре', value: 'review'},
      {key: 'Отзывы', value: 'ratings'},
      {key: 'Вопросы', value: 'questions'},
      {key: 'Задать вопрос', value: 'askQuestion'},
      {key: 'Написать отзыв', value: 'leaveRating'}
   ]

   const params = useParams()
   const dispatch = useDispatch()

   const product = useSelector(state => state.product.product)
   const status = useSelector(state => state.product.status)

   const [activePage, setPage] = useState('review')

   const isTablet = useMediaQuery({minWidth: 768})

   useEffect(() => {
      dispatch(fetchProduct(params.slug))

      return () => {
         dispatch(setStatus())
      }
   }, [params.slug])

   useEffect(() => {
      if (product && product._id) {
         dispatch(pushToRecently(product._id))
      }
   }, [product])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.product_topBar}>
               <div className={classes.product_title_container}>
                  <h1 className={classes.product_title}>
                     {product.title}&nbsp;

                     <span className={classes.product_sex}>
                        ({product.sex.toUpperCase()})
                     </span>
                  </h1>

                  <div className={classes.all_reviews}>
                     {
                        status !== 'idle' &&
                        <ReactStars
                           size={isTablet ? 20 : ''}
                           count={5}
                           edit={false}
                           color={"#D2D2D2"}
                           activeColor={"#FFA900"}
                           value={product ? product.avgRating : 0}
                           isHalf={true}
                           emptyIcon={<FontAwesomeIcon icon={faStar}/>}
                           halfIcon={<FontAwesomeIcon icon={faStarHalfAlt}/>}
                           filledIcon={<FontAwesomeIcon icon={faStar}/>}
                        />
                     }

                     <span className={classes.review_number}>
                     {product.numRating} отзывов
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
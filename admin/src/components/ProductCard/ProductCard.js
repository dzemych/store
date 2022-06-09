import React from 'react'
import classes from './ProductCard.module.sass'
import {useNavigate} from "react-router-dom";
import CardWrapper from "../CardWrapper/CardWrapper";


const ProductCard = (props) => {
   const navigate = useNavigate()

   const editHandler = () => {
      navigate('/edit/' + props.slug)
   }

   return (
      <CardWrapper
         mainPhoto={props.mainPhoto}
         slug={props.slug}
         title={props.title}
         sex={props.sex}
         price={props.price}
      >
         <>
            <span
               className={classes.edit_product}
               onClick={editHandler}
            >
               Edit
            </span>

            <hr className={classes.main_hr}/>

            <div className={classes.info_container}>
               <div className={classes.info_item}>
                  <div className={classes.info_top}>
                     Avg rating
                  </div>

                  <div className={classes.info_bottom}>
                     {props.avgRating }
                  </div>
               </div>

               <div className={classes.info_item}>
                  <div className={classes.info_top}>
                     Number rating
                  </div>

                  <div className={classes.info_bottom}>
                     {props.numRating}
                  </div>
               </div>

               <div className={classes.info_item}>
                  <div className={classes.info_top}>
                     Number questions
                  </div>

                  <div className={classes.info_bottom}>
                     {props.numQuestions}
                  </div>
               </div>

               <div className={classes.info_item}>
                  <div className={classes.info_top}>
                     Sold
                  </div>

                  <div className={classes.info_bottom}>
                     {props.sold}
                  </div>
               </div>
            </div>

            <hr className={classes.main_hr}/>

            <div className={classes.sizes_container}>
            <span className={classes.sizes_title}>
               Sizes:
            </span>

               <div className={classes.sizes_list}>
                  {Object.keys(props.numSizes).map((el, i) => (
                     <div className={classes.size_item} key={i}>
                        <div className={classes.size_top}>
                           {el.toUpperCase()}
                        </div>

                        <div className={classes.size_bottom}>
                           {props.numSizes[el]}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </>
      </CardWrapper>
   )
}

export default ProductCard
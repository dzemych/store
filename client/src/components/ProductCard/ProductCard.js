import React from 'react'
import classes from './ProductCard.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeartCirclePlus} from "@fortawesome/free-solid-svg-icons";
import defaultPhoto from "../../img/no-image.png"


const ProductCard = React.forwardRef((props, ref) => {
   const img = props.img ? props.img : defaultPhoto

   return (
      <div className={classes.container} ref={ref}>
         <div className={classes.wrapper}>

            <FontAwesomeIcon
               icon={faHeartCirclePlus}
               className={classes.heartIcon}
            />

            <div className={classes.img_container}>
               <img src={img}
                    alt='product img'
               />
            </div>

            <div className={classes.title}>{props.title}</div>

            <div className={classes.price}>
               {props.price}
               <span className={classes.currency}> ₴</span>
            </div>

         </div>
      </div>
   )
})

export default ProductCard
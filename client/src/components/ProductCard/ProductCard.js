import React, {useState} from 'react'
import classes from './ProductCard.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faHeartCirclePlus,
   faTrash,
   faCheck,
   faMinus,
   faPlus
} from "@fortawesome/free-solid-svg-icons";
import defaultPhoto from "../../img/no-image.png"


const ProductCard = React.forwardRef((props, ref) => {

   const [amount, setAmount] = useState(1)

   const changeAmount = (e, type) => {
      e.preventDefault()
      console.log(type)
      if (type === 'plus')
         setAmount(prev => prev + 1)

      if (type === 'minus')
         setAmount(prev => Math.max(1, prev - 1))

      if (!type)
         setAmount(Math.max(e.target.value, 1))
   }

   const img = props.img ? props.img : defaultPhoto
   let icon

   switch (props.type) {
      case 'basket':
         icon = faTrash
         break
      case 'wish':
         icon = faCheck
         break

      default: icon = faHeartCirclePlus
   }

   const clsContainer = props.type === 'basket' ?
      classes.basket_container:
      classes.container

   return (
      <div className={clsContainer} ref={ref}>
         <div className={classes.wrapper}>

            <FontAwesomeIcon
               icon={icon}
               className={classes.heartIcon}
            />

            {props.type !== 'basket' ?
               <>
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
               </> :
               <>
                  <div className={classes.topBar}>
                     <div className={classes.basket_img_container}>
                        <img src={img} alt='img'/>
                     </div>

                     <span className={classes.basket_title}>
                        {props.title}
                     </span>
                  </div>

                  <div className={classes.bottomBar}>
                     <div className={classes.counter}>
                        <FontAwesomeIcon
                           icon={faMinus}
                           className={
                              [classes.counter_minus,
                              amount < 2 && classes.counter_disabled].join(' ')
                           }
                           aria-disabled={amount < 2}
                           onClick={e => changeAmount(e, 'minus')}
                        />

                        <input
                           type="number"
                           className={classes.counter_input}
                           value={amount}
                           onChange={e => changeAmount(e)}
                        />

                        <FontAwesomeIcon
                           icon={faPlus}
                           className={classes.counter_plus}
                           onClick={e => changeAmount(e, 'plus')}
                        />
                     </div>

                     <div className={classes.basket_price}>
                        {props.price}₴
                     </div>
                  </div>
               </>
            }

         </div>
      </div>
   )
})

export default ProductCard
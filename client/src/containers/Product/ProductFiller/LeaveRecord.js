import React, {useState} from 'react'
import classes from './LeaveRecord.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../../basicStyles.sass'
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../forms/Button/Button";


const LeaveRecord = (props) => {

   const [stars, setStars] = useState()

   const rates = [
      {text: 'Horrible', value: 1},
      {text: 'Bad', value: 2},
      {text: 'Not bad', value: 3},
      {text: 'Good', value: 4},
      {text: 'Excellent', value: 5}
   ]

   const getStarClass = rate => {
      if (rate <= stars)
         return classes.filledStar
      return classes.emptyStar
   }

   const changeStars = val => {
      if (stars === val)
         return setStars(0)
      setStars(val)
   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.header}>
               <span className={classes.title}>{
                  props.type === 'rating' ? 'Leave your review'
                  : 'Ask a question'
               }</span>
            </div>

            <hr className={'main_hr'}/>

            {props.type === 'rating' &&
               <div className={classes.rates_section}>
                  {rates.map((el, i) => (
                     <div className={classes.rate_item} key={i}>
                        <FontAwesomeIcon
                           icon={faStar}
                           className={getStarClass(el.value)}
                           onClick={() => changeStars(el.value)}
                        />

                        <span>{el.text}</span>
                     </div>
                  ))}
               </div>
            }
            
            <div className={classes.text_wrapper}>
               <textarea
                  placeholder={
                     props.type === 'rating' ?
                        'Wrote your review':
                        'Ask a question'
                  }
                  name="rating_text"
                  id="rating_text"
                  rows="8"
               />
            </div>

            <div className={classes.owner_data}>
               <div className={classes.data_input_container}>
                  <label htmlFor="name_input">
                     Your name
                  </label>

                  <input
                     type="text"
                     id={'name_input'}
                     placeholder={'Your name'}
                  />
               </div>

               <div className={classes.data_input_container}>
                  <label htmlFor="name_input">
                     Your email
                  </label>

                  <input
                     type="text"
                     id={'email_input'}
                     placeholder={'Your email'}
                  />
               </div>
            </div>

            <Button type={'wideBlue_button'}>
               {props.type === 'rating' ? 'Leave review'
                  : 'Ask question'}
            </Button>
         </div>
      </div>
   )
}

export default LeaveRecord
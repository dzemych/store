import React, {useEffect, useState} from 'react'
import classes from './LeaveRecord.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../../basicStyles.sass'
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../forms/Button/Button";
import {useHttp} from "../../../functions/http.hook";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth} from "../../../redux/app/appReducer";


const LeaveRecord = (props) => {

   const {requestJson, error, setError} = useHttp()

   const productId = useSelector(state => state.product.product._id)
   const isAuth = useSelector(state => state.user.token)

   const dispatch = useDispatch()

   const [stars, setStars] = useState(0)
   const [text, setText] = useState('')
   const [success, setSuccess] = useState(false)

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

   const postRecord = async (type) => {
      const body = {
         product: productId,
         text: text,
         rating: stars
      }

      const response = await requestJson(
         `/${type}`,
         'POST',
         JSON.stringify(body),
         {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${isAuth}`
         }
      )

      if (response.status === 'success')
         setSuccess(true)
   }

   useEffect(() => {
      setSuccess(false)
      setStars(0)
      setText('')
      setError('')
   }, [props.type])

   const getButton = () => {
      if (props.type === 'rating')
         return (
            <Button
               type={'wideBlue_button'}
               disabled={(stars < 1 || text.length < 3 || text.length > 400)}
               onClickHandler={() => postRecord('rating')}
            >
               Leave review
            </Button>
         )
      if (props.type === 'question')
         return (
            <Button
               type={'wideBlue_button'}
               disabled={text.length < 3 || text.length > 400}
               onClickHandler={() => postRecord('question')}
            >
               Ask a question
            </Button>
         )
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

            {success
            ? <div className={classes.success_container}>
                 <h1>
                    {props.type === 'rating'
                    ? 'Rating successfully posted'
                    : 'We will answer you within two days'
                    }
                 </h1>
            </div>
            : isAuth
               ? <>
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
                  </div>}

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
                        value={text}
                        onChange={e => setText(e.target.value)}
                     />
                  </div>

                  {getButton()}

                  {(error && error.message.includes('E11000')) &&
                  <span className={classes.ratingDuplicate}>
                     You cannot post more than one rating
                  </span>}
               </>
               : <div className={classes.noAuth_container}>
                  <h1>Please login</h1>
                  <Button
                     type={'wideBlue_button'}
                     onClickHandler={() => dispatch(toggleAuth())}
                  >
                     Log in
                  </Button>
               </div>
            }
         </div>
      </div>
   )
}

export default LeaveRecord
import React, {useContext, useState} from 'react'
import classes from './QuestionCard.module.sass'
import CardWrapper from "../CardWrapper/CardWrapper";
import {useHttp} from "../../functions/http.hook";
import {AuthContext} from "../../context/AuthContext";


const QuestionCard = (props) => {
   const auth = useContext(AuthContext)

   const {requestJson} = useHttp()

   const [answer, setAnswer] = useState('')
   const [answerError, setAnswerError] = useState('')

   const submitHandler = async () => {
      if (answer.length < 2) {
         setAnswerError('Minimum symbols 12')
      } else {
         setAnswerError('')

         console.log(props.id)
         const data = await requestJson(
            `/question/${props.id}`,
            'PATCH',
            JSON.stringify({ answer }),
            {
               'Authorization': 'Bearer ' + auth.user.token,
               'Content-Type': 'application/json'
            }
         )

         console.log(data)
      }
   }

   const changeHandler = e => {
      setAnswer(e.target.value.slice(0, 400))
   }

   return (
      <CardWrapper
         slug={props.slug}
         title={props.title}
         mainPhoto={props.mainPhoto}
         sex={props.sex}
         price={props.price}
      >
         <hr className={classes.main_hr}/>

         <div className={classes.user_container}>
            <span className={classes.user_name}>
               {props.user}
            </span>

            <span className={classes.date}>
               {new Date(props.date).toLocaleDateString()}
            </span>
         </div>

         <div className={classes.question_text}>
            <span>
               {props.text}
            </span>
         </div>

         <hr className={classes.main_hr}/>

         <div className={classes.writeAnswer_container}>
            <span className={classes.writeAnswer_title}>
               Write your answer
            </span>

            <textarea
               name="write_answer"
               id="write_answer"
               rows="6"
               value={answer}
               onChange={changeHandler}
            />

            {answerError &&
               <span className={classes.answer_error}>
                  {answerError}
               </span>
            }
         </div>

         <button
            onClick={submitHandler}
            className={classes.submit_btn}
         >
            Post answer
         </button>
      </CardWrapper>
   )
}

export default QuestionCard
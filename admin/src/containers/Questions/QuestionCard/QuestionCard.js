import React, {useContext, useEffect, useState} from 'react'
import classes from './QuestionCard.module.sass'
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import {useHttp} from "../../../functions/http.hook";
import {AuthContext} from "../../../context/AuthContext";


const QuestionCard = (props) => {
   const auth = useContext(AuthContext)

   const {requestJson} = useHttp()

   const [owner, setOwner] = useState(props.answer ? props.answer.nick : '')
   const [edit, setEdit] = useState(true)
   const [text, setText] = useState(props.answer ? props.answer.text : '')
   const [answer, setAnswer] = useState(props.answer ? props.answer.text : '')
   const [answerError, setAnswerError] = useState('')

   const submitHandler = async () => {
      if (text.length < 2) {
         setAnswerError('Minimum symbols 12')
      } else {
         setAnswerError('')

         const data = await requestJson(
            `/question/${props.id}`,
            'PATCH',
            JSON.stringify({ answer: {
               text, nick: owner, date: new Date()
            }}),
            {
               'Authorization': 'Bearer ' + auth.user.token,
               'Content-Type': 'application/json'
            }
         )

         setAnswer(data.data.answer.text)
         setEdit(false)
      }
   }

   const changeHandler = e => {
      setText(e.target.value.slice(0, 400))
   }

   useEffect(() => {
      setEdit(false)
   }, [])

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

         {edit
            ? <div className={classes.answer_container}>
                  <div className={classes.owner_container}>
                     <span
                        className={classes.edit_answer}
                        onClick={() => setEdit(prev => !prev)}
                     >
                        {edit ? 'Cancel' : 'Edit'}
                     </span>

                     <span className={classes.answer_title}>
                        Write your answer
                     </span>

                     <span className={classes.verticalBar}>
                        &nbsp;|&nbsp;
                     </span>

                     <input
                        type="text"
                        value={owner}
                        onChange={e => setOwner(e.target.value.slice(0, 25))}
                        placeholder={'Answer as ...'}
                     />
                  </div>

                  <textarea
                     name="write_answer"
                     id="write_answer"
                     rows="6"
                     value={text}
                     onChange={changeHandler}
                  />

                  {answerError &&
                     <span className={classes.answer_error}>
                        {answerError}
                     </span>
                  }
               </div>

            : <div className={classes.answer_container}>
                  <span
                     className={classes.edit_answer}
                     onClick={() => setEdit(prev => !prev)}
                  >
                     {edit ? 'Cancel' : 'Edit'}
                  </span>

                  <div className={classes.owner_container}>
                     <span>Your answer</span>
                  </div>

                  <span className={classes.answer_text}>
                     {answer}
                  </span>
               </div>
         }

         {edit &&
            <button
               onClick={submitHandler}
               className={classes.submit_btn}
            >
               Post answer
            </button>
         }
      </CardWrapper>
   )
}

export default QuestionCard
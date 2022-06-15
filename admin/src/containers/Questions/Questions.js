import React, {useEffect, useState} from 'react'
import classes from './Questions.module.sass'
import {useHttp} from "../../functions/http.hook";
import QuestionCard from "./QuestionCard/QuestionCard";


const Questions = (props) => {
   const {requestJson} = useHttp()

   const [questions, setQuestions] = useState([])

   const renderQuestionList = () => {
      if (questions.length > 0) {
         return (
            questions.map((el, i) => (
               <QuestionCard
                  id={el._id}
                  key={`${el.slug}_${i}`}
                  slug={el.product.slug}
                  mainPhoto={el.product.mainPhoto}
                  title={el.product.title}
                  price={el.product.price}
                  sex={el.product.sex}
                  user={el.user.name}
                  date={el.createdAt}
                  text={el.text}
                  answer={el.answer}
               />
            ))
         )
      } else {
         return (
            <span className={classes.noQuestions}>No questions yet</span>
         )
      }
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson(
            `/question/`
         )

         if (data)
            setQuestions(data.questions)
      })()
   }, [])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            {renderQuestionList()}
         </div>
      </div>
   )
}

export default Questions
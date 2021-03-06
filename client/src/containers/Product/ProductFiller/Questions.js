import React, {useEffect, useState} from 'react'
import classes from './Questions.module.sass'
import QuestionItem from "./QuestionItem";
import {useSelector} from "react-redux";
import {useHttp} from "../../../functions/http.hook";


const Questions = (props) => {

   const [questions, setQuestions] = useState([])

   const {requestJson} = useHttp()

   const product = useSelector(state => state.product.product)

   useEffect(() => {
      if (product._id) {
         (async () => {
            try {
               const questions = await requestJson(`/question/productQuestions/${product._id}`)

               setQuestions(questions.data)
            } catch (e) {
               console.log(e)
            }
         })()
      }
   }, [product._id])

   return (
      <div className={classes.container}>
         <span className={classes.title}>
            Вопросы к {product.title}
            <span> {questions.length}</span>
         </span>

         <div className={classes.questions_container}>
            {
               questions && questions.length > 0
               ? questions.map((el, i) => (
                  <QuestionItem
                     key={i}
                     userName={el.user.name}
                     date={el.createdAt}
                     text={el.text}
                     answer={el.answer}
                  />
                  ))
               : <h1 className={classes.noQuestions}>Нет вопросов</h1>
            }

            {/*<div className={classes.showMore_container}>*/}
            {/*   <Button type={'viewAll_button'}>Show more</Button>*/}
            {/*</div>*/}
         </div>
      </div>
   )
}

export default Questions
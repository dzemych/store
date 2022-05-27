import React, {useState} from 'react'
import classes from "./Questions.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


const QuestionItem = (props) => {
   const [showAnswer, setAnswer] = useState()

   return (
      <div className={classes.question_item}>
         <div className={classes.question_topBar}>
            <span className={classes.question_userName}>
               {props.userName}
            </span>

            <span className={classes.question_date}>
               {new Date(props.date).toLocaleDateString()}
            </span>
         </div>

         <div className={classes.question_main}>
            <div className={classes.question_text}>
               {props.text}
            </div>
         </div>

         <div className={classes.answer_container}>
            {props.answer &&
               <div className={classes.show_wrapper}>
                  <div className={classes.show_icon_wrapper}>

                     <FontAwesomeIcon
                        icon={faArrowRight}
                        className={
                           `${classes.show_icon} ${
                              showAnswer && classes.rotate_show_icon
                           }`
                        }
                        onClick={() => setAnswer(prev => !prev)}
                     />

                  </div>

                  <span onClick={() => setAnswer(prev => !prev)}>
                     Answer
                  </span>
               </div>
            }

            {
               showAnswer &&
               <div className={classes.answer_wrapper}>
                  <div className={classes.answer_body}>
                     <div className={classes.answer_line} />

                     <div className={classes.question_topBar}>
                        <span className={classes.question_userName}>
                           {props.answer.nick ? props.answer.nick : 'Jasmin'}
                        </span>

                        <span className={classes.question_date}>
                           {props.answer.date}
                        </span>
                     </div>

                     <div className={classes.question_main}>
                        <div className={classes.question_text}>
                           {props.answer.text}
                        </div>
                     </div>
                  </div>
               </div>
            }
         </div>
      </div>
   )
}

export default QuestionItem
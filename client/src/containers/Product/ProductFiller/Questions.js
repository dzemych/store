import React from 'react'
import classes from './Questions.module.sass'
import QuestionItem from "./QuestionItem";
import Button from "../../../forms/Button/Button";


const Questions = (props) => {
   const questions = [
      {
         userName: 'Irina',
         date: '05.04.2022',
         text: 'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore et' +
            ' dolore magna aliqua. Ut enim ad minim ' +
            'veniam, quis nostrud exercitation ullamco ' +
            'laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu ' +
            'fugiat nulla pariatur',
         answer: {
            date: '05.04.2021',
            text: 'Lorem ipsum dolor sit amet, ' +
               'consectetur adipiscing elit, sed do ' +
               'eiusmod tempor incididunt ut labore et'
         }
      },
      {
         userName: 'Vadim',
         date: '11.04.2022',
         text: 'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore et' +
            ' dolore magna aliqua. Ut enim ad minim ' +
            'veniam, quis nostrud exercitation ullamco ' +
            'laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit' +
            ' in voluptate velit esse cillum dolore eu ' +
            'fugiat nulla pariatur',
         answer: {
            date: '11.04.2021',
            text: 'Lorem ipsum dolor sit amet, ' +
               'consectetur adipiscing elit, sed do ' +
               'eiusmod tempor incididunt ut labore et'
         }
      },
      {
         userName: 'Vlad',
         date: '11.26.2021',
         text: 'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore et',
         answer: {
            date: '11.26.2021',
            text: 'Lorem ipsum dolor sit amet, ' +
               'consectetur adipiscing elit, sed do ' +
               'eiusmod tempor incididunt ut labore et'
         }
      }
   ]

   return (
      <div className={classes.container}>
         <span className={classes.title}>
            Questions for {props.title}
            <span> {questions.length}</span>
         </span>

         <div className={classes.questions_container}>
            {
               questions.map((el, i) => (
                  <QuestionItem
                     key={i}
                     userName={el.userName}
                     date={el.date}
                     text={el.text}
                     answer={{
                        date: el.answer.date,
                        text: el.answer.text,
                        nick: el.answer.nick ? el.answer : 'Jasmin'
                     }}
                  />
               ))
            }


            <div className={classes.showMore_container}>
               <Button type={'viewAll_button'}>Show more</Button>
            </div>
         </div>
      </div>
   )
}

export default Questions
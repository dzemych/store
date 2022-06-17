import React from 'react'
import classes from './Info.module.sass'
import monitor from '../../img/monitor.png'
import QuestionsList from "./QuestionsList";
import '../basicStyles.sass'


const Info = (props) => {
   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>
               Как мы можем вам помочь ?
            </h1>

            <div className={classes.title_img}>
               <img src={monitor} alt=""/>
            </div>

            <QuestionsList/>

            <hr className={classes.main_hr}/>

            <div className={classes.contact_container}>
               <h2 className={classes.contact_title}>Задайте нам вопрос</h2>

               <div className={classes.contact_wrapper}>
                  <div className={classes.textUs_container}>
                     <h3 className={classes.textUs_title}>Отправьте эмейл</h3>

                     <span className={classes.textUs_text}>dzemichivan@gmail.com</span>
                  </div>

                  <div className={classes.textUs_container}>
                     <h3 className={classes.textUs_title}>Напишите нам в Вайбере</h3>

                     <span className={classes.textUs_text}>+380509008875</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Info
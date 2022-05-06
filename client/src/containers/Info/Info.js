import React from 'react'
import classes from './Info.module.sass'
import keyboardTyping from '../../img/keyboard-typing.png'
import QuestionsList from "./QuestionsList";
import Button from "../../components/Button/Button";
import '../basicStyles.sass'


const Info = (props) => {
   return (
      <div className={'container'}>
         <div className={'wrapper'}>
            <h1 className={'title'}>
               How can we help you ?
            </h1>

            <div className={classes.title_img}>
               <img src={keyboardTyping} alt=""/>
            </div>

            <QuestionsList/>

            <hr className={classes.main_hr}/>

            <div className={classes.contact_container}>
               <h2 className={classes.contact_title}>Ask us a question</h2>

               <Button type={'bigMailUs_button'}>Mail us</Button>

               <hr className={classes.contact_hr}/>

               <div className={classes.textUs_container}>
                  <h3 className={classes.textUs_title}>In Viber</h3>

                  <span className={classes.textUs_text}>+380509008875</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Info
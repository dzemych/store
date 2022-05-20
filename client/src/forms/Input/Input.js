import React, {useMemo, useState} from 'react'
import classes from "./Input.module.sass";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Input = (props) => {
   const [show, setShow] = useState(false)

   const inputId = useMemo(() => {
      const rand = Math.floor(Math.random() * 1000)

      const timeStamp = new Date().getTime()

      return timeStamp + rand
   }, [])

   const submitCheck = e => {
      if (e.key === 'Enter')
         props.onSubmit()
   }

   return (
      <div className={classes.wrapper}>
         <label id={`${inputId}_input`}>{props.title}</label>

         <div className={classes.input_wrapper}>
            <input
               type={show ? 'text' : props.type}
               value={props.value}
               id={`${inputId}_input`}
               placeholder={props.placeholder}
               onKeyPress={e => submitCheck(e)}
               onChange={e => props.onChange(e.target.value)}
            />

            {props.type === 'password' &&
               <FontAwesomeIcon
                  icon={show ? faEye : faEyeSlash}
                  onClick={() => setShow(prev => !prev)}
               />}
         </div>

         {props.error &&
            <span className={classes.errorMessage}>
               {props.error}
            </span>
         }
      </div>
   )
}

export default Input
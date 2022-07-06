import React, {useState} from 'react'
import classes from './Input.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


const Input = (props) => {
   const [show, setShow] = useState(false)

   const onSubmit = e => {
      if (e.key === 'Enter' && props.onSubmit)
         props.onSubmit()
   }

   const blurHandler = () => {
      if (props.type === 'number')
         if (!props.value || props.value < 0)
            props.onChange(0)
   }

   return (
      <div className={classes.container}>
         <label htmlFor={`${props.title}_input`}>
            {props.title}
         </label>

         <input
            onBlur={blurHandler}
            type={show ? 'text' : props.type}
            id={`${props.title}_input`}
            placeholder={props.placeholder}
            onKeyDown={e => onSubmit(e)}
            onChange={e => props.onChange(e.target.value)}
            value={props.value}
         />

         {props.type === 'password' &&
            <FontAwesomeIcon
               icon={show ? faEye : faEyeSlash}
               onClick={() => setShow(prev => !prev)}
            />
         }

         {props.error &&
            <span>
               {props.error}
            </span>
         }
      </div>
   )
}

export default Input
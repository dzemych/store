import React from 'react'
import classes from './Input.module.sass'


const Input = (props) => {
   return (
      <div className={classes.container}>
         <label htmlFor={`${props.title}_input`}>
            {props.title}
         </label>

         <input
            min={props.type === 'number' ? 0 : undefined}
            id={`${props.title}_input`}
            type={props.type ? props.type : props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
         />

         {props.error &&
            <span>
               {props.error}
            </span>}
      </div>
   )
}

export default Input
import React from 'react'
import classes from './Button.module.sass'


const Button = (props) => {
   const clickHandler = e => {
      e.preventDefault()
      props.onClickHandler()
   }

   return (
      <button
         className={classes[props.type]}
         onClick={clickHandler}
         disabled={props.disabled ? props.disabled : false}
      >
         {props.children}
      </button>
   )
}

export default Button
import React from 'react'
import classes from './RadioBox.module.sass'


const RadioBox = (props) => {
    return(
        <div className={classes.container}>
           <input
              type="radio"
              onChange={props.onChange}
              value={props.value}
              id={`radio_box_${props.value}`}
              checked={props.checked}
           />
           <label
              htmlFor={`radio_box_${props.value}`}
              onClick={props.onChange}
           >
              {props.value.toUpperCase()}
           </label>
        </div>
    )
}

export default RadioBox
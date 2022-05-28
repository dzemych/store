import React from 'react'
import classes from './RadioBox.module.sass'


const RadioBox = (props) => {
   const cls = !props.available && classes.unAvailable

    return(
        <div className={classes.container + ' ' + cls}>
           <input
              type="radio"
              onChange={props.available ? props.onChange : () => {}}
              value={props.value}
              id={`radio_box_${props.id}`}
              checked={props.checked}
           />
           <label
              htmlFor={`radio_box_${props.id}`}
              onClick={props.available ? props.onChange : () => {}}
           >
              {props.value.toUpperCase()}
           </label>
        </div>
    )
}

export default RadioBox
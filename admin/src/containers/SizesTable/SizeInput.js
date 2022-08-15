import React from 'react'
import classes from './SizesTable.module.sass'


const SizesTable = (props) => (
   <textarea
      rows={1}
      className={classes.size_input}
      value={props.value}
      onChange={props.onChange}
   />
)
export default SizesTable
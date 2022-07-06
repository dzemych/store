import React from 'react'
import classes from './Backdrop.module.sass'


const Backdrop = ({onClick}) => <div
   className={classes.Backdrop}
   onClick={onClick}
/>

export default Backdrop
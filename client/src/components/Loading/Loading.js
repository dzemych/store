import React from 'react'
import classes from './Loading.module.sass'


const Loading = ({color}) => {
   return (
      <div className={[
         classes.ldsRing, color ? classes[color] : ''
      ].join(' ')}>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
      </div>
   )
}

export default Loading
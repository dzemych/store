import React, {useCallback, useEffect, useState} from 'react'
import classes from './Drawer.module.sass'


const Drawer = (props) => {

   const onEscape = useCallback(e => {
      if (e.key === 'Escape')
         props.onClick()
   }, [props])

   useEffect(() => {
      document.addEventListener('keyup', onEscape, false)

      return () => {
         document.removeEventListener('keyup', onEscape, false)
      }
   }, [onEscape])

   return (
      <div
         className={
            [classes.container, classes[props.state]]
               .join(' ')
         }
         onClick={() => props.onClick()}
      >
         {props.children}
      </div>
   )
}

export default Drawer
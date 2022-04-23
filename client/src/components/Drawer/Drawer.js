import React, {useEffect} from 'react'
import classes from './Drawer.module.sass'


const Drawer = (props) => {

   const onEscape = e => {
      console.log(e.key)
      if (e.key === 'Escape')
         props.onClick()
   }

   useEffect(() => {
      document.addEventListener('keydown', onEscape, false)

      return () => {
         document.removeEventListener('keydown', onEscape, false)
      }
   }, [])

   return (
      <div
         // className={[classes.container, props.state].join(' ')}
         className={[classes.container, classes[props.state]].join(' ')}
         onClick={() => props.onClick()}
      >
         {/*<h1>{props.state}</h1>*/}
         {props.children}
      </div>
   )
}

export default Drawer
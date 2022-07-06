import React from 'react'
import classes from './Modal.module.sass'
import ReactDOM from 'react-dom'
import Backdrop from "../Backdrop/Backdrop";


const Modal = ({isOpen, onClose, children}) => {
   if (!isOpen) return null

   return ReactDOM.createPortal(
      <>
         <Backdrop
            onClick={onClose}
         />

         <div className={classes.container}>
            {children}
         </div>
      </>,
      document.getElementById('portal')
   )
}

export default Modal
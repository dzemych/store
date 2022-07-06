import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import classes from './PhotoSlider.module.sass'
import Backdrop from "../Backdrop/Backdrop";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import chevron from '../../img/chevron.png'


const PhotoSlider = (props) => {

   const windowRef = useRef()
   const allItemsRef = useRef()

   const [offset, setOffset] = useState(0)

   const [startPosition, setStartPosition] = useState(0)
   const [oldOffset, setOldOffset] = useState(null)
   const [moveX, setMoveX] = useState(0)

   const [transitionDuration, setTransitionDuration] = useState('0ms')
   const [windowWidth, setWindowWidth] = useState(0)
   const [maxOffset, setMaxOffset] = useState(0)

   const changePageHandler = async type => {
      await setTransitionDuration('280ms')

      setOffset(prev => {
         let newOffset = prev + (type * windowWidth)

         // If it was touch move go to the nearest page
         if (typeof oldOffset === 'number')
            newOffset = oldOffset + (type * windowWidth)

         // Previous page
         if (type < 0)
            return Math.max(0, newOffset)

         // Next page
         if (type > 0)
            return Math.min(maxOffset, newOffset)

         // Align page
         return newOffset
      })
   }

   const touchStartHandler = e => {
      setOldOffset(offset)
      setStartPosition(e.touches[0].clientX)
   }

   const touchMoveHandler = e => {
      setMoveX(startPosition - e.touches[0].clientX)
   }

   const touchEndHandler = async () => {
      if (moveX) {
         const pages = Math.round(moveX / windowWidth)
         await changePageHandler(pages === -0 ? 0 : pages)
      }

      setOldOffset(null)
   }

   // Prevent page from scrolling
   useEffect(() => {
      const bodyStyle = document.body.style

      bodyStyle.overflow = 'hidden'

      return () => {
         bodyStyle.overflow = 'auto'
      }
   }, [])

   // Set time duration
   useEffect(() => {
      setTransitionDuration('0ms')
   }, [offset])

   // Update window width from window component
   useEffect(() => {
      if (windowRef.current) {
         const pagesLength = Object.keys(props.photos).length

         setWindowWidth(windowRef.current.offsetWidth)
         setMaxOffset(windowRef.current.offsetWidth * (pagesLength - 1))
      }
   }, [windowRef])

   // Set offset on touch move
   useEffect(() => {
      const newOffset = oldOffset + moveX

      if (newOffset > 0 && newOffset < maxOffset)
         setOffset(newOffset)

   }, [moveX])

   // Set offset from props
   useEffect(() => {
      if (props.page)
         setOffset(props.page * windowWidth)
   }, [props.page, windowWidth])

   const allItemsStyle = {
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      transitionDuration: transitionDuration,
      transitionTimingFunction: 'ease-in',
      transform: `translateX(${-offset}px)`
   }

   return (
      ReactDOM.createPortal(
         <>
            <Backdrop onClick={props.onClose} />

            <div className={classes.container}>
               <FontAwesomeIcon
                  icon={faTimes}
                  className={classes.closeIcon}
                  onClick={props.onClose}
               />

               <div className={classes.slider_container}>
                  <div className={classes.window} ref={windowRef}>
                     <div
                        style={allItemsStyle}
                        onTouchStart={touchStartHandler}
                        onTouchEnd={touchEndHandler}
                        onTouchMove={touchMoveHandler}
                        ref={allItemsRef}
                     >

                        {Object.keys(props.photos).map((photosIndex, i) => (
                           <div className={classes.slider_item} key={i}>
                              <img src={props.photos[i]} alt=""/>
                           </div>
                        ))}

                     </div>
                  </div>

                  {offset > 0 &&
                     <div
                        className={classes.btn_prev}
                        onClick={() => changePageHandler(-1)}
                     >
                        <img src={chevron} alt=""/>
                     </div>
                  }

                  {offset < maxOffset &&
                     <div
                        className={classes.btn_next}
                        onClick={() => changePageHandler(1)}
                     >
                        <img src={chevron} alt=""/>
                     </div>
                  }
               </div>
            </div>
         </>,
         document.getElementById('root')
      )
   )
}

export default PhotoSlider
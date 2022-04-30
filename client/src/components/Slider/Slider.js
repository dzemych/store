import React, {Children, cloneElement, useEffect, useRef, useState} from 'react'
import classes from './Slider.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


export default ({children}) => {
   // 1) States and other variables
   const [pages, setPages] = useState()
   const [offset, setOffset] = useState(0)
   const [deltaX, setDeltaX] = useState(0)
   const [startX, setStartX] = useState(0)
   const blockRef = useRef(null)
   const windowRef = useRef(null)

   // 2) Event handlers
   const clickHandler = (e, type) => {
      setOffset(prev => {
         const blockWidth = blockRef.current.offsetWidth
         const marginStyle = getComputedStyle(blockRef.current).marginRight

         const fullWidth = blockWidth + parseInt(marginStyle) * 2

         if (type === 'next') {
            const newOffset = prev + fullWidth
            console.log(newOffset)
            return Math.min(newOffset, fullWidth * (pages.length - 2))
         }

         if (type === 'prev') {
            const newOffset = prev - fullWidth
            return Math.max(newOffset, 0)
         }
      })
   }

   const touchStartHandler = e => {
      console.log(e.touches[0].clientX)
   }

   const touchMoveHandler = e => {
      // console.log(startX)
      setDeltaX(prev => startX - e.touches[0].clientX)
   }

   const touchEndHandler = e => {
      console.log(deltaX)
   }

   // 3) Effects
   useEffect(() => {
      setPages(
         Children.map(children, (el, i) => {
            return cloneElement(el, {
               ref: i === 0 ? blockRef : null,
               style: {
                  minWidth: "45%",
                  maxWidth: "45%",
                  margin: "0 2.5%"
               }
            })
         })
      )
   }, [])

   useEffect(() => {
      console.log(deltaX)
      // windowRef.current.scrollLeft = offset
   }, [deltaX])

   return (
      <div className={classes.container}>
         <div
            className={classes.window}
            // onScroll={onScrollHandler}
            ref={windowRef}
         >
            <div
               className={classes.allPages_container}
               onTouchStart={touchStartHandler}
               onTouchMove={touchMoveHandler}
               onTouchEnd={touchEndHandler}
               style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  transition: "350ms",
                  transform: `translateX(${-offset}px)`
               }}
            >
               {pages}
            </div>
         </div>

         <div
            className={classes.btn_next}
            onClick={e => clickHandler(e, 'next')}
         >
            <FontAwesomeIcon icon={faChevronRight}/>
         </div>

         <div
            className={classes.btn_prev}
            onClick={e => clickHandler(e, 'prev')}
         >
            <FontAwesomeIcon icon={faChevronLeft}/>
         </div>
      </div>
   )
}

export const SliderItem = props => {
   return (
      <div
         className={classes.item}
         key={props.key}
      >
         {props.chidren}
      </div>
   )
}
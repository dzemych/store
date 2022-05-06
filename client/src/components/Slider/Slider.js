import React, {Children, cloneElement, forwardRef, useEffect, useRef, useState} from 'react'
import classes from './Slider.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


export default ({children}) => {
   // 1) States and refs
   const [pagesLength, setPagesLength] = useState()
   const [prevOffset, setPrevOffset] = useState(0)
   const [offset, setOffset] = useState(0)

   const startRef = useRef(0)
   const blockFullWidth = useRef(0)
   const listRef = useRef(null)

   // 2) Event handlers
   const clickHandler = (e, type) => {
      let newX

      if (type === 'next') {
         const newOffset = offset + blockFullWidth.current
         newX = Math.min(newOffset, blockFullWidth.current * (pagesLength - 2))
      }
      if (type === 'prev') {
         const newOffset = offset - blockFullWidth.current
         newX = Math.max(newOffset, 0)
      }

      setOffset(newX)
      setPrevOffset(newX)
   }

   const touchStartHandler = e => {
      startRef.current = e.touches[0].clientX
   }

   const touchMoveHandler = e => {
      const offsetX = startRef.current - e.touches[0].clientX

      setOffset(prev => {
         const candidate = prevOffset + offsetX
         const maxWidth = blockFullWidth.current * (pagesLength - 2)

         if (candidate > 0 && candidate < maxWidth)
            return candidate

         return prev
      })
   }

   const touchEndHandler = e => {
      const blocksMove = Math.round(offset / blockFullWidth.current)
      let newX = blocksMove * blockFullWidth.current

      setOffset(newX)
      setPrevOffset(newX)
   }

   // 3) Effects
   useEffect(() => {
      setPagesLength(React.Children.count(children))
      blockFullWidth.current = listRef.current.offsetWidth / 2
   }, [])

   return (
      <div className={classes.container}>
         <div
            className={classes.window}
         >
            <div
               className={classes.allPages_container}
               onTouchStart={touchStartHandler}
               onTouchMove={touchMoveHandler}
               onTouchEnd={touchEndHandler}
               ref={listRef}
               style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  transition: "350ms",
                  transform: `translateX(${-offset}px)`
               }}
            >
               {children}
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

export const SliderItem = React.forwardRef((props, ref) => {
   return (
      <div
         className={classes.item}
      >
         {props.children}
      </div>
   )
})
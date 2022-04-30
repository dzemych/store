import React, {Children, cloneElement, useEffect, useRef, useState} from 'react'
import classes from './Slider.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


export default ({children}) => {
   // 1) States and refs
   const [pages, setPages] = useState()
   const [prevOffset, setPrevOffset] = useState(0)
   const [offset, setOffset] = useState(0)

   const startRef = useRef(0)
   const blockFullWidth = useRef(0)
   const blockRef = useRef(null)
   const windowRef = useRef(null)

   // 2) Event handlers
   const clickHandler = (e, type) => {
      let newX

      if (type === 'next') {
         const newOffset = offset + blockFullWidth.current
         newX = Math.min(newOffset, blockFullWidth.current * (pages.length - 2))
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
         const maxWidth = blockFullWidth.current * (pages.length - 2)

         if (candidate > 0 && candidate < maxWidth)
            return candidate

         return prev
      })
   }

   const touchEndHandler = e => {
      const blocksMove = Math.round(offset / blockFullWidth.current)
      console.log(blockFullWidth)
      console.log(offset)
      let newX = blocksMove * blockFullWidth.current

      console.log(newX)

      setOffset(newX)

      setPrevOffset(newX)
   }

   // 3) Effects
   // Set pages
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

   // Set block width
   useEffect(() => {
      if (pages) {
         const blockWidth = blockRef.current.offsetWidth
         const marginStyle = getComputedStyle(blockRef.current).marginRight

         blockFullWidth.current = blockWidth + parseInt(marginStyle) * 2
      }
   }, [pages])

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
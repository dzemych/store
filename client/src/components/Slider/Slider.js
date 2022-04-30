import React, {Children, cloneElement, useEffect, useRef, useState} from 'react'
import classes from './Slider.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


export default ({children}) => {
   const [pages, setPages] = useState()
   const [offset, setOffset] = useState(0)
   const blockRef = useRef(null)
   const windowRef = useRef(null)

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

   const clickHandler = (e, type) => {
      setOffset(prev => {
         const blockWidth = blockRef.current.offsetWidth
         const marginStyle = getComputedStyle(blockRef.current).marginRight

         const fullWidth = blockWidth + parseInt(marginStyle) * 2

         if (type === 'next') {
<<<<<<< HEAD
            const newOffset = prev - blockWidth
            return Math.max(newOffset, -(blockWidth * (pages.length - 2)))
=======
            const newOffset = prev + fullWidth
            console.log(newOffset)
            return Math.min(newOffset, fullWidth * (pages.length - 2))
>>>>>>> 0fae0cc77809c9a70d2e961998a83c4eefbd6360
         }

         if (type === 'prev') {
            const newOffset = prev - fullWidth
            return Math.max(newOffset, 0)
         }
      })
   }

   useEffect(() => {
      windowRef.current.scrollLeft = offset
   }, [offset])

   const onScrollHandler = e => {
      console.log(e.target.scrollLeft)
   }

   return (
      <div className={classes.container}>
         <div
            className={classes.window}
            onScroll={onScrollHandler}
            ref={windowRef}
         >
            <div
<<<<<<< HEAD
               // className={classes.all_pages_container}
               style={{
                  width: "100%",
                  display: 'flex',
                  justifyContent: "space-between",
                  transform: `translateX(${offset})`
               }}
=======
               className={classes.allPages_container}
               // style={{
               //    width: "100%",
               //    display: "flex",
               //    justifyContent: "space-between",
               //    transition: "350ms",
               //    transform: `translateX(${offset}px)`
               // }}
>>>>>>> 0fae0cc77809c9a70d2e961998a83c4eefbd6360
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
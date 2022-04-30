import React, {Children, cloneElement, useEffect, useRef, useState} from 'react'
import classes from './Slider.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


export default ({children}) => {
   const [pages, setPages] = useState()
   const [offset, setOffset] = useState(0)
   const blockRef = useRef(null)

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

         if (type === 'next') {
            const newOffset = prev - blockWidth
            return Math.max(newOffset, -(blockWidth * (pages.length - 2)))
         }

         if (type === 'prev') {
            const newOffset = prev + blockWidth
            return Math.max(newOffset, (blockWidth * pages.length - 2))
         }
      })
   }

   return (
      <div className={classes.container}>
         <div className={classes.window}>
            <div
               // className={classes.all_pages_container}
               style={{
                  width: "100%",
                  display: 'flex',
                  justifyContent: "space-between",
                  transform: `translateX(${offset})`
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
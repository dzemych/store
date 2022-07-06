import React, {useEffect, useMemo, useRef, useState} from 'react'
import classes from './Slider.module.sass'
import chevron from '../../img/chevron.png'


const Slider = (props) => {
   // 1) States and refs
   const [pagesLength, setPagesLength] = useState()
   const [prevOffset, setPrevOffset] = useState(0)
   const [offset, setOffset] = useState(0)

   const [transitionDuration, setTransitionDuration] = useState('0ms')

   const slides = props.slides ? props.slides : 2

   const startRef = useRef(0)
   const blockFullWidth = useRef(0)
   const listRef = useRef(null)
   const maxOffset = useMemo(
      () => blockFullWidth.current * (pagesLength - slides),
      [pagesLength, slides])

   // 2) Event handlers
   const clickHandler = async (e, type) => {
      await setTransitionDuration('280ms')

      let newX

      if (type === 'next') {
         const newOffset = offset + blockFullWidth.current
         newX = Math.min(newOffset, blockFullWidth.current * (pagesLength - slides))
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
         const maxWidth = blockFullWidth.current * (pagesLength - slides)

         if (candidate > 0 && candidate < maxWidth)
            return candidate

         return prev
      })
   }

   const touchEndHandler = async e => {
      await setTransitionDuration('280ms')

      const blocksMove = Math.round(offset / blockFullWidth.current)
      let newX = blocksMove * blockFullWidth.current

      await setOffset(newX)
      await setPrevOffset(newX)
   }

   // 3) Effects
   useEffect(() => {
      setPagesLength(React.Children.count(props.children))
      blockFullWidth.current = listRef.current.offsetWidth / slides
   }, [props.children, slides])

   // Set transition duration
   useEffect(() => {
      setTransitionDuration('0ms')
   }, [offset])

   return (
      <div className={classes.container}>
         <div className={classes.window}>
            <div
               onTouchStart={touchStartHandler}
               onTouchMove={touchMoveHandler}
               onTouchEnd={touchEndHandler}
               ref={listRef}
               style={{
                  width: "100%",
                  display: "flex",
                  height: 'fit-content',
                  justifyContent: pagesLength > props.slides ? 'space-between': 'center',
                  transitionDuration: transitionDuration,
                  transitionTimingFunction: 'ease-in',
                  transform: `translate3d(${-offset}px, 0, 0)`
               }}
            >
               {props.children}
            </div>
         </div>

         {offset > 1 &&
            <div
               className={props.slides > 1
                  ? classes.btn_prev
                  : classes.btn_prev + ' ' + classes.small_btn_prev
               }
               onClick={e => clickHandler(e, 'prev')}
            >
               <img src={chevron} alt={'|'}/>
            </div>
         }

         {pagesLength > props.slides && offset !== maxOffset &&
            <div
               className={props.slides > 1
                  ? classes.btn_next
                  : classes.btn_next + ' ' + classes.small_btn_next
               }
               onClick={e => clickHandler(e, 'next')}
            >
               <img src={chevron} alt={'|'}/>
            </div>
         }
      </div>
   )
}

export const SliderItem = React.forwardRef((props, ref) => {
   const slideFullWidth = 100 / (props.slides ? props.slides : 2)

   const styles = {
      maxWidth: `${slideFullWidth - slideFullWidth * .08}%`,
      minWidth: `${slideFullWidth - slideFullWidth * .08}%`,
      margin: `${(slideFullWidth * .08) / 2}%`,
   }

   return (
      <div
         style={styles}
      >
         {props.children}
      </div>
   )
})

export default Slider
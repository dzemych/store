import React from 'react'
import classes from './Catalog.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import '../../containers/basicStyles.sass'
import {useDispatch} from "react-redux";
import {toggleCatalog} from "../../redux/app/appReducer";


const Catalog = (props) => {
   const dispatch = useDispatch()

   const categories = [
      'Jackets and coats',
      'Trousers and shorts',
      'Underwear',
      'Suits',
      'Skirts and dresses'
   ]
   return (
      <div
         className={classes.container}
         onClick={e => e.stopPropagation()}
      >
         <div className={classes.wrapper}>
            <FontAwesomeIcon
               icon={faTimes}
               className={classes.close_icon}
               onClick={() => dispatch(toggleCatalog())}
            />

            <h1 className={'title'}>Catalog</h1>

            <div className={classes.category_section}>
               <h3 className={classes.category_title}>For woman</h3>

               <ul className={classes.category_list}>
                  {categories.map((el, i) => (
                     <li
                        key={i}
                        className={classes.category_item}
                     >{el}</li>
                  ))}
               </ul>
            </div>

            <div className={classes.category_section}>
               <h3 className={classes.category_title}>For men</h3>

               <ul className={classes.category_list}>
                  {categories.map((el, i) => (
                     <li
                        key={i}
                        className={classes.category_item}
                     >{el}</li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Catalog
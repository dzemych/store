import React, {useEffect, useState} from 'react'
import classes from './Catalog.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import '../../containers/basicStyles.sass'
import {useDispatch} from "react-redux";
import {toggleCatalog} from "../../redux/app/appReducer";
import {useHttp} from "../../functions/http.hook";
import {useNavigate} from "react-router-dom";
import useEsc from "../../functions/useEsc";


const Catalog = (props) => {

   useEsc(() => dispatch(toggleCatalog()))

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [categories, setCategories] = useState({
      мужчины: ['все'],
      женщины: ['все'],
      мальчики: ['все'],
      девочки: ['все']
   })
   const {requestJson} = useHttp()

   const onClickHandler = (sex, category) => {
      dispatch(toggleCatalog())
      if (category === 'все') {
         navigate(`/products?sex=${sex}&page=1`)
      } else {
         navigate(`/products?sex=${sex}&category=${category}&page=1`)
      }
   }

   const catalogHandler = () => {
      dispatch(toggleCatalog())
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson('/product/allCategories')

         setCategories(prev => ({...prev, ...data.categories}))
      })()
   }, [requestJson])

   useEsc(catalogHandler)

   return (
      <div
         className={classes.container}
         onClick={e => e.stopPropagation()}
      >
         <div className={classes.wrapper}>
            <FontAwesomeIcon
               icon={faTimes}
               className={classes.close_icon}
               onClick={catalogHandler}
            />

            <h1 className={'title'}>Каталог</h1>

            {Object.keys(categories).map((key, i) => (
               <div className={classes.category_section} key={i}>
                  <h3 className={classes.category_title}>
                     {`${key[0].toUpperCase()}${key.slice(1)}`}
                  </h3>

                  <ul className={classes.category_list}>

                     {categories[key].map((el, q) => (
                        <li
                           key={q}
                           className={classes.category_item}
                           onClick={() => onClickHandler(key, el)}
                        >
                           {`${el[0].toUpperCase()}${el.slice(1)}`}
                        </li>
                     ))}

                  </ul>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Catalog
import React, {useEffect, useState} from 'react'
import classes from './Catalog.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import '../../containers/basicStyles.sass'
import {useDispatch} from "react-redux";
import {toggleCatalog, toggleSidebar} from "../../redux/app/appReducer";
import {useHttp} from "../../functions/http.hook";
import {useNavigate} from "react-router-dom";
import useEsc from "../../functions/useEsc";


const Catalog = (props) => {

   useEsc(() => dispatch(toggleCatalog()))

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [categories, setCategories] = useState({man: ['all'], woman: ['all']})
   const {requestJson} = useHttp()

   const onClickHandler = (sex, category) => {
      dispatch(toggleCatalog())
      if (category === 'all') {
         navigate(`/products?sex=${sex}`)
      } else {
         navigate(`/products?sex=${sex}&category=${category}`)
      }
   }

   const catalogHandler = () => {
      dispatch(toggleCatalog())
   }

   useEffect(() => {
      (async () => {
         const data = await requestJson('/product/allCategories')

         if (data.categories){
            setCategories(data.categories)
         }
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

            <h1 className={'title'}>Catalog</h1>

            <div className={classes.category_section}>
               <h3 className={classes.category_title}>For women</h3>

               <ul className={classes.category_list}>
                  {categories.woman.map((el, i) => (
                     <li
                        key={i}
                        className={classes.category_item}
                        onClick={() => onClickHandler('woman', el)}
                     >{`${el[0].toUpperCase()}${el.slice(1)}`}</li>
                  ))}
               </ul>
            </div>

            <div className={classes.category_section}>
               <h3 className={classes.category_title}>For men</h3>

               <ul className={classes.category_list}>
                  {categories.man.map((el, i) => (
                     <li
                        key={i}
                        className={classes.category_item}
                        onClick={() => onClickHandler('man', el)}
                     >{`${el[0].toUpperCase()}${el.slice(1)}`}</li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Catalog
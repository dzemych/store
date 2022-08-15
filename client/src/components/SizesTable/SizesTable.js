import React, {useEffect, useState} from 'react'
import classes from './SizesTable.module.sass'
import Backdrop from "../Backdrop/Backdrop";
import {Tablet} from "../../functions/mediaCheck";
import {useDispatch} from "react-redux";
import {toggleSizesTable} from "../../redux/app/appReducer";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHttp} from "../../functions/http.hook";


const SizesTable = (props) => {

   const dispatch = useDispatch()
   const { requestJson } = useHttp()

   const [tables, setTables] = useState([])

   const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']
   const types = ['chest', 'waist', 'hip']

   const backClickHandler = () => {
      dispatch(toggleSizesTable())
   }

   const getTitle = key => {
      switch (key) {
         case 'man':
            return "Мужчины"

         case 'woman':
            return "Женщины"
      }
   }

   const renderTables = () => {
      if (!tables.length)
         return ''

      return tables.map(table => (
         <div className={classes.table_section}>
            <h3>
               {getTitle(table.sex)}
            </h3>

            <table>
               <tr>
                  <th>Размер</th>
                  <th>Обхват груди</th>
                  <th>Обхват талии</th>
                  <th>Обхват бедер</th>
               </tr>

               {sizes.map((sizeKey, i) => (
                  <tr key={`${sizeKey}_${i}`}>
                     <th>{sizeKey.toUpperCase()}</th>

                     {types.map((tableKey, i) => <>
                        <td key={i}>
                           {table[tableKey][sizeKey]}
                        </td>
                     </>)}

                  </tr>
               ))}
            </table>
         </div>
      ))
   }

   useEffect(() => {
      (async () => {
         const response = await requestJson('/size-table')

         if (response.status === 'success')
            setTables(response.data)
      })()
   }, [requestJson])

   return (
      <>
         <Tablet>
            {props.isOpen &&
               <Backdrop
                  onClick={backClickHandler}
               />}
         </Tablet>

         <FontAwesomeIcon
            className={classes.close_icon}
            icon={faTimes}
            onClick={backClickHandler}
         />

         <div className={classes.container}>
            <div className={classes.wrapper}>
               {renderTables()}
            </div>
         </div>
      </>
   )
}

export default SizesTable
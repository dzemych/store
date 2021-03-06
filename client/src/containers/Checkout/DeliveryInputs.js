import React, {useEffect, useState} from 'react'
import classes from "./Checkout.module.sass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";


const DeliveryInputs = (props) => {
   const cities = props.cities

   const renderBranch = () => {
      const el = cities.find(city => city.name === props.location)

      const title = el && !+el.isBranch
         ? 'Введите адрес для доставки'
         : 'Выберет ваше отделение'

      const selectForm =
               <select
                  autoComplete="off"
                  name='branch'
                  id='branch'
                  disabled={!el}
                  value={props.branch}
                  onChange={props.branchHandler}
               >
                  <option value=""/>

                  {props.branches.length > 0 &&
                     props.branches.map((selectEl, i) => (
                        <option value={selectEl.address} key={i}>
                           {selectEl.address}
                        </option>))
                  }
               </select>

      const inputForm =
               <input
                  autoComplete="off"
                  type="text"
                  name='branches'
                  list="branches"
                  value={props.branch}
                  onChange={props.branchHandler}
                  placeholder='Your address'
                  disabled={!el}
               />

      return (
         <div className={classes.form_item}>
            <label htmlFor='branch'>
               {title}
            </label>

            {el && !+el.isBranch
               ? inputForm
               : selectForm
            }
         </div>
      )
   }

   useEffect(() => {
      props.setBranch('')
   }, [props.location])

   useEffect(() => {

      if (cities.find(city => city.name === props.location))
         (async () => {
            await props.loadBranches(props.location)
         })()

   }, [cities, props.location])

   useEffect(() => {

      if (props.location.length > 1)
         (async () => {
            await props.loadCities(props.location)
         })()

      if (props.location.length < 2)
         props.setCities([])

   }, [props.location])

   return(
      <div className={classes.delivery_method_container}>
         <div
            className={classes.delivery_option_container}
            onClick={() => props.methodHandler('pickup')}
         >
            <input
               type="radio"
               value={'pickup'}
               checked={props.delivery === 'pickup'}
               onChange={e => props.methodHandler(e.target.value)}
            />

            <div className={classes.method_text}>
               <span className={classes.method_name}>
                  Самовывоз
               </span>

               <span className={classes.method_info}>
                  Хмельницкий, Вулиця свободи 9а
               </span>

               <span className={classes.method_price}>
                  Бесплатно
               </span>
            </div>
         </div>

         <div
            className={classes.delivery_option_container}
            onClick={() => props.methodHandler('delivery')}
         >
            <input
               type="radio"
               checked={props.delivery === 'delivery'}
               value={'delivery'}
               onChange={e => props.methodHandler(e.target.value)}
            />

            <div className={classes.method_text}>
               <span className={classes.method_name}>
                  Доставка Новой Почтой
               </span>

               <span className={classes.method_info}>
                  В любой город Украины
               </span>

               <span className={classes.method_price}>
                  По тарифам Новой Почты
               </span>
            </div>

            <FontAwesomeIcon
               icon={faChevronUp}
               className={classes.showMore_button}
               aria-checked={props.delivery === 'delivery'}
            />
         </div>

         {props.delivery === 'delivery' &&
            <div className={classes.delivery_forms}>
               <div className={classes.form_item}>
                  <label htmlFor='cities_input'>
                     Начните писать и выберете ваш город
                  </label>

                  <input
                     type="text"
                     id='cities_input'
                     name='cities_input'
                     list="cities_list"
                     role='combobox'
                     value={props.location}
                     onChange={props.locationHandler}
                     placeholder='Начните писать'
                  />

                  <datalist id='cities_list' role='listbox'>
                     {cities.length > 0 &&
                        cities.map((selectEl, i) => (
                           <option value={selectEl.name} key={i}>
                              {selectEl.name}
                           </option>
                        ))
                     }
                  </datalist>
               </div>

               {renderBranch()}

               {props.error &&
                  <span className={classes.delivery_error}>
                     {props.error}
                  </span>
               }
            </div>
         }
      </div>
   )
}

export default DeliveryInputs
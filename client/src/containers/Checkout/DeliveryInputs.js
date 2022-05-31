import React, {useEffect, useState} from 'react'
import classes from "./Checkout.module.sass";
import useNewPay from "../../functions/useNewPay.hook";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";


const DeliveryInputs = (props) => {
   const {loadCities, cities, setCities, loadBranches, branches} = useNewPay()

   const renderBranch = () => {
      const el = cities.find(city => city.name === props.location)

      const title = el && !+el.isBranch
         ? 'Enter the address for delivery'
         : 'Select your branch'

      const selectForm =
               <select
                  name='branch'
                  id='branch'
                  disabled={!el}
                  value={props.branch}
                  onChange={props.branchHandler}
               >
                  <option value=""/>
                  {branches.length > 0 &&
                     branches.map((selectEl, i) => (
                        <option value={selectEl.address} key={i}>
                           {selectEl.address}
                        </option>
                     ))
                  }
               </select>

      const inputForm =
               <input
                  type="text"
                  name='branches'
                  list="branches"
                  autoComplete={'false'}
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
            await loadBranches(props.location)
         })()
   }, [cities, props.location])

   useEffect(() => {
      if (props.location.length > 1)
         (async () => {
            await loadCities(props.location)
         })()
      if (props.location.length < 2)
         setCities([])
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
                     Pickup
                  </span>

                  <span className={classes.method_info}>
                     Khmelnitsky, Zarechanskaya 8
                  </span>

                  <span className={classes.method_price}>
                     Free
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
                     Delivery by NewPay
                  </span>

                  <span className={classes.method_info}>
                     To any city of Ukraine
                  </span>

                  <span className={classes.method_price}>
                     At the rates of NewPay
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
                     <label htmlFor='cities'>
                        Start typing and select your city
                     </label>

                     <input
                        type="text"
                        name='cities'
                        list="cities"
                        autoComplete={'false'}
                        value={props.location}
                        onChange={props.locationHandler}
                        placeholder='Start typing'
                     />

                     <datalist id='cities' role='listbox'>
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
               </div>
            }
         </div>
    )
}

export default DeliveryInputs
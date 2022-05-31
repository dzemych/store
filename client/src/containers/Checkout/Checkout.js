import React, {useEffect, useState} from 'react'
import classes from './Checkout.module.sass'
import smallLogo from '../../img/small-logo.png'
import wideLogo from '../../img/tan-dem-wide-logo.png'
import Input from "../../forms/Input/Input";
import useForms from "../../functions/forms.hook";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../functions/http.hook";
import ProductItem from "./ProductItem";
import useNewPay from "../../functions/useNewPay.hook";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";


const Checkout = (props) => {

   const navigate = useNavigate()
   const checkout = useSelector(state => state.purchase.checkout)

   const {requestJson} = useHttp()
   const {loadCities, cities, setCities, loadBranches, branches} = useNewPay()

   const [delivery, setDelivery] = useState('pickup')
   const [products, setProducts] = useState([])
   const [location, setLocation] = useState('')

   const {form, changeHandler, error, checkValidity} = useForms({
      name: '',
      surname: '',
      email: '',
      tel: ''
   })

   const submitHandler = () => {
      const newError = checkValidity()

      if (!newError)
         console.log(form)
   }

   const methodHandler = val => {
      setDelivery(val)
   }

   const locationHandler = e => {
      setLocation(e.target.value)
   }

   const inputsArr = [
      {
         type: 'text',
         title: 'Имя',
         placeholder: '',
         value: form.name,
         onChange: (val) => {changeHandler(val, 'name')},
         error: error.name
      },
      {
         type: 'text',
         title: 'Фамилия',
         placeholder: '',
         value: form.surname,
         onChange: (val) => {changeHandler(val, 'surname')},
         error: error.surname
      },
      {
         type: 'tel',
         title: 'Мобильный телефон',
         placeholder: '',
         value: form.tel,
         onChange: (val) => {changeHandler(val, 'tel')},
         error: error.tel
      },
      {
         type: 'text',
         title: 'Электроная почта',
         placeholder: '',
         value: form.email,
         onChange: (val) => {changeHandler(val, 'email')},
         error: error.email
      }
   ]

   useEffect(() => {
      if (Object.keys(checkout).length < 1)
         navigate('/shopping-cart')
   }, [])

   useEffect(() => {
      (async () => {
         // 1) Get products
         const data = await requestJson(
            '/product/getProducts',
            'POST',
            JSON.stringify({products: Object.keys(checkout)}),
            {'Content-Type': 'application/json'}
         )
         setProducts(data.products)

         // 2) Get all regions
         // await loadRegions()
      })()
   }, [])

   useEffect(() => {
      if (location.length > 1)
         (async () => {
            await loadCities(location)
         })()
      if (location.length < 2)
         setCities([])
   }, [location])

   useEffect(() => {

      if (cities.find(city => city.name === location))
         (async () => {
            await loadBranches(location)
         })()
      // if (cities.length === 1)
      //    if (cities[0].name === location)

   }, [cities, location])

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <div className={classes.topBar_logo_container}>
               <div className={classes.smallLogo_container}>
                  <img src={smallLogo} alt=""/>
               </div>

               <div className={classes.wideLogo_container}>
                  <img src={wideLogo} alt=""/>
               </div>
            </div>

            <hr className={classes.topBar_hr}/>

            <h1 className={classes.orderDetails_title}>
               Order details
            </h1>

            <div className={classes.details_container}>
               <div className={classes.contact_data_container}>
                  <h2 className={classes.section_title}>
                     Contact details
                  </h2>

                  <div className={classes.contact_form}>
                     {inputsArr.map((el, i) => (
                        <Input
                           key={`${el.type}_${i}`}
                           type={el.type}
                           title={el.title}
                           placeholder={el.placeholder}
                           value={el.value}
                           error={el.error}
                           onChange={el.onChange}
                           onSubmit={() => submitHandler()}
                        />
                     ))}
                  </div>
               </div>
            </div>

            <div className={classes.products_container}>
               <h2 className={classes.section_title}>Your orders</h2>

               <div className={classes.products_list}>
                  {products.map((el, i) => (
                     <ProductItem
                        key={el.slug + '_' + i}
                        img={el.mainPhoto}
                        slug={el.slug}
                        mainPhoto={el.mainPhoto}
                        title={el.title}
                        id={el._id}
                        price={el.price}
                        amount={checkout[el._id].amount}
                        size={checkout[el._id].size}
                     />
                  ))}
               </div>

               <div className={classes.totalPrice_container}>
                  <span>
                     Total price:&nbsp;
                     {products.reduce((acc, el) => {
                        acc = acc + (el.price * checkout[el._id].amount)
                        return acc
                     }, 0)}
                  </span>
               </div>
            </div>

            <hr className={classes.delivery_hr}/>

            <div className={classes.delivery_container}>
               <h2 className={classes.section_title}>
                  Choose delivery method
               </h2>

               <div className={classes.delivery_method_container}>
                  <div
                     className={classes.delivery_option_container}
                     onClick={() => methodHandler('pickup')}
                  >
                     <input
                        type="radio"
                        value={'pickup'}
                        checked={delivery === 'pickup'}
                        onChange={e => methodHandler(e.target.value)}
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
                     onClick={() => methodHandler('delivery')}
                  >
                     <input
                        type="radio"
                        checked={delivery === 'delivery'}
                        value={'delivery'}
                        onChange={e => methodHandler(e.target.value)}
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
                        aria-checked={delivery === 'delivery'}
                     />
                  </div>

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
                           value={location}
                           onChange={locationHandler}
                           placeholder='Start typing'
                        />
                        <datalist
                           id='cities'
                           role='listbox'
                        >
                           {cities.length > 0 &&
                              cities.map((selectEl, i) => (
                                 <option
                                    value={selectEl.name}
                                    key={i}
                                 >
                                    {selectEl.name}
                                 </option>
                              ))
                           }
                        </datalist>
                        
                        {/*<select*/}
                        {/*   name={formEl.one}*/}
                        {/*   id={formEl.one}*/}
                        {/*   value={location[formEl.one]}*/}
                        {/*   onChange={e => locationHandler(formEl.one, e.target.value)}*/}
                        {/*   disabled={formEl.list.length < 1}*/}
                        {/*>*/}
                        {/*   <option*/}
                        {/*      value='select'*/}
                        {/*   >*/}
                        {/*      select an option*/}
                        {/*   </option>*/}

                        {/*   {formEl.list.map((selectEl, i) => (*/}
                        {/*      <option value={selectEl.ref} key={i}>*/}
                        {/*         {selectEl.name}*/}
                        {/*      </option>*/}
                        {/*   ))}*/}
                        {/*</select>*/}
                     </div>
                  </div>

                  {/*{delivery === 'delivery' &&*/}
                  {/*   <div className={classes.delivery_forms}>*/}

                        {/*{selectArr.map((formEl, i) => (*/}
                        {/*   <div className={classes.form_item} key={i}>*/}
                        {/*      <label htmlFor={formEl.one}>*/}
                        {/*         Choose your {formEl.one}*/}
                        {/*      </label>*/}

                        {/*      <select*/}
                        {/*         name={formEl.one}*/}
                        {/*         id={formEl.one}*/}
                        {/*         value={location[formEl.one]}*/}
                        {/*         onChange={e => locationHandler(formEl.one, e.target.value)}*/}
                        {/*         disabled={formEl.list.length < 1}*/}
                        {/*      >*/}
                        {/*         <option*/}
                        {/*            value='select'*/}
                        {/*         >*/}
                        {/*            select an option*/}
                        {/*         </option>*/}

                        {/*         {formEl.list.map((selectEl, i) => (*/}
                        {/*            <option value={selectEl.ref} key={i}>*/}
                        {/*               {selectEl.name}*/}
                        {/*            </option>*/}
                        {/*         ))}*/}
                        {/*      </select>*/}
                        {/*   </div>*/}
                        {/*))}*/}

                  {/*   </div>*/}
                  {/*}*/}
               </div>
            </div>

            <hr className={classes.last_hr}/>
         </div>
      </div>
   )
}

export default Checkout
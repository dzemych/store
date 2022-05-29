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


const Checkout = (props) => {

   const navigate = useNavigate()
   const checkout = useSelector(state => state.purchase.checkout)

   const {requestJson} = useHttp()
   const {loadRegions, regions} = useNewPay()

   const [products, setProducts] = useState([])
   const [location, setLocation] = useState({
      region: '',
      city: '',
      branch: ''
   })

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
         await loadRegions()
      })()
   }, [])

   useEffect(() => {
      console.log(location)
   }, [location.region])

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
               <h2 className={classes.section_title}>Delivery</h2>

               <div className={classes.delivery_forms}>
                  <label htmlFor="region">
                     Choose your region
                  </label>

                  <select name="region" id="region">
                     {regions.map((el, i) => (
                        <option value={el} key={i}>
                           {el}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Checkout